import { useEffect, useRef, useState, memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faHeart, faMusic, faPlay, faShare } from '@fortawesome/free-solid-svg-icons'

import { useDebounce, useElementOnScreen } from '~/hooks'
import Button from '../Button'
import { MutedIcon, PauseIcon, UnMutedIcon } from '../Icons'
import Image from '../Image'
import styles from './Video.module.scss'

const cx = classNames.bind(styles)

function Video({ data }) {
    const [playing, setPlaying] = useState(false)
    const [muted, setMuted] = useState(true)
    const [volume, setVolume] = useState(0)
    const videoRef = useRef(null)
    const volumeInputRef = useRef()
    const muteBtnRef = useRef()
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    }
    const debouncedValue = useDebounce(volume, 500)

    const isVisibile = useElementOnScreen(options, videoRef)

    const onPlayVideo = (e) => {
        e.stopPropagation()
        if (playing) {
            videoRef.current.pause()
            setPlaying(!playing)
        } else {
            videoRef.current.play()
            setPlaying(!playing)
        }
    }

    useEffect(() => {
        const muteBtnNode = muteBtnRef.current
        const videoNode = videoRef.current

        const onToggleVolume = (e) => {
            e.stopPropagation()
            // if (muted) {
            //     setVolume(1)
            //     setMuted(false)
            // } else {
            //     setVolume(0)
            //     setMuted(true)
            // }
            return muted ? setMuted(false) : setMuted(true)
        }

        muteBtnNode.addEventListener('click', onToggleVolume)
        // videoNode.volume = volume

        return () => {
            muteBtnNode.removeEventListener('click', onToggleVolume)
        }
    }, [muted])

    // Handle Change Volume Event

    const handleChangeValue = (e) => {
        e.stopPropagation()
        setVolume(e.target.value)
    }

    // useEffect(() => {
    //     const videoNode = videoRef.current

    //     const handleChangeVolume = () => {
    //         if (muted) {
    //             videoNode.volume = 0
    //         } else {
    //             videoNode.volume = volume
    //         }
    //     }
    //     videoNode.addEventListener('volumechange', handleChangeVolume)

    //     return () => {
    //         videoNode.removeEventListener('volumechange', handleChangeVolume)
    //     }
    // }, [debouncedValue])

    const onVideoClick = () => {
        console.log(videoRef.current)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            {data.description}
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
                        <video src={data.file_url} loop muted={muted} className={cx('video-player')} ref={videoRef} />
                        <div className={cx('video-coating')} onClick={onVideoClick}>
                            <div className={cx('player-wrap')}>
                                <button className={cx('player-btn')} onClick={onPlayVideo}>
                                    {!playing ? <FontAwesomeIcon icon={faPlay} /> : <PauseIcon />}
                                </button>
                            </div>
                            <div className={cx('volume-wrap')} onClick={(e) => e.stopPropagation()}>
                                {false && (
                                    <div className={cx('volume')}>
                                        <input
                                            ref={volumeInputRef}
                                            value={volume}
                                            type={'range'}
                                            step={0.01}
                                            min={0}
                                            max={1}
                                            className={cx('volume-input')}
                                            onChange={handleChangeValue}
                                        />
                                    </div>
                                )}
                                <button className={cx('volume-btn')} ref={muteBtnRef}>
                                    {muted ? <MutedIcon /> : <UnMutedIcon />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('video-action')}>
                        <div className={cx('action')}>
                            <Button circle>
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            </Button>
                            <span className={cx('count')}>{data.likes_count}</span>
                        </div>
                        <div className={cx('action')}>
                            <Button circle>
                                <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                            </Button>
                            <span className={cx('count')}>{data.comments_count}</span>
                        </div>
                        <div className={cx('action')}>
                            <Button circle>
                                <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                            </Button>
                            <span className={cx('count')}>{data.shares_count}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Video.propTypes = {
    data: PropTypes.object.isRequired,
}

export default memo(Video)
