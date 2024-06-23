"use client";

import { useState } from 'react';
import Layout from '../../components/Layout';
import { createMahasiswa } from '@/modules/fetchMahasiswa';
import { useRouter } from 'next/navigation'

export default function TambahMahasiswa() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nim: '',
    nama_mahasiswa: '',
    program_studi: '',
    tanggal_lahir: '',
    alamat: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    
    const res = await createMahasiswa(formData)

    if (res.message == 'sukses') {
      alert('Mahasiswa berhasil ditambahkan')
      router.push(`/daftar-mahasiswa`)
    } else {
      alert(res.message)
    }
  };

  return (
    <Layout>
      <div className='w-full space-y-5'>
        <h1 className='text-2xl font-bold text-gray-950'>Tambah Mahasiswa Baru</h1>
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-lg bg-slate-700 p-5 rounded-lg'>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='nim' className='block font-medium text-gray-50'>
                  NIM
                </label>
                <input
                  type='text'
                  id='nim'
                  name='nim'
                  value={formData.nim}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='nama_mahasiswa' className='block font-medium text-gray-50'>
                  Nama Mahasiswa
                </label>
                <input
                  type='text'
                  id='nama_mahasiswa'
                  name='nama_mahasiswa'
                  value={formData.nama_mahasiswa}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='program_studi' className='block font-medium text-gray-50'>
                  Program Studi
                </label>
                <input
                  type='text'
                  id='program_studi'
                  name='program_studi'
                  value={formData.program_studi}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='tanggal_lahir' className='block font-medium text-gray-50'>
                  Tanggal Lahir
                </label>
                <input
                  type='date'
                  id='tanggal_lahir'
                  name='tanggal_lahir'
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='alamat' className='block font-medium text-gray-50'>
                  alamat
                </label>
                <input
                  type='text'
                  id='alamat'
                  name='alamat'
                  value={formData.alamat}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='w-full flex justify-center'>
                <button
                  type='submit'
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Tambah Mahasiswa
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
