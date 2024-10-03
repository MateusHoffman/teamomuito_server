import mongoose, { Document, Schema } from "mongoose";

interface PurchaseData {
  manName: string;
  womanName: string;
  startDate: string;
  startTime: string;
  message: string;
  youtubeLink: string;
  photoId: mongoose.Types.ObjectId;
  photos?: string[];
}

export interface Purchase extends Document {
  slug: string;
  email: string;
  paymentId?: string;
  qr_code?: string;
  paymentStatus: string;
  created: Date;
  data: PurchaseData;
}

const PurchaseDataSchema: Schema = new Schema({
  manName: { type: String, required: true },
  womanName: { type: String, required: true },
  startDate: { type: String, required: true },
  startTime: { type: String, required: true },
  message: { type: String, default: "" },
  youtubeLink: { type: String, default: "" },
  photoId: { type: mongoose.Types.ObjectId, required: true, ref: "Photo" },
});

const PurchaseSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  paymentId: { type: String, default: "" },
  qr_code: { type: String, default: "" },
  paymentStatus: { type: String, default: "pending" },
  created: { type: Date, default: Date.now },
  data: { type: PurchaseDataSchema, required: true },
});

const PurchaseModel = mongoose.model<Purchase>("Purchase", PurchaseSchema);

export default PurchaseModel;
