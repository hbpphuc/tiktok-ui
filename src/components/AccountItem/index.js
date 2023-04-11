import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'

const cx = classNames.bind(styles)

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1653272836951046~c5_100x100.jpeg?x-expires=1681376400&x-signature=HM5kO5pSvEmPwld0iZVbD%2BSkWDo%3D"
                alt=""
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Hoàng Bảo Phúc</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>

                <span className={cx('username')}>hbphuc</span>
            </div>
        </div>
    )
}

export default AccountItem
