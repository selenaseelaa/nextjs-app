'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { SITE_URL } from '@/constants/constants';
import Link from 'next/link';

export default function AddTopic() {
  const [tanggal, setTanggal] = useState('');
  const [suhu, setSuhu] = useState('');
  const [berat_badan, setBB] = useState('');
  const [tekanan_darah, setTensi] = useState('');
  const [catatan_tambahan, setDescription] = useState('');

  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

    const search = (e) => {
                router.push({
                    pathname: '/search',
                    query: {
                        search: searchInput,
                    },
                })
              }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!tanggal || !suhu || !berat_badan || !tekanan_darah || !catatan_tambahan) {
      alert('All fields are required.');
      return;
    }

    try {
      const res = await fetch(`${SITE_URL}/api/topics`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          tanggal,
          suhu,
          berat_badan,
          tekanan_darah,
          catatan_tambahan,
        }),
      });

      if (res.ok) {
        // Redirect to home page after successful submission
        router.push('/');
      } else {
        throw new Error('Failed to create a topic');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <div className="flex justify-center mt-20 gap-4">
      {/* Left Container */}
      <div className="w-1/4 ml-20 mr-5 bg-white rounded-lg shadow-md p-10 h-[500px]">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Selamat Datang!</h2>
          <h4 className="mt-2 mb-4">Simpan riwayat cuci darah hari ini.</h4>

          <Link href={`${SITE_URL}/`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-5 mb-2 w-full">
              Catatan Keseluruhan
            </button>
          </Link>
         
          <Link href={`${SITE_URL}/addTopic`}>
            <button disabled className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md mb-4 w-full">
              Tambahkan Catatan
            </button>
          </Link>

          <img src="/cucidarah.gif" alt="GIF File" className="w-full" />
        </div>
      </div>

      {/* Right Container (3/4 width) */}
      <div className="w-3/4 mr-20 bg-white rounded-lg shadow-md h-[500px]">
        <div className="m-10">
          <h2 className="mb-10 font-bold">Tambahkan Catatan Hari Ini</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8"
          >
            <div className="flex flex-col">
              <label htmlFor="tanggal" className="mb-1">
                Tanggal
              </label>
              <input
                id="tanggal"
                onChange={(e) => setTanggal(e.target.value)}
                value={tanggal}
                className="border border-slate-500 px-8 py-2 w-full"
                type="date"
                placeholder="Tambahkan Tanggal"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="suhu" className="mb-1">Suhu</label>
              <input
                id="suhu"
                onChange={(e) => setSuhu(e.target.value)}
                value={suhu}
                className="border border-slate-500 px-4 py-2 w-full"
                type="text"
                placeholder="Tambahkan Suhu"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="berat_badan" className="mb-1">Berat Badan (kg)</label>
              <input
                id="berat_badan"
                onChange={(e) => setBB(e.target.value)}
                value={berat_badan}
                className="border border-slate-500 px-4 py-2 w-full"
                type="text"
                placeholder="Tambahkan Berat Badan"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="tekanan_darah" className="mb-1">Tekanan Darah (sistol/diastol)</label>
              <input
                id="tekanan_darah"
                onChange={(e) => setTensi(e.target.value)}
                value={tekanan_darah}
                className="border border-slate-500 px-4 py-2 w-full"
                type="text"
                placeholder="Tambahkan Tekanan Darah"
              />
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="catatan_tambahan" className="mb-1">Catatan Tambahan </label>
              <input
                id="catatan_tambahan"
                onChange={(e) => setDescription(e.target.value)}
                value={catatan_tambahan}
                className="border border-slate-500 px-4 py-2 w-full"
                type="text"
                placeholder="Masukkan Informasi Tambahan"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 font-bold text-white py-3 px-6 mt-4 w-full md:col-span-2"
            >
              Tambahkan Catatan Baru
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}