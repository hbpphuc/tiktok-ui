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

const PAGE_ACCOUNT = 2
const PERPAGE_ACCOUNT = 5

function Sidebar() {
    const [page, setPage] = useState(PAGE_ACCOUNT)
    const [suggestedUser, setSuggestedUser] = useState([])

    const suggestedUserList = [...suggestedUser]

    useEffect(() => {
        const fetchApi = async () => {
            const result = await userService.getSuggested({ page, perPage: PERPAGE_ACCOUNT })
            setSuggestedUser([...suggestedUserList, ...result])
        }

        fetchApi()
    }, [page])

    const handleSeeMoreAccount = () => {
        setPage(page + 1)
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
