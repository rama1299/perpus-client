"use client";

import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { getDashboardTotalData } from '@/modules/fetchDashboard';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const arrColor = ['bg-green-400', 'bg-blue-400', 'bg-red-400', 'bg-purple-400', 'bg-orange-400'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboardTotalData();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className='w-full space-y-5'>
        <h1 className='text-2xl font-bold text-gray-950'>Dashboard</h1>
        {loading ? (
          <div>Loading...</div>
        ) : data.length > 0 ? (
          <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-3'>
            {Object.entries(data[0]).map(([key, value], i) => (
              <div key={key} className={`w-full h-40 rounded-lg shadow-sm relative ${arrColor[i]}`}>
                <div className='w-full absolute p-3 text-gray-950'>
                  <p className='text-xl font-medium'>{key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                </div>
                <div className='w-full h-full flex justify-center items-center'>
                  <h1 className='text-4xl font-bold text-gray-50'>{value}</h1>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
    </Layout>
  );
}
