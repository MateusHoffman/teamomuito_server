// import mongoose, { Document, Schema } from "mongoose";

// // Definindo a interface PurchaseData
// interface PurchaseData {
//   manName: string;
//   womanName: string;
//   startDate: string;
//   startTime: string;
//   message: string;
//   youtubeLink: string;
//   photos: string[]; // Array de strings
// }

// // Definindo a interface Purchase, extendendo Document do Mongoose
// export interface Purchase extends Document {
//   slug: string;
//   paid: boolean;
//   email: string;
//   name: string;
//   created: string; // Se você preferir, pode usar Date
//   data: PurchaseData;
// }

// // Criando o schema para PurchaseData
// const PurchaseDataSchema: Schema = new Schema({
//   manName: { type: String, required: true },
//   womanName: { type: String, required: true },
//   startDate: { type: String, required: true },
//   startTime: { type: String, required: true },
//   message: { type: String, default: "" },
//   youtubeLink: { type: String, default: "" },
//   photos: { type: [String], required: true },
// });

// // Criando o schema para Purchase
// const PurchaseSchema: Schema = new Schema({
//   slug: { type: String, required: true, unique: true },
//   email: { type: String, default: "" },
//   name: { type: String, default: "" },
//   created: { type: String, default: "" },
//   paid: { type: Boolean, default: false },
//   data: { type: PurchaseDataSchema, required: true },
// });

// // Criando o modelo
// const PurchaseModel = mongoose.model<Purchase>("Purchase", PurchaseSchema);

// export default PurchaseModel;
