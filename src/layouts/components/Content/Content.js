import { useEffect, useRef, useState } from 'react'
import * as videoService from '~/services/videoService'
import classNames from 'classnames/bind'
import Video from '~/components/Video'
import styles from './Content.module.scss'

const cx = classNames.bind(styles)

function Content() {
    const [videos, setVideo] = useState([])
    const videoRef = useRef()

    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoService.getVideos({ type: 'for-you', page: 1 })
            setVideo(result)
        }

        console.log(videos[1])

        fetchApi()
    }, [])

    const handleScroll = () => {
        const videosLen = videos.length
        const windowHeight = window.innerHeight

        const videoEl = videos.map()
    }

    // useEffect(() => {
    //     window.addEventListener('load', videoScroll)
    //     window.addEventListener('scroll', videoScroll)

    //     function videoScroll() {
    //         if (document.querySelectorAll('video[autoplay]').length > 0) {
    //             var windowHeight = window.innerHeight,
    //                 videoEl = document.querySelectorAll('video[autoplay]')

    //             for (var i = 0; i < videoEl.length; i++) {
    //                 var thisVideoEl = videoEl[i],
    //                     videoHeight = thisVideoEl.clientHeight,
    //                     videoClientRect = thisVideoEl.getBoundingClientRect().top

    //                 if (
    //                     videoClientRect <= windowHeight - videoHeight * 0.5 &&
    //                     videoClientRect >= 0 - videoHeight * 0.5
    //                 ) {
    //                     thisVideoEl.play()
    //                 } else {
    //                     thisVideoEl.pause()
    //                 }
    //             }
    //         }
    //     }

    //     return () => {
    //         window.removeEventListener('load', videoScroll)
    //         window.removeEventListener('scroll', videoScroll)
    //     }
    // }, [])

    return (
        <div className={cx('wrapper')}>
            {videos.map((video) => (
                <Video key={video.id} data={video} ref={videoRef} />
            ))}
        </div>
    )
}

export default Content
