import { NextFunction, Request, Response } from "express";
import * as purchaseService from "../services/purchaseService";

export const createPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.info("/createPurchase");
    const purchase = await purchaseService.createPurchase(req);
    return res.status(200).json(purchase);
  } catch (error) {
    return next(error);
  }
};

export const updatePurchaseByPaymentId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.info("/updatePurchaseByPaymentId");
    const purchase = await purchaseService.updatePurchaseByPaymentId(req);
    return res.status(200).json(purchase);
  } catch (error) {
    return next(error);
  }
};

export const getPurchaseBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.info("/getPurchaseBySlug");
    const purchase = await purchaseService.getPurchaseBySlug(req);
    return res.status(200).json(purchase);
  } catch (error) {
    return next(error);
  }
};
