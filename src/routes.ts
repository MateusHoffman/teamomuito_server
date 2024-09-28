import dotenv from "dotenv";
import express from "express";
import OrderModel from "./models";
import Stripe from "stripe";
dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

// Endpoint para iniciar intenção de compra
router.post("/checkout", async (req, res) => {
  const { name, email } = req.body;
  const slug = Math.random().toString(36).substring(2, 15);

  try {
    const order = await OrderModel.create({ name, email, slug });
    console.log("order: ", order);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1Q0a76P17dwzDq34rjE0nJtZ", // Substitua pelo seu ID de preço
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://iloveyou-client.vercel.app/${slug}`,
      cancel_url: `https://www.linkedin.com/in/mateushoffman/`,
    });

    console.log("session: ", session);
    res.json({ url: session.url });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Endpoint para buscar pedido
router.get("/order/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const order = await OrderModel.findOne({ slug });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
