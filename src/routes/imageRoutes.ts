import { Router } from "express";
import {
  getImagesFromFolder,
  uploadImage,
} from "../controllers/imageController";
import multer from "multer";
import { storage } from "../config/cloudinary";

const imageRouter = Router();
const upload = multer({ storage });

imageRouter.post("/upload", upload.array("images"), uploadImage);
imageRouter.get("/getImagesFromFolder", getImagesFromFolder);

export default imageRouter;
