import { useEffect, useRef, useState } from 'react'
import HeadlessTippy from '@tippyjs/react/headless'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { SearchIcon } from '~/components/Icons'

import * as searchService from '~/services/searchService'
import AccountList from '~/components/AccountList'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { useDebounce } from '~/hooks'

import classNames from 'classnames/bind'
import styles from './Seach.module.scss'

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const debouncedValue = useDebounce(searchValue, 700)

    const searchInputRef = useRef()

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }

        const fetchApi = async () => {
            setLoading(true)
            const result = await searchService.search(debouncedValue)
            setSearchResult(result)
            setLoading(false)
        }

        fetchApi()
    }, [debouncedValue])

    const handleHideSearchResult = () => {
        setShowResult(false)
    }

    const handleClearInput = () => {
        setSearchValue('')
        setSearchResult([])
        searchInputRef.current.focus()
    }

    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) setSearchValue(searchValue)
    }

    const renderSearchResult = (attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                <AccountList searchResult={searchResult} />
            </PopperWrapper>
        </div>
    )

    return (
        //
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={renderSearchResult}
                onClickOutside={handleHideSearchResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={searchInputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm tài khoản và video"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClearInput}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default Search
