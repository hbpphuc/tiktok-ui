import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import Image from '~/components/Image'
import styles from './AccountItem.module.scss'

const cx = classNames.bind(styles)

function AccountItem({ data }) {
    const fullName = `${data.firstName} ${data.lastName}`

    // Fake tick
    data.tick = true

    return (
        <Link to={`/@${data.username}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.image} alt={fullName} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{fullName}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>

                <span className={cx('username')}>{data.username}</span>
            </div>
        </Link>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccountItem
