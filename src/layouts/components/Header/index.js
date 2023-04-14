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
    let currentUser = true

    // handle logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem)
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
                    {currentUser ? (
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
                            <Button primary>Đăng nhập</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <div className={cx('user-avatar')}>
                                <Image
                                    src="https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1653272836951046~c5_100x100.jpeg?x-expires=1681376400&x-signature=HM5kO5pSvEmPwld0iZVbD%2BSkWDo%3D"
                                    alt="avatar"
                                />
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
