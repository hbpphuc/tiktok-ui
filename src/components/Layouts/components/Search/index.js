import { useEffect, useRef, useState } from 'react'
import HeadlessTippy from '@tippyjs/react/headless'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { SearchIcon } from '~/components/Icons'

import * as searchService from '~/apiServices/searchService'
import AccountItem from '~/components/AccountItem'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { useDebounce } from '~/hooks'

import classNames from 'classnames/bind'
import styles from './Seach.module.scss'

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const debounced = useDebounce(searchValue, 700)

    const searchInputRef = useRef()

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])
            return
        }

        const fetchApi = async () => {
            setLoading(true)
            const result = await searchService.search(debounced)
            setSearchResult(result)
            setLoading(false)
        }

        fetchApi()
    }, [debounced])

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

    return (
        //
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
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
