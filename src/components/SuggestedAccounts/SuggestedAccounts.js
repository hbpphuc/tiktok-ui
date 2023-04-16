import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import styles from './SuggestedAccounts.module.scss'
import AccountItem from './AccountItem'

const cx = classNames.bind(styles)

const LIMIT_USER = 10

function SuggestedAccounts({ label, suggestedUser = [], onSeeMoreAccount, onSeeLessAccount }) {
    const countUser = suggestedUser.length

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('label')}>{label}</h2>

            {suggestedUser.map((user) => (
                <AccountItem key={user.id} data={user} />
            ))}

            {LIMIT_USER !== countUser ? (
                <p className={cx('see-all')} onClick={onSeeMoreAccount}>
                    Xem thêm
                </p>
            ) : (
                <p className={cx('see-all')} onClick={onSeeLessAccount}>
                    Ẩn bớt
                </p>
            )}
        </div>
    )
}

SuggestedAccounts.propTypes = {
    suggestedUser: PropTypes.array,
    label: PropTypes.string,
}

export default SuggestedAccounts
