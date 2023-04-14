import axios from 'axios'

const instance = axios.create({ baseURL: 'https://dummyjson.com/' })

export const get = async (path, option = {}) => {
    const response = await instance.get(path, option)
    return response.data
}

export default instance
