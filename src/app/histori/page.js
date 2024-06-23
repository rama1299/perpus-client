"use client";

import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { getHistori } from '@/modules/fetchHistori';
import { getNamaBuku } from '@/modules/fetchBuku';
import { getNamaMahasiswa } from '@/modules/fetchMahasiswa';
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation';

export default function DaftarMahasiswa() {
  const [data, setData] = useState([]);
  const [dataBuku, setDataBuku] = useState([])
  const [dataMahasiswa, setDataMahasiswa] = useState([])
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [isFilterMahasiswa, setIsFilterMahasiswa] = useState(true)
  const [isFilterBuku, setIsFilterBuku] = useState(false)
  const [isFilterLama, setIsFilterLama] = useState(false)

  const arrFilterType = ['mahasiswa', 'buku', 'lama']

  const router = useRouter()

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await getHistori();
        setData(result.data);
        const resultBuku = await getNamaBuku();
        setDataBuku(resultBuku.data);
        const resultMahasiswa = await getNamaMahasiswa();
        setDataMahasiswa(resultMahasiswa.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleChangeOptionFilter = (e) => {
    const type = e.target.value
    if (type ==='mahasiswa') {
        setIsFilterBuku(false)
        setIsFilterMahasiswa(true)
        setIsFilterLama(false)
    }
    if (type ==='buku') {
        setIsFilterBuku(true)
        setIsFilterMahasiswa(false)
        setIsFilterLama(false)
    }
    if (type ==='lama') {
        setIsFilterBuku(false)
        setIsFilterMahasiswa(false)
        setIsFilterLama(true)
    }
  }

  return (
    <Layout>
      <div className='w-full space-y-5'>
      <div className='flex w-full justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-950'>Histori</h1>
            <div className='flex space-x-2'>
                <p>Filter:</p>
                <select
                    value=''
                    onChange={handleChangeOptionFilter}
                    className='block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                    required
                  >
                    {arrFilterType.map((filter,i) => (
                      <option key={i} value={filter}>
                        {filter.replace(/\b\w/g, char => char.toUpperCase())}
                      </option>
                    ))}
                  </select>
                  {isFilterMahasiswa && 
                            <select
                                value=''
                                // onChange={handleChangeOption}
                                className='block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                                required
                              >   
                              <option key='' value=''>
                                    Pilih Filter
                                  
                                </option>
                                {dataMahasiswa.map((mahasiswa,i) => (
                                  <option key={mahasiswa.nim} value={mahasiswa.nim}>
                                    {mahasiswa.nama_mahasiswa}
                                  </option>
                                ))}
                              </select>
                }
                  {isFilterBuku && 
                            <select
                                value=''
                                // onChange={handleChangeOption}
                                className='block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                                required
                              >
                                {dataBuku.map((buku,i) => (
                                  <option key={buku.buku_id} value={buku.buku_id}>
                                    {buku.nama_buku}
                                  </option>
                                ))}
                              </select>
                }
                {isFilterLama && 
                    <input
                    className='border border-gray-300 rounded-md shadow-sm py-1 px-2 sm:text-sm'
                    type='tell'></input>
                }
            </div>

        </div>
        {loading ? (
          <div>Loading...</div>
        ) : data.length > 0 ? (
        <div className='w-full space-y-5'>
          <table className="table-auto w-full border">
              <thead className="bg-slate-700 text-gray-50">
                <tr>
                    <th className=" py-2">NIM</th>
                    <th className=" py-2">Nama Mahasiswa</th>
                    <th className=" py-2">Buku</th>
                    <th className=" py-2">Tanggal Pinjam</th>
                    <th className=" py-2">Tanggal Kembali</th>
                    <th className=" py-2">Lama Pinjam</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => (
                <tr key={item.id_buku} className={i%2 == 0 ? '' : 'bg-slate-100'}>
                    <td className="py-2 pl-2">{item.nim}</td>
                    <td className="py-2">{item.nama_mahasiswa}</td>
                    <td className="py-2 ">{item.nama_buku}</td>
                    <td className="py-2 ">{item.tanggal_pinjam}</td>
                    <td className="py-2 ">{item.tanggal_kembali}</td>
                    <td className="py-2 ">{item.lama_pinjam}</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
    </Layout>
  );
}
