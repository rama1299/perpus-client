"use client";

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { createTransaksi } from '@/modules/fetchTransaksi';
import { getNamaBuku } from '@/modules/fetchBuku';
import { useRouter } from 'next/navigation'

export default function TambahTransaksi() {
  const router = useRouter()
  const [namaBuku, setNamaBuku] = useState([])
  const [totalPinjam, setTotalPinjam] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNamaBuku();
        setNamaBuku(result.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
    alert('terdapat bug saat memilih buku, pastikan telah mengganti pilihan dari default nya terlebih dahulu sebelum submit')
  }, []);

  const [formData, setFormData] = useState({
    nim: '',
    tanggal_pinjam: '',
    tanggal_kembali: '',
    ids_buku: []
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [temp_ids_buku, setTemp_ids_buku] = useState([])

  const handleChangeOption = (e) => {
    const indexInput = e.target.tabIndex;
    const id_buku = e.target.value;
  
    let cekTemp = temp_ids_buku.find(obj => obj.index === indexInput);
  
    if (cekTemp) {
      let temp_ids_buku_update = temp_ids_buku.map(obj => {
        if (obj.index === indexInput) {
          return {
            ...obj,
            id_buku: id_buku
          };
        } else {
          return obj; 
        }
      });
  
      setTemp_ids_buku(temp_ids_buku_update);
    } else {
      let newObj = {
        index: indexInput,
        id_buku: id_buku
      };
      setTemp_ids_buku([...temp_ids_buku, newObj]);
    }
  
    const extracTempIds = temp_ids_buku.map((item) => Number(item.id_buku));
    
    // Adding the new id_buku to the list before updating formData
    if (!cekTemp) {
      extracTempIds.push(Number(id_buku));
    }
  
    setFormData({
      ...formData,
      ids_buku: extracTempIds
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createTransaksi(formData)

    if (res.message == 'sukses') {
      alert('Transaksi berhasil ditambahkan')
      router.push(`/`)
    } else {
      alert(res.message)
    }
  };

  return (
    <Layout>
      <div className='w-full space-y-5'>
        <h1 className='text-2xl font-bold text-gray-950'>Tambah Transaksi Baru</h1>
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
                <label htmlFor='tanggal_pinjam' className='block font-medium text-gray-50'>
                  Tanggal Pinjam
                </label>
                <input
                  type='date'
                  id='tanggal_pinjam'
                  name='tanggal_pinjam'
                  value={formData.tanggal_pinjam}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='tanggal_kembali' className='block font-medium text-gray-50'>
                  Tanggal Kembali
                </label>
                <input
                  type='date'
                  id='tanggal_kembali'
                  name='tanggal_kembali'
                  value={formData.tanggal_kembali}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                  required
                />
              </div>
              {Array.from({ length: totalPinjam }).map((_, i) => (
                <div className='mb-4' key={i}>
                  <label htmlFor={`ids_buku_${i}`} className='block font-medium text-gray-50'>
                    Pilih Buku {i + 1}
                  </label>
                  <select
                    id={`ids_buku_${i}`}
                    tabIndex={i}
                    name={`ids_buku_${i}`}
                    value={formData.ids_buku[i]}
                    onChange={handleChangeOption}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                    required
                  >
                    <option value='' disabled>{`Pilih Buku ${i + 1}`}</option>
                    {namaBuku.map(buku => (
                      <option key={buku.id_buku} value={buku.id_buku}>
                        {buku.nama_buku}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="w-full flex justify-end">
                <button className="px-2 py-1 text-sm bg-red-400 rounded-md hover:bg-red-500" onClick={(e) => {e.preventDefault();setTotalPinjam(totalPinjam+1)}}>
                  Tambah Buku
                </button>
              </div>
              <div className='w-full flex justify-center'>
                <button
                  type='submit'
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Tambah Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
