import { Request } from "express";
import PurchaseModel from "../models/purchaseModel";
import PhotoModel from "../models/photoModel";
import mongoose from "mongoose";

export const createPurchase = async (req: Request) => {
  const body = req?.body;
  const photo = new PhotoModel({
    photoId: new mongoose.Types.ObjectId(),
    photos: body?.photos || [],
  });
  await photo.save();

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
      photoId: photo._id,
    },
  });
  await purchase.save();
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
    if (purchase) {
      const photo = await PhotoModel.findOne({
        _id: new mongoose.Types.ObjectId(purchase.data.photoId),
      }).exec();
      if (photo) {
        const purchaseWithPhotos = {
          slug: purchase.slug,
          email: purchase.email,
          paymentId: purchase.paymentId,
          qr_code: purchase.qr_code,
          paymentStatus: purchase.paymentStatus,
          data: {
            manName: purchase.data.manName,
            womanName: purchase.data.womanName,
            startDate: purchase.data.startDate,
            startTime: purchase.data.startTime,
            message: purchase.data.message,
            youtubeLink: purchase.data.youtubeLink,
            photos: photo.photos,
          },
        };
        return purchaseWithPhotos;
      }
    }
    return purchase
      ? {
          slug: purchase.slug,
          email: purchase.email,
          paymentId: purchase.paymentId,
          qr_code: purchase.qr_code,
          paymentStatus: purchase.paymentStatus,
          data: {
            manName: purchase.data.manName,
            womanName: purchase.data.womanName,
            startDate: purchase.data.startDate,
            startTime: purchase.data.startTime,
            message: purchase.data.message,
            youtubeLink: purchase.data.youtubeLink,
            photos: [],
          },
        }
      : null;
  } catch (error) {
    console.error("Erro ao buscar a compra pelo slug:", error);
    throw new Error("Erro ao buscar a compra. Tente novamente mais tarde.");
  }
};
