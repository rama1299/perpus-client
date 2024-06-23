import { instance } from './axios';

const getHistori = async () => {
    try {
        const resp = await instance.get(`/history`)
        return resp.data
    } catch (error) {
        console.log(error.message)
        const errorData = error.response.data || {message: 'Something error'}
        return errorData
    }
}


export {getHistori}