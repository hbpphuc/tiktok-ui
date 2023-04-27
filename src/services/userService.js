import * as httpRequest from '~/utils/httpRequest'

export const getSuggested = async ({ page, perPage }) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getFollower = async ({ page }) => {
    try {
        const res = await httpRequest.get('me/followings', {
            params: {
                page,
            },
        })
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const auth = async ({ email, password, config }) => {
    try {
        const res = await httpRequest.post('auth/login', JSON.stringify({ email, password }), config)
        return res.data
    } catch (error) {
        if (error.response.status === 401) {
            console.log('Tài khoản hoặc mật khẩu chưa chính xác')
        }
    }
}
