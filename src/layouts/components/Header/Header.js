import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import {
    MailboxIcon,
    MessageIcon,
    UserIcon,
    TiktokCoinIcon,
    SettingIcon,
    LanguageIcon,
    QuestionIcon,
    KeyboardIcon,
    MoonIcon,
    LogoutIcon,
    MoreIcon,
    PlusIcon,
} from '~/components/Icons'

import config from '~/config'
import Button from '~/components/Button'
import Menu from '~/components/Popper/Menu'
import Search from '../Search'
import Image from '~/components/Image'
import images from '~/assets/images'
import styles from './Header.module.scss'
import { useModal } from '~/hooks'
import Modal from '~/components/Modal'
import { useContext } from 'react'
import AuthContext from '~/context/AuthProvider'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data: [
                { code: 'en', title: 'English' },
                { code: 'ko', title: 'Korean' },
                { code: 'vi', title: 'Tiếng Việt' },
            ],
        },
    },
    {
        icon: <QuestionIcon />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Phím tắt trên bàn phím',
    },
]

function Header() {
    const { auth, setAuth } = useContext(AuthContext)
    const { isShowing, toggle } = useModal()

    // handle logic
    const handleMenuChange = (menuItem) => {
        if (menuItem.isLogout === true) {
            window.localStorage.removeItem('USER_LOGIN')
            window.location.reload()
            setAuth(undefined)
        }
    }

    const userMenu = [
        {
            icon: <UserIcon />,
            title: 'Xem hồ sơ',
            to: '/profile',
        },
        {
            icon: <TiktokCoinIcon />,
            title: 'Nhận xu',
            to: '/takecoin',
        },
        {
            icon: <SettingIcon />,
            title: 'Cài đặt',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <MoonIcon />,
            title: 'Chế độ tối',
        },
        {
            icon: <LogoutIcon />,
            title: 'Đăng xuất',
            separate: true,
            isLogout: true,
        },
    ]

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <Image src={images.logo} alt="Tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    <Button className={cx('outline-grey')} leftIcon={<PlusIcon />}>
                        Tải lên
                    </Button>
                    {!!auth ? (
                        <>
                            <Tippy delay={(0, 200)} content={'Tin nhắn'} placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={(0, 200)} content={'Hộp thư'} placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MailboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary onClick={toggle}>
                                Đăng nhập
                            </Button>
                            <Modal isShowing={isShowing} hide={toggle} />
                        </>
                    )}
                    <Menu items={auth ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {auth ? (
                            <div className={cx('user-avatar')}>
                                <Image src={auth.avatar} alt={auth.nickname} />
                            </div>
                        ) : (
                            <button className={cx('more-btn')}>
                                <MoreIcon />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
