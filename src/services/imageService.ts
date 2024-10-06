import { Request } from "express";
import { cloudinary } from "../config/cloudinary";

export const uploadImage = async (req: Request) => {
  const files = req.files as Express.Multer.File[];
  const photoUrls = files.map((file) => file.path);

  return { success: true, photos: photoUrls };
};

export const getImagesFromFolder = async (req: Request) => {
  try {
    const { folderName } = req.query;

    const data = await cloudinary.search
      .expression(`folder:${folderName}`)
      .execute();
    const photosUrl = data?.resources?.map((e: any) => e?.url);

    return photosUrl;
  } catch (error) {
    console.error("Erro ao obter as imagens por pasta");
  }
};
