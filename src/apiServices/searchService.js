import * as instance from '~/utils/request'

export const search = async (q) => {
    try {
        const res = await instance.get('users/search', {
            params: {
                q,
            },
        })
        return res.users
    } catch (error) {
        console.log(error)
    }
}
