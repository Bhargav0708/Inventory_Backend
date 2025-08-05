import { Request, Response } from "express";
import { stockService } from "../services/stock.services";
import { customError } from "../helpers/customError";

export const stockController = {
  async create(req: Request, res: Response) {
    const Stock_create = await stockService.create(req.body);
    res.status(201).json({
      data: Stock_create,
      msg: "stock data has been inserted successfully",
    });
  },
  async getAll(req: Request, res: Response) {
    const allstocks = await stockService.getAll();
    res.status(200).json({ data: allstocks });
  },
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      const updatedstock = await stockService.update(req.body, id);
      if (updatedstock?.length == 1) {
        res
          .status(200)
          .json({ data: updatedstock, msg: "Stock data updated succesfully" });
      } else {
        res.status(200).json({
          data: null,
          msg: "The Stock data is not updated  ",
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      const deleteedstock = await stockService.delete(id);
      if (deleteedstock > 0) {
        res.status(200).json({
          data: deleteedstock,
          msg: "Stock data is succesfully deleted ",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Stock data is not deleted ",
        });
      }
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "ID_NAN") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
        if (error.errorKey == "STOCK_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
};
