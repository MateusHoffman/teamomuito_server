import { NextFunction, Request, Response } from "express";
import * as emailService from "../services/emailService";

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.info("/sendEmail");
    const email = await emailService.sendEmail(req);
    return res.status(200).json(email);
  } catch (error) {
    return next(error);
  }
};
