import { Router } from "express";
import { paymentController } from "../controllers/payment.controller";

const payments = Router();
payments.post("/create", paymentController.create);

export default payments;
