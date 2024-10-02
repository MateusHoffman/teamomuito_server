import { NextFunction, Request, Response } from 'express';
import * as mercadoPagoService from '../services/mercadoPagoService';

export const createCodePix = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.info('/createCodePix');
    const codePix = await mercadoPagoService.createCodePix(req);
    return res.status(200).json(codePix);
  } catch (error) {
    return next(error)
  }
};

export const notification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.info('/notification');
    const notification = await mercadoPagoService.notification(req);
    return res.status(200).json(notification);
  } catch (error) {
    return next(error);
  }
};



// export const getPaymentById = async (req: Request, res: Response) => {
//   try {
//     const payment = await mercadoPagoService.getPaymentById(req);
//     return res.status(200).json(payment);
//   } catch (error) {
//     return console.error('erro', error)
//   }
// };