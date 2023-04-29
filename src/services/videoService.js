import * as httpRequest from '~/utils/httpRequest'

export const getVideos = async ({ type, page }) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getVideosPath = async ({ upload_file, config }) => {
    try {
        const res = await httpRequest.post('videos', { upload_file }, config)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
