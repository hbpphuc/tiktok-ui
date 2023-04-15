import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '~/components/Button'
import Image from '~/components/Image'
import styles from './AccountPreview.module.scss'

const cx = classNames.bind(styles)

function AccountPreview({ data }) {
    const fullName = `${data.firstName} ${data.lastName}`

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image src={data.image} alt={fullName} className={cx('avatar')} />
                <Button primary className={cx('follow-btn')}>
                    Follow
                </Button>
            </header>
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    <span>{data.username}</span>
                    {true && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('name')}>{fullName}</span>
            </div>
            <p className={cx('statistic')}>
                <span className={cx('count')}>6.7M</span>
                <span className={cx('label')}>Follower</span>
                <span className={cx('count')}>528.9M</span>
                <span className={cx('label')}>Thích</span>
            </p>
        </div>
    )
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountPreview
