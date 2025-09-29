import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  queue: { type: mongoose.Schema.Types.ObjectId, ref: 'Queue', required: true },
  number: { type: Number, required: true },       // incremental token number
  customerName: String,
  status: { type: String, enum: ['waiting','assigned','served','cancelled'], default: 'waiting' },
  position: { type: Number, required: true },     // ordering within queue (1 = top)
  createdAt: { type: Date, default: Date.now },
  assignedAt: Date,
  servedAt: Date
});

const Token=mongoose.model("Token",TokenSchema);

export default Token;