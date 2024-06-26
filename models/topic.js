import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    tanggal: { type: Date, required: true },
    suhu: { type: Number, required: true },
    berat_badan: { type: Number, required: true },
    tekanan_darah: { type: String, required: true },
    catatan_tambahan: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);  

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;

