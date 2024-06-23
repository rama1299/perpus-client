import { instance } from './axios';

const getDashboardTotalData = async () => {
    try {
        const resp = await instance.get(`/dashboard/total-data-tabel`)
        return resp.data
    } catch (error) {
        console.log(error.message)
        const errorData = error.response.data || {message: 'Something error'}
        return errorData
    }
}

export {getDashboardTotalData}