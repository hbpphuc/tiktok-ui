import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import Menu, { MenuItem } from './Menu'
import config from '~/config'
import * as userService from '~/services/userService'
import {
    FollowingActiveIcon,
    FollowingIcon,
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
} from '~/components/Icons'
import styles from './Sidebar.module.scss'
import SuggestedAccounts from '~/components/SuggestedAccounts'

const cx = classNames.bind(styles)

const LIMIT_ACCOUNT = 5

function Sidebar() {
    const [skip, setSKip] = useState(0)
    const [suggestedUser, setSuggestedUser] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await userService.getSuggested({ skip, limit: LIMIT_ACCOUNT })
            setSuggestedUser([...suggestedUser, ...result])
        }

        fetchApi()
    }, [skip])

    const handleSeeMoreAccount = () => {
        setSKip(skip + 5)
    }

    const handleSeeLessAccount = () => {
        setSuggestedUser(suggestedUser.slice(0, 5))
    }

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="Dành cho bạn"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Đang Follow"
                    to={config.routes.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts
                label="Tài khoản được đề xuất"
                suggestedUser={suggestedUser}
                onSeeMoreAccount={handleSeeMoreAccount}
                onSeeLessAccount={handleSeeLessAccount}
            />
            <SuggestedAccounts label="Các tài khoản đang follow" />
        </aside>
    )
}

export default Sidebar
