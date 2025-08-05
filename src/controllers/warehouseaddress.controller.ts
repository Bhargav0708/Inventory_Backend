import { Request, Response } from "express";
import { warehouseAddessService } from "../services/warehouseaddress.services";
import { customError } from "../helpers/customError";

export const warehouseAddressController = {
  async create(req: Request, res: Response) {
    const warehouseAddressCreate = await warehouseAddessService.create(
      req.body
    );
    res.status(201).json({
      data: warehouseAddressCreate,
      msg: "Warehouse Adderess Details is Inserted ",
    });
  },
  async getAll(req: Request, res: Response) {
    const allwarehouseaddress = await warehouseAddessService.getAll();
    res.status(200).json({ data: allwarehouseaddress });
  },
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      const updatedwarehouseaddress = await warehouseAddessService.update(
        req.body,
        id
      );
      if (updatedwarehouseaddress?.length == 1) {
        res.status(200).json({
          data: updatedwarehouseaddress,
          msg: "Warehouse Address Data updated succesfully",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Warehouse Address Data is not Updated ",
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
      const deleteedwarehouseaddres = await warehouseAddessService.delete(id);
      if (deleteedwarehouseaddres > 0) {
        res.status(200).json({
          data: deleteedwarehouseaddres,
          msg: "The Warehouse Address Data is Successfully Deleted ",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "The WareHouse data is not Deleted  ",
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
};
