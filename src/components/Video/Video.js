import { useEffect, useRef, useState, memo, useMemo } from 'react'
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

        const onToggleVolume = (e) => {
            e.stopPropagation()
            return muted ? setMuted(videoRef.current.volume - 1) : setMuted(videoRef.current.volume + 1)
        }

        muteBtnNode.addEventListener('click', onToggleVolume)

        return () => {
            muteBtnNode.removeEventListener('click', onToggleVolume)
        }
    }, [muted])

    const handleChangeVolume = (e) => {
        console.log(e.target)
        e.stopPropagation()
    }

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
                            <div className={cx('volume-wrap')}>
                                {muted && (
                                    <div className={cx('volume')}>
                                        <input
                                            ref={volumeInputRef}
                                            value={volume}
                                            type={'range'}
                                            step={1}
                                            min={0}
                                            max={100}
                                            className={cx('volume-input')}
                                            onChange={handleChangeVolume}
                                        />
                                    </div>
                                )}
                                <button className={cx('volume-btn')} ref={muteBtnRef}>
                                    {muted ? <MutedIcon /> : <UnMutedIcon />}
                                </button>
                            </div>
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
