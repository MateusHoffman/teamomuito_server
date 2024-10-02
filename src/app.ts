import express from "express";
import cors from "cors";
// import allRoutes from "./routes";
import { connectDatabase } from "./config/database";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import mercadoPagoRouter from "./routes/mercadoPagoRoutes";
import purchaseRouter from "./routes/purchaseRoutes";

const app = express();

// Middlewares globais
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Conectar ao banco de dados
connectDatabase();

// Rotas
app.use("/api", mercadoPagoRouter);
app.use("/api", purchaseRouter);

app.use(errorMiddleware);

export default app;
