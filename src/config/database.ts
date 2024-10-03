import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async () => {
  try {
    // Verifica o ambiente (produção ou desenvolvimento)
    const mongoUri =
      process.env.NODE_ENV === "PROD"
        ? process.env.MONGODB_URI_PROD // MongoDB de produção
        : process.env.MONGODB_URI_DEV; // MongoDB de desenvolvimento

    if (!mongoUri) {
      throw new Error("MongoDB URI não foi configurada corretamente.");
    }

    // Conectando ao banco de dados correto de acordo com o ambiente
    await mongoose.connect(mongoUri);
    console.info(
      `Conectado ao MongoDB no ambiente ${
        process.env.NODE_ENV || "development"
      }`
    );
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1); // Encerra o processo caso não consiga conectar
  }
};
