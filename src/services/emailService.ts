import { Request } from "express";
import nodemailer from "nodemailer";
import { generateHtmlResponseEmail } from "../utils/htmlEmail/htmlEmail";

export const sendEmail = async (req: Request) => {
  try {
    const body = req?.body;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailContent = await generateHtmlResponseEmail(`${process.env.CLIENT_URL}/${body?.slug}/QRCode`);

    const mailOptions = {
      from: `"Te Amo Muito" <${process.env.EMAIL_USER}>`,
      to: body?.email,
      subject: "Parabéns, aqui está o seu site",
      html: emailContent.html,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar email");
  }
};
