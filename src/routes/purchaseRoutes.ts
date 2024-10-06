import { Router } from "express";
import {
  createPurchase,
  getPurchaseBySlug,
  updatePurchaseByPaymentId,
} from "../controllers/purchaseController";

const purchaseRouter = Router();

purchaseRouter.post("/createPurchase", createPurchase);
purchaseRouter.patch("/updatePurchaseByPaymentId", updatePurchaseByPaymentId);
purchaseRouter.get("/getPurchaseBySlug", getPurchaseBySlug);

export default purchaseRouter;
