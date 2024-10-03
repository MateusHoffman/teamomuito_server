import express from "express";
import cors from "cors";

import { connectDatabase } from "./config/database";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import mercadoPagoRouter from "./routes/mercadoPagoRoutes";
import purchaseRouter from "./routes/purchaseRoutes";
import emailRouter from "./routes/emailRoutes";

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
app.use("/api", mercadoPagoRouter);
app.use("/api", purchaseRouter);
app.use("/api", emailRouter);

app.use(errorMiddleware);

export default app;
