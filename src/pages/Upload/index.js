import { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Upload.module.scss'
import * as videoService from '~/services/videoService'
import AuthContext from '~/context/AuthProvider'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function Upload() {
    const { auth } = useContext(AuthContext)
    const [video, setVideo] = useState('')
    const [desc, setDesc] = useState('')
    const [music, setMusic] = useState('')
    const [allows, setAllows] = useState([])

    const uploadVideoRef = useRef()
    const descRef = useRef()
    const musicRef = useRef()
    const selectRef = useRef()

    console.log(allows)

    const handleInputClicked = () => uploadVideoRef.current.click()
    const handleDragOver = (e) => e.preventDefault()
    const handleDrop = (e) => e.preventDefault()
    const handleChange = (e) => {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setVideo(url)
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

    //     const select = selectRef.current

    //     select.addEventListener('change', handleChange)

    //     return () => {
    //         select.removeEventListener('change', handleChange)
    //     }

    // }, [allow])

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
    //                         Authorization:
    //                             'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90aWt0b2suZnVsbHN0YWNrLmVkdS52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY4MjY3NjU2MiwiZXhwIjoxNjg1MjY4NTYyLCJuYmYiOjE2ODI2NzY1NjIsImp0aSI6Im5qS2Y5cVBBYUU2RHdFNGYiLCJzdWIiOjUzNDYsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.sset0rmdC1K5UbZilJASH3rLlQtXX3tYicd1vlQ1i_M',
    //                     },
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
                    <input
                        ref={uploadVideoRef}
                        type={'file'}
                        value={video.name}
                        accept={'video/*'}
                        hidden
                        onChange={handleChange}
                    />
                    {!video ? (
                        <div
                            className={cx('uploader')}
                            onClick={handleInputClicked}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <div className={cx('text-frame')}>
                                <p className={cx('text-strong')}>Chọn video tải lên</p>
                                <p className={cx('text-sub')}>Kéo vào thả tập tin</p>
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
                            <Button primary exlarge className={cx('upload-btn')}>
                                Chọn tập tin
                            </Button>
                        </div>
                    ) : (
                        <div className={cx('editor')}>
                            <header className={cx('header')}>
                                <p className={cx('title')}>Tải video lên</p>
                                <p className={cx('sub-title')}>Đăng video vào tài khoản của bạn</p>
                            </header>
                            <div className={cx('main')}>
                                <div className={cx('video-frame')}>
                                    <video className={cx('video-preview')} src={video} autoPlay loop controls />
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
                    )}
                </div>
            </div>
            <div className={cx('footer')}>Footer</div>
        </div>
    )
}

export default Upload
