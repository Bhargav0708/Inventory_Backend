import { Request, Response } from "express";
import { AddresService } from "../services/adress.services";
import { customError } from "../helpers/customError";

export const AddressController = {
  async create(req: Request, res: Response) {
    const AddresCreate = await AddresService.create(req.body);
    res
      .status(201)
      .json({ data: AddresCreate, msg: "Address Has Been Inserted" });
  },
  async getAll(req: Request, res: Response) {
    const alladdress = await AddresService.getAll();
    if (alladdress) {
      res.status(200).json({ data: alladdress });
    } else {
      res.status(200).json({ data: null, msg: "Address Not Found" });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const [updateduserAddress] = await AddresService.update(req.body, id);

      if (updateduserAddress > 0) {
        res.status(200).json({
          data: updateduserAddress,
          msg: " User Address updated succesfully",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "User Address is Not Updated ",
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
        throw new customError("ID_NAN", "Please Enter ID In Number ");
      }
      const deleteeduserAddress = await AddresService.delete(id);

      if (deleteeduserAddress! > 0) {
        res.status(200).json({
          data: deleteeduserAddress,
          msg: "The data is succesfully deleted ",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "User is not deleted",
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
        } else if (error.errorKey == "USER_NOT_FOUND") {
          res.status(404).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
};
