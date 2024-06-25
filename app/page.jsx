'use client'

import TopicsList from "@/components/TopicsList";
import { SITE_URL } from "@/constants/constants";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

export default function Home() {
  return (
    <div className="flex justify-center mt-20 gap-4">
      {/* Kontainer sebelah kiri */}
      <div className="w-1/4 ml-20 mr-5 bg-white rounded-lg shadow-md p-10 h-[500px]">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Selamat Datang!</h2>
          <h4 className="mt-2 mb-4">Simpan riwayat cuci darah hari ini.</h4>

          <Link href={`${SITE_URL}/`}>
            <button disabled="true" className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md mt-5 mb-2 w-full">
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

      {/* Kontainer sebelah kanan hey */}
      <div className="w-3/4 mr-20 bg-white rounded-lg shadow-md h-[500px]">

         <div className="m-10">
         <h2 className="mb-3 font-bold">Catatan Keseluruhan</h2>
        <TopicsList />
        </div>
      </div>
    </div>
  );
}