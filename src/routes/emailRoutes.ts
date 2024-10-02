import { Router } from "express";
import { sendEmail } from "../controllers/emailController";

const emailRouter = Router();

emailRouter.post("/sendEmail", sendEmail);

export default emailRouter;
