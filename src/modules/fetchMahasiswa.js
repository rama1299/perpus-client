import { instance } from './axios';

const getMahasiswa = async (page, limit) => {
    try {
        const resp = await instance.get(`/mahasiswa?page=${page}&limit=${limit}`)
        return resp.data
    } catch (error) {
        console.log(error.message)
        const errorData = error.response.data || {message: 'Something error'}
        return errorData
    }
}

const getNamaMahasiswa = async () => {
    try {
        const resp = await instance.get(`/mahasiswa/daftar-nama`)
        return resp.data
    } catch (error) {
        console.log(error.message)
        const errorData = error.response.data || {message: 'Something error'}
        return errorData
    }
}

const createMahasiswa = async (data) => {
    try {
        const resp = await instance.post(`/mahasiswa`, data)
        return resp.data
    } catch (error) {
        console.log(error.message)
        const errorData = error.response.data || {message: 'Something error'}
        return errorData
    }
}

export {getMahasiswa, createMahasiswa, getNamaMahasiswa}