import dotenv from "dotenv";
import express, { Request, Response } from "express";
import Stripe from "stripe";
import { generateId, removeAccents } from "./utils/helpers";
import PurchaseModel from "./models";

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

router.post("/checkout", async (req: Request, res: Response) => {
  const body = req.body;
  const slug = encodeURIComponent(
    `${generateId()}-${removeAccents(body?.manName)}-e-${removeAccents(
      body?.womanName
    )}`
  );

  try {
    const successUrl = `${process.env.CLIENT_URL}/${slug}/QRCode`;
    const cancelUrl = `${process.env.CLIENT_URL}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      line_items: [
        {
          price: "price_1Q0a76P17dwzDq34rjE0nJtZ",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        slug,
      },
    });

    const purchase = new PurchaseModel({
      slug: slug || "",
      email: "",
      name: "",
      created: "",
      paid: false,
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

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

router.post("/webhook", async (req: Request, res: Response) => {
  const event = req.body;
  if (event?.type === "checkout.session.completed") {
    const updateData = {
      email: event?.data?.object?.customer_details?.email || "",
      name: event?.data?.object?.customer_details?.name || "",
      created: event?.created || "",
      paid: true,
    };
    const updatedPurchase = await PurchaseModel.findOneAndUpdate(
      { slug: event?.data?.object?.metadata?.slug },
      updateData,
      { new: true }
    );
    return updatedPurchase;
  }
  res.json({ received: true });
});


router.get("/getPurchaseBySlug", async (req: Request, res: Response) => {
  const {slug} = req.query;

  const purchase = await PurchaseModel.findOne({ slug });

  return res.status(200).json(purchase);
});

export default router;
