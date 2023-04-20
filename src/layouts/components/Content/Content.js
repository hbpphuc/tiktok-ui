import { useEffect, useState } from 'react'
import * as videoService from '~/services/videoService'
import classNames from 'classnames/bind'
import Video from '~/components/Video'
import styles from './Content.module.scss'

const cx = classNames.bind(styles)

function Content() {
    const [videos, setVideo] = useState([])

    // const randomNumber = Math.floor(Math.random() * 20)

    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoService.getVideos({ type: 'for-you', page: 1 })
            setVideo(result)
        }

        fetchApi()
    }, [])

    return (
        <div className={cx('wrapper')}>
            {videos.map((video) => (
                <Video key={video.id} data={video} />
            ))}
        </div>
    )
}

export default Content
