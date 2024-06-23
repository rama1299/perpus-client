"use client";

import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { getBuku } from '@/modules/fetchBuku';
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation';


export default function DaftarBuku() {
  const [data, setData] = useState([]);
  const [dataInfo, setDataInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const router = useRouter()

  useEffect(() => {
    const pageParam = searchParams.get('page');

    let page = 1

    page = pageParam ? Number(pageParam) : 1;

    const fetchData = async () => {
      try {
        const result = await getBuku(page, 5);
        setData(result.data);
        setDataInfo({total_data: result.total_data, total_pages: result.total_pages, current_page: result.page})
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <Layout>
      <div className='w-full space-y-5'>
        <div className='flex w-full justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-950'>Daftar Buku</h1>
            <Link href='/tambah-buku'>
                <button className='py-1 px-3 rounded-lg bg-slate-700 text-gray-50 active:text-gray-950 active:bg-white border border-slate-700 duration-100'>Tambah Buku</button>
            </Link>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : data.length > 0 ? (
        <div className='w-full space-y-5'>
          <table className="table-auto w-full border">
              <thead className="bg-slate-700 text-gray-50">
                <tr>
                    <th className=" py-2">Judul</th>
                    <th className=" py-2">Penulis</th>
                    <th className=" py-2">Penerbit</th>
                    <th className=" py-2">Tahun Terbit</th>
                    <th className=" py-2">ISBN</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => (
                <tr key={item.id_buku} className={i%2 == 0 ? '' : 'bg-slate-100'}>
                    <td className="py-2 pl-2">{item.nama_buku}</td>
                    <td className="py-2 ">{item.penulis}</td>
                    <td className="py-2 ">{item.penerbit}</td>
                    <td className="py-2 ">{item.tahun_terbit}</td>
                    <td className="py-2 ">{item.isbn}</td>
                </tr>
                ))}
            </tbody>
          </table>
            <div className='w-full flex justify-center items-center space-x-2'>
                {dataInfo.current_page > 1 ? (
                    <button className='py px-2 font-bold rounded-md bg-gray-700 text-gray-50' onClick={() => {router.push(`/daftar-buku?page=${Number(dataInfo.current_page) - 1}`)}}>{`<`}</button>
                ) : (<></>)}
                <p className='text-lg'>{`${dataInfo.current_page}/${dataInfo.total_pages}`}</p>
                {dataInfo.current_page != dataInfo.total_pages? (
                    <button className='py px-2 font-bold rounded-md bg-gray-700 text-gray-50' onClick={() => {router.push(`/daftar-buku?page=${Number(dataInfo.current_page) + 1}`)}}>{`>`}</button>
                ) : (<></>)}              
            </div>
        </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
    </Layout>
  );
}
