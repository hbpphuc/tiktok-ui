import { useEffect, useRef, useState, memo } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MutedIcon, PauseIcon, UnMutedIcon } from '../Icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import styles from './Video.module.scss'

const cx = classNames.bind(styles)

function VideoControl({ data, videoRef }) {
    const [playing, setPlaying] = useState(true)
    const [muted, setMuted] = useState(false)
    const [timer, setTimer] = useState(0)
    const [progress, setProgress] = useState(0)

    const muteBtnRef = useRef()
    const volumeRef = useRef()
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
            return muted ? setMuted(false) : setMuted(true)
        }

        videoNode.muted = muted
        muteBtnNode.addEventListener('click', onToggleMute)

        return () => {
            muteBtnNode.removeEventListener('click', onToggleMute)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [muted])

    useEffect(() => {
        const videoNode = videoRef.current

        const currentTime = () => {
            let current = videoNode.currentTime
            setTimer(current)
        }

        videoNode.addEventListener('timeupdate', currentTime)

        return () => {
            videoNode.removeEventListener('timeupdate', currentTime)
        }
    }, [])

    const playtime = Math.floor(data.meta.playtime_seconds)
    const percent = (timer / playtime) * 100

    const handleChangeProgress = (e) => {
        const seekTime = (e.target.value * data.meta.playtime_seconds) / 100
        videoRef.current.currentTime = seekTime
    }

    useEffect(() => {
        const progressNode = progressRef.current
        setProgress(percent)

        progressNode.addEventListener('change', handleChangeProgress)

        return () => {
            progressNode.removeEventListener('change', handleChangeProgress)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer, progress])

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
                            ref={volumeRef}
                            className={cx('volume-input')}
                            type={'range'}
                            step={0.01}
                            min={0}
                            max={1}
                        />
                    </div>
                )}
                <button className={cx('volume-btn')} ref={muteBtnRef}>
                    {muted ? <MutedIcon /> : <UnMutedIcon />}
                </button>
            </div>
            {true && (
                <div className={cx('video-control')}>
                    <input
                        ref={progressRef}
                        className={cx('progress')}
                        value={progress}
                        type={'range'}
                        min={0}
                        max={100}
                        step={1}
                        onChange={handleChangeProgress}
                    />

                    <p className={cx('timer')}>
                        <Moment date={start} format="mm:ss" durationFromNow /> / {data.meta.playtime_string}
                    </p>
                </div>
            )}
        </>
    )
}

VideoControl.propTypes = {
    data: PropTypes.object.isRequired,
}

export default memo(VideoControl)
