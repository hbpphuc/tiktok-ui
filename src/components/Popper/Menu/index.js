import PropTypes from 'prop-types'
import { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/svg-arrow.css'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem'
import HeaderMenu from './HeaderMenu'

const cx = classNames.bind(styles)
const defaultFn = () => {}

function Menu({ children, hideOnClick = false, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1]
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children])
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }

    return (
        <Tippy
            offset={[12, 8]}
            interactive
            delay={[100, 800]}
            placement={'bottom-end'}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <HeaderMenu
                                title={current.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1))
                                }}
                            />
                        )}
                        <div className={cx('menu-scroll')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            hideOnClick={hideOnClick}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1))
            }}
        >
            {children}
        </Tippy>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    hideOnClick: PropTypes.bool,
    items: PropTypes.array,
    onChange: PropTypes.func,
}

export default Menu
