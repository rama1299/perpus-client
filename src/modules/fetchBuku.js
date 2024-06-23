import { instance } from './axios';

const getBuku = async (page, limit) => {
    try {
        const resp = await instance.get(`/buku?page=${page}&limit=${limit}`)
        return resp.data
    } catch (error) {
        console.log(error.message)
        const errorData = error.response.data || {message: 'Something error'}
        return errorData
    }
}

const createBuku = async (data) => {
    try {
        const resp = await instance.post(`/buku`, data)
        return resp.data
    } catch (error) {
        console.log(error.message)
        const errorData = error.response.data || {message: 'Something error'}
        return errorData
    }
}

const getNamaBuku = async () => {
    try {
        const resp = await instance.get(`/buku/daftar-nama-buku`)
        return resp.data
    } catch (error) {
        console.log(error.message)
        const errorData = error.response.data || {message: 'Something error'}
        return errorData
    }
}

export {getBuku, createBuku, getNamaBuku}