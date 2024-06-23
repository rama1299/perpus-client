"use client";

import { useState } from 'react';
import Layout from '../../components/Layout';
import { createBuku } from '@/modules/fetchBuku';
import { useRouter } from 'next/navigation'

export default function TambahBuku() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nama_buku: '',
    penulis: '',
    penerbit: '',
    tahun_terbit: '',
    isbn: ''
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
    
    const res = await createBuku(formData)

    if (res.message == 'sukses') {
      alert('Buku berhasil ditambahkan')
      router.push(`/daftar-buku`)
    } else {
      alert(res.message)
    }
  };

  return (
    <Layout>
      <div className='w-full space-y-5'>
        <h1 className='text-2xl font-bold text-gray-950'>Tambah Buku Baru</h1>
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-lg bg-slate-700 p-5 rounded-lg'>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='nama_buku' className='block font-medium text-gray-50'>
                  Judul
                </label>
                <input
                  type='text'
                  id='nama_buku'
                  name='nama_buku'
                  value={formData.nama_buku}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='penulis' className='block font-medium text-gray-50'>
                  Penulis
                </label>
                <input
                  type='text'
                  id='penulis'
                  name='penulis'
                  value={formData.penulis}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='penerbit' className='block font-medium text-gray-50'>
                  Penerbit
                </label>
                <input
                  type='text'
                  id='penerbit'
                  name='penerbit'
                  value={formData.penerbit}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='tahun_terbit' className='block font-medium text-gray-50'>
                  Tahun Terbit
                </label>
                <input
                  type='number'
                  id='tahun_terbit'
                  name='tahun_terbit'
                  value={formData.tahun_terbit}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='isbn' className='block font-medium text-gray-50'>
                  ISBN
                </label>
                <input
                  type='text'
                  id='isbn'
                  name='isbn'
                  value={formData.isbn}
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
                  Tambah Buku
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
