"use client";

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Layout({children}) {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div className="w-full min-h-[800px]">
            <div className="h-screen w-24 xl:w-80 bg-slate-700 fixed p-7">
                <div className="w-full h-full text-center space-y-5">
                    <h1 className="text-3xl text-gray-50 font-bold p-3"> Perpusku.</h1>
                    <div className="w-full space-y-5">
                        <div>
                            <Link href="/" className={`w-full h-12 rounded-lg cursor-pointer hover:bg-white/30 flex items-center justify-center ${pathname == '/' ? 'bg-white/30' : ''}`}>
                            <p className="text-xl text-gray-50 font-medium">Dashboard</p>
                            </Link>
                        </div>
                       <div>
                            <Link href="/daftar-buku" className={`w-full h-12 rounded-lg cursor-pointer hover:bg-white/30 flex items-center justify-center ${pathname == '/daftar-buku' ? 'bg-white/30' : ''}`}>
                            <p className="text-xl text-gray-50 font-medium">Daftar Buku</p>
                            </Link>
                        </div>
                        <div>
                            <Link href="/daftar-mahasiswa" className={`w-full h-12 rounded-lg cursor-pointer hover:bg-white/30 flex items-center justify-center ${pathname == '/daftar-mahasiswa' ? 'bg-white/30' : ''}`}>
                            <p className="text-xl text-gray-50 font-medium">Daftar Mahasiswa</p>
                            </Link>
                        </div>
                        <div>
                            <Link href="/histori" className={`w-full h-12 rounded-lg cursor-pointer hover:bg-white/30 flex items-center justify-center ${pathname == '/histori' ? 'bg-white/30' : ''}`}>
                            <p className="text-xl text-gray-50 font-medium">Histori</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-[800px] w-full pl-24 xl:pl-80">
                <div className="w-full p-7 space-y-7">
                    {pathname != '/tambah-transaksi' ? (
                        <div className="w-full flex justify-end">
                        <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onClick={() => {router.push(`/tambah-transaksi`)}}>
                            Tambah Transaksi
                        </button>
                    </div>
                    ) : (
                        <></>
                    )}
                    <div className="w-full min-h-[600px] bg-white rounded-lg shadow-md p-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}