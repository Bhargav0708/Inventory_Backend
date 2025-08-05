import { Request, Response } from "express";
import { warehouseService } from "../services/warehouse.services";
import { customError } from "../helpers/customError";

export const warehouseController = {
  async create(req: Request, res: Response) {
    const warehouse_create = await warehouseService.create(req.body);
    res.status(201).json({
      data: warehouse_create,
      msg: "Your Warehouse is succesfully created",
    });
  },
  async getAll(req: Request, res: Response) {
    const allwarehouses = await warehouseService.getAll();
    res.status(200).json({ data: allwarehouses });
  },
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      const updatedwarehouse = await warehouseService.update(req.body, id);
      if (updatedwarehouse?.length == 1) {
        res.status(200).json({
          data: updatedwarehouse,
          msg: "WareHouse data updated succesfully",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Warehouse Data is not updated succesfully",
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
      const deleteedwarehouse = await warehouseService.delete(id);
      if (deleteedwarehouse > 0) {
        res.status(200).json({
          data: deleteedwarehouse,
          msg: "Warehouse data is succesfully deleted ",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Warehouse data is not successfully  deleted ",
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
        if (error.errorKey == "WAREHOUSE_NOT_FOUND") {
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
