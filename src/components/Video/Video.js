import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import Image from '../Image'
import styles from './Video.module.scss'

const cx = classNames.bind(styles)

function Video({ data }) {
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
                    <video src={data.file_url} autoPlay className={cx('video')} />
                </div>
            </div>
        </div>
    )
}

export default Video
