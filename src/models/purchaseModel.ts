import mongoose, { Schema } from "mongoose";


export interface Purchase {
  slug: string;
  email: string;
  paymentId?: string;
  qr_code?: string;
  paymentStatus?: string;
  created?: Date;
  data: {
    manName: string;
    womanName: string;
    startDate: string;
    startTime: string;
    message: string;
    youtubeLink: string;
    photos: string[];
  };
}

const PurchaseSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  paymentId: { type: String, default: "" },
  qr_code: { type: String, default: "" },
  paymentStatus: { type: String, default: "pending" },
  created: { type: Date, default: Date.now },
  data: {
    manName: { type: String, required: true },
    womanName: { type: String, required: true },
    startDate: { type: String, required: true },
    startTime: { type: String, required: true },
    message: { type: String, default: "" },
    youtubeLink: { type: String, default: "" },
    photos: { type: [String], required: true, default: [] },
  },
});

const PurchaseModel = mongoose.model<Purchase>("Purchase", PurchaseSchema);

export default PurchaseModel;
