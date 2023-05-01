import { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import AuthContext from '~/context/AuthProvider'
import * as videoService from '~/services/videoService'
import { useDebounce } from '~/hooks'
import Button from '~/components/Button'
import styles from './Upload.module.scss'

const cx = classNames.bind(styles)

function Upload() {
    const { auth } = useContext(AuthContext)
    const [video, setVideo] = useState({})
    const [path, setPath] = useState('')
    const [desc, setDesc] = useState('')
    const [music, setMusic] = useState('')
    const [allows, setAllows] = useState([])

    const uploadVideoRef = useRef()
    const descRef = useRef()
    const musicRef = useRef()
    const selectRef = useRef()

    const handleInputClicked = () => uploadVideoRef.current.click()
    const handleDragOver = (e) => e.preventDefault()
    const handleDrop = (e) => e.preventDefault()
    const handleChange = (e) => {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setVideo(file.name)
        setPath(url)
    }

    const handleCheck = (e) => {
        if (e.target.checked === true) {
            setAllows(allows.concat(e.target.value))
        } else {
            const newarr = [...allows]
            newarr.splice(newarr.indexOf(e.target.value), 1)
            console.log(newarr)
        }
    }

    // useEffect(() => {
    //     const fetch = async () => {
    //         if (auth) {
    //             const result = await videoService.getVideosPath({
    //                 upload_file: video,
    //                 config: {
    //                     headers: {
    //                         'Content-Type': 'multipart/form-data',
    //                         withCredentials: true,
    //                         Accept: 'application/json',
    //                    },
    //                 },
    //             })
    //             console.log(result)
    //         }
    //     }
    //     fetch()
    // }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <header className={cx('header')}>
                        <p className={cx('title')}>Tải video lên</p>
                        <p className={cx('sub-title')}>Đăng video vào tài khoản của bạn</p>
                    </header>
                    <div className={cx('main')}>
                        <div className={cx('video-frame')}>
                            {!path ? (
                                <div
                                    className={cx('uploader')}
                                    onClick={handleInputClicked}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <div className={cx('text-frame')}>
                                        <p className={cx('text-strong')}>Chọn video tải lên</p>
                                        <p className={cx('text-sub')}>Kéo và thả tập tin</p>
                                        <p className={cx('text-sub')}>
                                            Có thể tách video thành nhiều phần để tăng khả năng hiển thị
                                        </p>
                                        <div className={cx('text-video')}>
                                            <p className={cx('text')}>MP4 hoặc WebM</p>
                                            <p className={cx('text')}>Độ phân giải 720x1280 trở lên</p>
                                            <p className={cx('text')}>Tối đa 30 phút</p>
                                            <p className={cx('text')}>Nhỏ hơn 2GB</p>
                                        </div>
                                    </div>
                                    <Button primary className={cx('upload-btn')}>
                                        Chọn tập tin
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <video className={cx('video-preview')} src={path} autoPlay loop controls />
                                </>
                            )}
                            <div>
                                <label htmlFor="upload-video">Chọn file</label>
                            </div>
                            <input
                                ref={uploadVideoRef}
                                type={'file'}
                                accept={'video/*'}
                                onChange={handleChange}
                                id={'upload-video'}
                            />
                        </div>
                        <form className={cx('input-frame')}>
                            <p className={cx('input-title')}>Chú thích</p>
                            <input ref={descRef} type={'text'} onChange={(e) => setDesc(e.target.value)} />
                            <p className={cx('input-title')}>Nhạc</p>
                            <input ref={musicRef} type={'text'} onChange={(e) => setMusic(e.target.value)} />
                            <p className={cx('input-title')}>Ai có thể xem được video này</p>
                            <select className={cx('select')}>
                                <option>Công khai</option>
                                <option>Bạn bè</option>
                                <option>Riêng tu</option>
                            </select>
                            <p className={cx('input-title')}>Cho phép người dùng</p>
                            <div className={cx('options')}>
                                <input
                                    ref={selectRef}
                                    type={'checkbox'}
                                    id={'comment'}
                                    value={'comment'}
                                    onChange={handleCheck}
                                />
                                <label htmlFor={'comment'}>Bình luận</label>
                                <input
                                    ref={selectRef}
                                    type={'checkbox'}
                                    id={'duet'}
                                    value={'duet'}
                                    onChange={handleCheck}
                                />
                                <label htmlFor={'duet'}>Duet</label>
                                <input
                                    ref={selectRef}
                                    type={'checkbox'}
                                    id={'stick'}
                                    value={'stick'}
                                    onChange={handleCheck}
                                />
                                <label htmlFor={'stick'}>Stick</label>
                            </div>
                            <div className={cx('btn-frame')}>
                                <Button large className={cx('outline-grey')}>
                                    Huỷ bỏ
                                </Button>
                                <Button large primary>
                                    Đăng
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>Footer</div>
        </div>
    )
}

export default Upload
