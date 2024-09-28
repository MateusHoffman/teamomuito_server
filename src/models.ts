import mongoose, { Document, Schema } from "mongoose";

interface Order extends Document {
  name: string;
  email: string;
  paymentStatus: boolean;
  slug: string;
}

const orderSchema = new Schema<Order>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  paymentStatus: { type: Boolean, default: false },
  slug: { type: String, required: true, unique: true },
});

const OrderModel = mongoose.model<Order>("Order", orderSchema);
export default OrderModel;
