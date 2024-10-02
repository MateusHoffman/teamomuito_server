import { Router } from "express";
import {
  createCodePix,
  notification,
} from "../controllers/mercadoPagoController";


const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/createCodePix", createCodePix);
mercadoPagoRouter.post("/notification", notification);

export default mercadoPagoRouter;
