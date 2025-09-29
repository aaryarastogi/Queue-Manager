import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Queue=mongoose.model("Queue",QueueSchema);

export default Queue;