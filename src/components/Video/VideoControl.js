import { useEffect, useRef, useState, memo } from 'react'
import Moment from 'react-moment'
import moment from 'moment'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MutedIcon, PauseIcon, UnMutedIcon } from '../Icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import styles from './Video.module.scss'

const cx = classNames.bind(styles)

function VideoControl({ data, videoRef, ...props }) {
    const [playing, setPlaying] = useState(true)
    const [muted, setMuted] = useState(true)
    const [volume, setVolume] = useState(0)
    const [timer, setTimer] = useState(0)
    const [percent, setPercent] = useState(0)

    const muteBtnRef = useRef()
    const volumeInputRef = useRef()
    const progressRef = useRef()

    // const debouncedValue = useDebounce(volume, 500)
    const start = moment().add(-timer, 's')

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

        const onToggleMute = (e) => {
            e.stopPropagation()
            // if (muted) {
            //     videoNode.volume = 1
            //     setMuted(false)
            // } else {
            //     videoNode.volume = 0
            //     setMuted(true)
            // }
            return muted ? setMuted(false) : setMuted(true)
        }

        muteBtnNode.addEventListener('click', onToggleMute)
        // videoNode.addEventListener('volumechange', onToggleMute)
        // videoNode.volume = volume

        return () => {
            muteBtnNode.removeEventListener('click', onToggleMute)
            // videoNode.removeEventListener('volumechange', onToggleMute)
        }
    }, [muted])

    //    useEffect(() => {
    //     const videoNode = videoRef.current

    //     const handleChangeVolume = () => {
    //         if (muted) {
    //             videoNode.volume = 1
    //         } else {
    //             videoNode.volume = 0
    //         }
    //     }
    //     videoNode.addEventListener('volumechange', handleChangeVolume)

    //     return () => {
    //         videoNode.removeEventListener('volumechange', handleChangeVolume)
    //     }
    // }, [muted])

    // Handle Change Volume Event

    const handleChangeValue = (e) => {
        e.stopPropagation()
        setVolume(e.target.value)
    }

    useEffect(() => {
        const videoNode = videoRef.current
        const percent = Math.floor((timer / data.meta.playtime_seconds) * 100)

        const currentTime = () => {
            return setTimer(Math.floor(videoNode.currentTime))
        }

        progressRef.current.value = percent

        videoNode.addEventListener('timeupdate', currentTime)

        return () => {
            videoNode.removeEventListener('timeupdate', currentTime)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer])

    return (
        <>
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
            {true && (
                <div className={cx('video-control')}>
                    <input ref={progressRef} className={cx('progress')} type={'range'} min={0} max={100} step={1} />

                    <p className={cx('timer')}>
                        <Moment date={start} format="mm:ss" durationFromNow /> / {data.meta.playtime_string}
                    </p>
                </div>
            )}
        </>
    )
}

export default memo(VideoControl)
