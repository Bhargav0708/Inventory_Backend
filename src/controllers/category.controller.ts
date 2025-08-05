import { Request, Response } from "express";
import { categoryService } from "../services/category.services";
import { customError } from "../helpers/customError";

export const categoryController = {
  async create(req: Request, res: Response): Promise<void> {
    const category = await categoryService.create(req.body);
    res.status(201).json({ data: category, msg: "Category has been created" });
  },

  async getAll(req: Request, res: Response) {
    const allacategories = await categoryService.getAll();
    res.status(200).json({ data: allacategories, msg: "All categoties" });
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      const updatedcateogires = await categoryService.update(req.body, id);

      if (updatedcateogires.length > 0) {
        res.status(200).json({
          updatedcateogires: updatedcateogires,
          msg: " catoegry Updated Succesfully",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "cateogry is not updated",
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
      const deleteduser = await categoryService.delete(id);
      if (deleteduser > 0) {
        res
          .status(200)
          .json({ data: deleteduser, msg: " Cateogry isDeleted Successfully" });
      } else {
        res.status(200).json({ msg: "Category is not deleted" });
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
