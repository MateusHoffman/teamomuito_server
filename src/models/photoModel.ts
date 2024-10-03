import mongoose, { Document, Schema } from "mongoose";

export interface Photo extends Document {
  photoId: mongoose.Types.ObjectId;
  photos: string[];
}

const PhotoSchema: Schema = new Schema({
  photoId: { type: mongoose.Types.ObjectId, required: true, unique: true },
  photos: { type: [String], required: true },
});

const PhotoModel = mongoose.model<Photo>("Photo", PhotoSchema);

export default PhotoModel;
