import { useEffect, useRef, useState } from 'react'
import HeadlessTippy from '@tippyjs/react/headless'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { SearchIcon } from '~/components/Icons'

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
        setLoading(true)
        fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(debounced)}`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.users)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })

        return () => {}
    }, [debounced])

    const handleHideSearchResult = () => {
        setShowResult(false)
    }

    const handleClearInput = () => {
        setSearchValue('')
        setSearchResult([])
        searchInputRef.current.focus()
    }

    return (
        <HeadlessTippy
            visible={showResult && searchResult.length > 0}
            interactive={true}
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
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClearInput}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    )
}

export default Search
