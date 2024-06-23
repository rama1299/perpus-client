import { instance } from './axios';

const createTransaksi = async (data) => {
    try {
        const resp = await instance.post(`/transaksi`, data)
        return resp.data
    } catch (error) {
        console.log(error.message)
        const errorData = error.response.data || {message: 'Something error'}
        return errorData
    }
}

export {createTransaksi}