import express from "express";
import cors from "cors";

import { connectDatabase } from "./config/database";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import mercadoPagoRoutes from "./routes/mercadoPagoRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import emailRoutes from "./routes/emailRoutes";
import imageRoutes from "./routes/imageRoutes";

const app = express();

// Middlewares globais
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// Conectar ao banco de dados
connectDatabase();

// Rotas
app.use("/api", mercadoPagoRoutes);
app.use("/api", purchaseRoutes);
app.use("/api", emailRoutes);
app.use("/api", imageRoutes);

app.use(errorMiddleware);

export default app;
