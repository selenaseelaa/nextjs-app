"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE_URL } from "@/constants/constants";
import Link from "next/link";

export default function EditTopicForm({ id, tanggal, suhu, berat_badan, tekanan_darah, catatan_tambahan }) {
  const [newTanggal, setNewTanggal] = useState(tanggal);
  const [newSuhu, setNewSuhu] = useState(suhu);
  const [newBB, setNewBB] = useState(berat_badan);
  const [newTensi, setNewTensi] = useState(tekanan_darah);
  const [newDescription, setNewDescription] = useState(catatan_tambahan);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${SITE_URL}/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newTanggal,
          newSuhu,
          newBB,
          newTensi,
          newDescription,
        }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to update topic: ${errorMessage}`);
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-20 gap-4">
      {/* Kontainer sebelah kiri  */}
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
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-4 w-full">
              Tambahkan Catatan
            </button>
          </Link>

          <img src="/cucidarah.gif" alt="GIF File" className="w-full" />
        </div>
      </div>

      {/* Kontainer sebelah kanan (lebar 3/4 dari total) */}
      <div className="w-3/4 mr-20 bg-white rounded-lg shadow-md h-[500px]">
        <div className="m-10">
          <h2 className="mb-10 font-bold">Update Catatan</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
            <div className="flex flex-col">
              <label htmlFor="tanggal" className="mb-1">
                Tanggal
              </label>
              <input
                id="tanggal"
                onChange={(e) => setNewTanggal(e.target.value)}
                value={newTanggal}
                className="border border-slate-500 px-8 py-2 w-full"
                type="date"
                placeholder="Masukkan Tanggal"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="suhu" className="mb-1">
                Suhu
              </label>
              <input
                id="suhu"
                onChange={(e) => setNewSuhu(e.target.value)}
                value={newSuhu}
                className="border border-slate-500 px-8 py-2 w-full"
                type="number"
                step="0.1"
                placeholder="Masukkan Suhu"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="berat_badan" className="mb-1">
                Berat Badan (kg)
              </label>
              <input
                id="berat_badan"
                onChange={(e) => setNewBB(e.target.value)}
                value={newBB}
                className="border border-slate-500 px-8 py-2 w-full"
                type="number"
                step="0.1"
                placeholder="Masukkan Berat Badan"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="tekanan_darah" className="mb-1">
                Tekanan Darah (sistol/diastol)
              </label>
              <input
                id="tekanan_darah"
                onChange={(e) => setNewTensi(e.target.value)}
                value={newTensi}
                className="border border-slate-500 px-8 py-2 w-full"
                type="text"
                placeholder="Masukkan Tekanan Darah"
                required
              />
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="catatan_tambahan" className="mb-1">
                Catatan Tambahan
              </label>
              <input
                id="catatan_tambahan"
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                className="border border-slate-500 px-8 py-2 w-full"
                type="text"
                placeholder="Masukkan Informasi Tambahan"
                required
              />
            </div>

            <button className="bg-green-600 font-bold text-white py-3 px-6 mt-4 w-full md:col-span-2">
              Update Catatan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}