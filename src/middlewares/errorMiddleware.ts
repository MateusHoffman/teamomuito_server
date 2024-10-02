import { Request, Response, NextFunction } from "express";

// Definição de tipos para diferentes tipos de erros
interface ErrorResponse extends Error {
  statusCode?: number;
}

// Middleware centralizado para tratamento de erros
export const errorMiddleware = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Erro de validação
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Erro de validação: " + err.message;
  }

  // Erro de autenticação
  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Não autorizado";
  }

  // Erros relacionados ao banco de dados (por exemplo, falhas de chave primária)
  if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "MongoError"
  ) {
    statusCode = 400;
    message = "Conflito de dados no banco de dados: " + err.message;
  }

  // Erro de requisição malformada
  if (err.name === "SyntaxError" && err.message.includes("JSON")) {
    statusCode = 400;
    message = "Erro na requisição: JSON malformado";
  }

  // Define o status da resposta HTTP
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: err.stack,
  });
};


// USE next(error); DENTRO DO CATCH