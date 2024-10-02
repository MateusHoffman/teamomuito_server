import axios from "axios";
import { Request } from "express";

export const createCodePix = async (req: Request) => {
  const body = req?.body;

  const url = `${process.env.API_MERCADOPAGO}/v1/payments`;
  const content = {
    description: "Te Amo Muito - Presente",
    payer: {
      email: process.env.MEU_EMAIL,
    },
    payment_method_id: "pix",
    transaction_amount: 0.01,
    installments: 1,
    notification_url: `${process.env.URL_WEBHOOK}/api/notification`,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.MERCADO_PAGO_SECRET_KEY}`,
    "X-Idempotency-Key": body?.slug?.toString() || "",
  };

  try {
    const response = await axios.post(url, content, { headers });

    if (response?.data) {
      const qr_code =
        response.data.point_of_interaction?.transaction_data?.qr_code;
      const paymentId = response.data.id;
      const paymentStatus = response.data.status;

      await axios.post(`${process.env.SERVER_URL}/api/createPurchase`, {
        ...body,
        paymentId,
        qr_code,
        paymentStatus,
      });

      return qr_code;
    } else {
      throw new Error("Resposta da API está vazia ou inválida.");
    }
  } catch (error) {
    console.error("Erro createCodePix:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const notification = async (req: Request) => {
  const body = req?.body;
  const action = body?.action;
  if (action === "payment.updated") {
    const paymentId = body?.data?.id;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MERCADO_PAGO_SECRET_KEY}`,
    };
    const response = await axios.get(
      `${process.env.API_MERCADOPAGO}/v1/payments/${paymentId}`,
      { headers }
    );
    const payment = response?.data;

    await axios.patch(
      `${process.env.SERVER_URL}/api/updatePurchaseByPaymentId`,
      {
        paymentId,
        paymentStatus: payment?.status,
      }
    );
  }
};
