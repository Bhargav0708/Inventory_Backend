import { Request, Response } from "express";
import { paymentService } from "../services/payment.services";

export const paymentController = {
  async create(req: Request, res: Response) {
    // const payment_creation = await paymentService.create();
    // const payment_creation = await paymentService.create();
    const payment_creation = await paymentService.create(req.body);
    res.status(201).json({
      data: payment_creation,
      msg: "Payment genreated",
    });
  },
};
