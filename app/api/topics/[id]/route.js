import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTanggal: tanggal, newSuhu: suhu, newBB: berat_badan, newTensa: tekanan_darah, newDescription: catatan_tambahan } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, {tanggal, suhu, berat_badan, tekanan_darah, catatan_tambahan });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}