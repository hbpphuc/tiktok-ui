import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountPreview from './AccountPreview'
import Image from '~/components/Image'
import styles from './SuggestedAccounts.module.scss'

const cx = classNames.bind(styles)

function AccountItem({ data }) {
    const fullName = `${data.firstName} ${data.lastName}`

    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        )
    }

    return (
        <Tippy interactive delay={[1000, 0]} render={renderPreview} placement={'bottom-start'} offset={[-8, 2]}>
            <Link to={'/profile'} className={cx('account-item')}>
                <Image src={data.image} alt={fullName} className={cx('avatar')} />
                <div className={cx('info')}>
                    <h4 className={cx('name')}>
                        <span>{fullName}</span>
                        {true && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </h4>
                    <span className={cx('username')}>{data.username}</span>
                </div>
            </Link>
        </Tippy>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem
