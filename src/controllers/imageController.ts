import { NextFunction, Request, Response } from "express";
import * as imageService from "../services/imageService";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.info("/uploadImage");
    const upload = await imageService.uploadImage(req);
    return res.status(200).json(upload);
  } catch (error) {
    return next(error);
  }
};

export const getImagesFromFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.info("/getImagesFromFolder");
    const image = await imageService.getImagesFromFolder(req);
    return res.status(200).json(image);
  } catch (error) {
    return next(error);
  }
};
