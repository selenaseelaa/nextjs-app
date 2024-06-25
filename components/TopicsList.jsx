import { useState, useEffect } from 'react';
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { SITE_URL } from "@/constants/constants";

const getTopics = async () => {
  try {
    const apiUrl = `${SITE_URL}/api/topics`;
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return { topics: [] }; // Return an empty array if there's an error
  }
};

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopics();
        console.log("Fetched topics:", data); // Log fetched topics
        setTopics(data.topics);
      } catch (err) {
        console.error('Error fetching topics', err);
      }
    };
    
    fetchData();
  }, []); // Run only once on component mount

  console.log("Rendered topics:", topics); // Log rendered topics

  // // Function to format date from ISO 8601 to YYYY-MM-DD
  // const formatDate = (isoDate) => {
  //   const date = new Date(isoDate);
  //   return date.toISOString().split('T')[0];
  // };

  return (
    <div className="flex justify-center">
      {topics.length > 0 ? (
        <div className="overflow-auto max-h-[400px] w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-slate-200 text-center">
                <th className="py-3 px-4">No.</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Suhu (Celcius)</th>
                <th className="py-3 px-4">Berat Badan (kg)</th>
                <th className="py-3 px-4">Tekanan Darah (sistol/diastol)</th>
                <th className="py-3 px-4">Catatan Tambahan</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t, index) => (
                <tr key={t._id} className='h-20'>
                  <td className="py-3 border-b border-slate-300 text-center">{index + 1}</td> {/* Add sequence number */}
                  <td className="w-50 border-b border-slate-300 text-center text-sm">{t.tanggal}</td>
                  <td className="py-3 border-b border-slate-300 text-center">{t.suhu}</td>
                  <td className="py-3 border-b border-slate-300 text-center">{t.berat_badan}</td>
                  <td className="py-3 border-b border-slate-300 text-center">{t.tekanan_darah}</td>
                  <td className="py-3 px-4 border-b border-slate-300 text-center w-60 max-h-1 overflow-y-auto">{t.catatan_tambahan}</td>
                  <td className="py-3 px-4 border-b border-slate-300">
                    <RemoveBtn id={t._id} />
                    <Link href={`${SITE_URL}/editTopic/${t._id}`}>
                      <HiPencilAlt size={24} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null} {/* Render nothing if no topics */}
    </div>
  );
}