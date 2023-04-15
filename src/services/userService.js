import * as httpRequest from '~/utils/httpRequest'

export const getSuggested = async ({ skip, limit }) => {
    try {
        const res = await httpRequest.get('users/', {
            params: {
                skip,
                limit,
            },
        })
        return res.users
    } catch (error) {
        console.log(error)
    }
}
