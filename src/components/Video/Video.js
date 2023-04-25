import { useEffect, useRef, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons'

import AccountPreview from '~/components/AccountPreview'
import VideoControl from './VideoControl'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { useElementOnScreen } from '~/hooks'
import Button from '../Button'
import Image from '../Image'
import styles from './Video.module.scss'

const cx = classNames.bind(styles)
const IS_VIDEO = 'video'

function Video({ data }) {
    const [playing, setPlaying] = useState(false)
    const [muted, setMuted] = useState(true)
    const videoRef = useRef(null)
    const videoWrap = useRef()
    let options = {
        root: null,
        rootMargin: '-60px 0px 0px 0px',
        threshold: 0.5,
    }

    const isVisibile = useElementOnScreen(options, videoWrap)

    const onVideoClick = () => {
        console.log(videoRef.current)
    }

    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play()
                setPlaying(true)
                setMuted(false)
            }
        } else {
            if (playing) {
                videoRef.current.pause()
                setPlaying(false)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisibile])

    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data.user} props={IS_VIDEO} />
                </PopperWrapper>
            </div>
        )
    }

    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.user.avatar} alt={data.user.nickname} />
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <div className={cx('author')}>
                        <Tippy
                            interactive
                            delay={[1000, 0]}
                            render={renderPreview}
                            placement={'bottom-start'}
                            offset={[-68, 33]}
                        >
                            <Link to="/profile" className={cx('author-anchor')}>
                                <h3 className={cx('nickname')}>{data.user.nickname}</h3>
                                <h4 className={cx('name')}>
                                    {data.user.first_name} {data.user.last_name}
                                </h4>
                            </Link>
                        </Tippy>
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
                    <div className={cx('video-card')} ref={videoWrap}>
                        <video
                            src={data.file_url}
                            muted={muted}
                            loop
                            className={cx('video')}
                            ref={videoRef}
                            onClick={onVideoClick}
                        />
                        <VideoControl data={data} videoRef={videoRef} muted={muted} />
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
