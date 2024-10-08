import { Request } from "express";
import PurchaseModel from "../models/purchaseModel";
import axios from "axios";

export const createPurchase = async (req: Request) => {
  try {
    const body = req?.body;

    const purchase = new PurchaseModel({
      slug: body?.slug || "",
      email: body.email || "",
      paymentId: body?.paymentId || "",
      qr_code: body?.qr_code || "",
      paymentStatus: body?.paymentStatus || "pending",
      data: {
        manName: body?.manName || "",
        womanName: body?.womanName || "",
        startDate: body?.startDate || "",
        startTime: body?.startTime || "",
        message: body?.message || "",
        youtubeLink: body?.youtubeLink || "",
        photos: body?.photos || [],
      },
    });
    await purchase.save();
  } catch (error) {
    console.error("Erro ao criar purchase");
  }
};

export const updatePurchaseByPaymentId = async (req: Request) => {
  try {
    const { paymentId, paymentStatus } = req.body;
    const filter = { paymentId };
    const updatedPurchase = await PurchaseModel.findOneAndUpdate(
      filter,
      { paymentStatus },
      { new: true }
    );
    return updatedPurchase;
  } catch (error) {
    console.error("Erro ao atualizar documento:", error);
    throw new Error(
      "Erro ao atualizar o documento. Tente novamente mais tarde."
    );
  }
};

export const getPurchaseBySlug = async (req: Request) => {
  try {
    const { slug } = req?.query;
    const purchase = await PurchaseModel.findOne({ slug }).exec();
    return purchase;
  } catch (error) {
    console.error("Erro ao buscar a compra pelo slug:", error);
    throw new Error("Erro ao buscar a compra. Tente novamente mais tarde.");
  }
};
