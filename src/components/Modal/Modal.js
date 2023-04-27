import { useEffect, useRef, useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'

import AuthContext from '~/context/AuthProvider'
import Button from '~/components/Button'
import { CloseIcon, FacebookIcon, GoogleIcon, PersonIcon, QRCodeIcon } from '~/components/Icons'
import styles from './Modal.module.scss'
import * as userService from '~/services/userService'

const cx = classNames.bind(styles)

function Modal({ isShowing, hide }) {
    const options = [
        {
            title: 'Sử dụng mã QR',
            icon: <QRCodeIcon />,
            href: '/',
        },
        {
            title: 'Số điện thoại / Email / Tiktok ID',
            icon: <PersonIcon />,
            href: '/login',
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

    const { setAuth } = useContext(AuthContext)

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    const userRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const authen = async () => {
            const data = await userService.auth({
                email: user,
                password,
                config: {
                    headers: { 'Content-Type': 'application/json', withCredentials: true },
                },
            })
            if (data) {
                window.localStorage.setItem('USER_LOGIN', JSON.stringify(data))
                setAuth(data)
                setUser('')
                setPassword('')
                setSuccess(true)
                window.location.reload()
            }
        }

        authen()
    }

    useEffect(() => {
        window.localStorage.getItem('USER_LOGIN')
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, password])

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
                              {/* <div className={cx('options')}>
                                  {options.map((option, index) => (
                                      <Button
                                          key={index}
                                          href={option.href}
                                          leftIcon={option.icon}
                                          className={cx('modal-btn')}
                                      >
                                          {option.title}
                                      </Button>
                                  ))}
                              </div> */}
                              <form className={cx('form-login')} onSubmit={handleSubmit}>
                                  <div className={cx('description')}>
                                      <p>Email hoặc Tiktok ID</p>
                                      <p>Đăng nhập bằng số điện thoại</p>
                                  </div>
                                  <div className={cx('form-input')}>
                                      <input
                                          ref={userRef}
                                          type={'email'}
                                          className={cx('form-control')}
                                          placeholder={'Email hoặc Tiktok ID'}
                                          onChange={(e) => setUser(e.target.value)}
                                          value={user}
                                          required
                                      />
                                      <input
                                          ref={passwordRef}
                                          type={'password'}
                                          className={cx('form-control')}
                                          placeholder={'Mật khẩu'}
                                          onChange={(e) => setPassword(e.target.value)}
                                          value={password}
                                          required
                                      />
                                  </div>
                                  <Button text className={cx('forgot-btn')}>
                                      Quên mật khẩu?
                                  </Button>
                                  <Button className={cx('login-btn')}>Đăng nhập</Button>
                                  <p className={cx('errorMsg')}>* aaaa</p>
                              </form>
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
