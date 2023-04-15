import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import styles from './SuggestedAccounts.module.scss'
import AccountItem from './AccountItem'

const cx = classNames.bind(styles)

function SuggestedAccounts({ label, suggestedUser = [], onSeeOther }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('label')}>{label}</h2>

            {suggestedUser.map((user) => (
                <AccountItem key={user.id} data={user} />
            ))}

            <p className={cx('see-all')} onClick={onSeeOther}>
                Tài khoản khác
            </p>
        </div>
    )
}

SuggestedAccounts.propTypes = {
    suggestedUser: PropTypes.array,
    label: PropTypes.string,
}

export default SuggestedAccounts
