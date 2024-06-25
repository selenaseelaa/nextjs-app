import EditTopicForm from "@/components/EditTopicForm";
import { SITE_URL } from "@/constants/constants";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`${SITE_URL}/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const { tanggal, suhu, berat_badan, tekanan_darah, catatan_tambahan } = topic;

  return <EditTopicForm id={id} tanggal={tanggal} suhu={suhu} berat_badan={berat_badan} tekanan_darah={tekanan_darah} catatan_tambahan={catatan_tambahan} />;
}