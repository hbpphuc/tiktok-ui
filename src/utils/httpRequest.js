import axios from 'axios'
import config from '~/config'

const httpRequest = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option)
    return response.data
}

export const post = async (path, data = {}, config) => {
    const response = await httpRequest.post(path, data, config)
    return response.data
}

export default httpRequest
