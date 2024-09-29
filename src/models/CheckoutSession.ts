import mongoose, { Document, Schema } from 'mongoose';

interface ICheckoutSession extends Document {
  sessionId: string;
  customerId: string;
  amountTotal: number;
  currency: string;
  createdAt: Date;
}

const CheckoutSessionSchema: Schema = new Schema({
  sessionId: { type: String, required: true },
  customerId: { type: String, required: true },
  amountTotal: { type: Number, required: true },
  currency: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CheckoutSession = mongoose.model<ICheckoutSession>('CheckoutSession', CheckoutSessionSchema);

export default CheckoutSession;
