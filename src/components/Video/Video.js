import { useEffect, useRef, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faPlay } from '@fortawesome/free-solid-svg-icons'

import { useElementOnScreen } from '~/hooks'
import Button from '../Button'
import { MutedIcon, PauseIcon, UnMutedIcon } from '../Icons'
import Image from '../Image'
import styles from './Video.module.scss'

const cx = classNames.bind(styles)

function Video({ data }) {
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef(null)
    const videoBtnRef = useRef(null)
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    }
    const isVisibile = useElementOnScreen(options, videoRef)

    const onVideoClick = () => {
        if (playing) {
            videoRef.current.pause()
            setPlaying(!playing)
        } else {
            videoRef.current.play()
            setPlaying(!playing)
        }
    }

    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play()
                setPlaying(true)
            }
        } else {
            if (playing) {
                videoRef.current.pause()
                setPlaying(false)
            }
        }
    }, [isVisibile])

    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.user.avatar} alt={data.user.nickname} />
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <div className={cx('author')}>
                        <Link to="/profile" className={cx('author-anchor')}>
                            <h3 className={cx('nickname')}>{data.user.nickname}</h3>
                            <h4 className={cx('name')}>
                                {data.user.first_name} {data.user.last_name}
                            </h4>
                        </Link>
                        <p className={cx('video-desc')}>
                            {data.user.description}
                            <Button to="/" text className={cx('hashtag')}>
                                #trending
                            </Button>
                            <Button to="/" text className={cx('hashtag')}>
                                #xuhuongtiktok
                            </Button>
                        </p>
                        {data.music && (
                            <Button to="/music" text className={cx('music-link')}>
                                <FontAwesomeIcon icon={faMusic} className={cx('music-icon')} />
                                <span>{data.music}</span>
                            </Button>
                        )}
                    </div>
                    <Button small outline>
                        Follow
                    </Button>
                </div>
                <div className={cx('content')}>
                    <div className={cx('video-card')}>
                        <video
                            src={data.file_url}
                            autoPlay
                            loop
                            muted={false}
                            className={cx('video-player')}
                            ref={videoRef}
                        />
                        <div className={cx('video-btn')} ref={videoBtnRef} onClick={onVideoClick}>
                            <Button>
                                <FontAwesomeIcon icon={faPlay} />
                            </Button>
                            <Button>
                                <PauseIcon />
                            </Button>
                            <Button>
                                <MutedIcon />
                            </Button>
                            <Button>
                                <UnMutedIcon />
                            </Button>
                        </div>
                    </div>
                    <div className={cx('video-action')}></div>
                </div>
            </div>
        </div>
    )
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
}

export default memo(Video)
