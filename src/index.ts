import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Adicionando um valor padrão para desenvolvimento
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Configurando o limite do payload para 10mb
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Rotas da API
app.use("/api", routes);

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
