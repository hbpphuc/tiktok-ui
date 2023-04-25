import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'

import { CloseIcon } from '~/components/Icons'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

const Modal = ({ isShowing, hide }) =>
    isShowing
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
                              <div className={cx('options')}></div>
                          </div>
                      </div>
                  </div>
              </>,
              document.body,
          )
        : null

export default Modal
