import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'

import Button from '~/components/Button'
import { CloseIcon, FacebookIcon, GoogleIcon, PersonIcon, QRCodeIcon } from '~/components/Icons'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({ isShowing, hide }) {
    const options = [
        {
            title: 'Sử dụng mã QR',
            icon: <QRCodeIcon />,
        },
        {
            title: 'Số điện thoại / Email / Tiktok ID',
            icon: <PersonIcon />,
        },
        {
            title: 'Tiếp tục với Facebook',
            icon: <FacebookIcon />,
        },
        {
            title: 'Tiếp tục với Google',
            icon: <GoogleIcon />,
        },
    ]

    return isShowing
        ? ReactDOM.createPortal(
              <>
                  <div className={cx('modal-overlay')} />
                  <div className={cx('modal-wrapper')}>
                      <div className={cx('modal')}>
                          <div className={cx('modal-header')}>
                              <button className={cx('modal-close-button')} onClick={hide}>
                                  <CloseIcon />
                              </button>
                          </div>
                          <div className={cx('modal-content')}>
                              <h2 className={cx('title')}>Đăng nhập vào Tiktok</h2>
                              <div className={cx('options')}>
                                  {options.map((option, index) => (
                                      <Button key={index} href="/" leftIcon={option.icon} className={cx('modal-btn')}>
                                          {option.title}
                                      </Button>
                                  ))}
                              </div>
                          </div>
                          <div className={cx('modal-footer')}>
                              <span>Bạn không có tài khoản?</span>
                              <Button text className={cx('modal-signup')}>
                                  Đăng ký
                              </Button>
                          </div>
                      </div>
                  </div>
              </>,
              document.body,
          )
        : null
}

export default Modal
