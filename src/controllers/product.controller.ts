import { Request, Response } from "express";
import { productService } from "../services/product.services";
import { customError } from "../helpers/customError";
interface paginationData {
  limit: number;
  offset: number;
  sortBy: string;
  sortType: string;
  search: string;
}
export const productController = {
  async create(req: Request, res: Response): Promise<void> {
    const product = await productService.create(req.body);
    res.status(201).json({ data: product, msg: "Product has been created" });
  },
  async getAll(req: Request, res: Response) {
    try {
      const allusers = await productService.getAll();
      res.status(200).json({ data: allusers });
    } catch (error) {
      if (error instanceof customError) {
        if (error.errorKey == "TOKEN_EXPIRED") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      // if (req.file === undefined || req.file.path === undefined) {
      //   throw new customError(
      //     "FILE_REQUIRED",
      //     "Please Enter the Product Image "
      //   );
      // }
      const path = req.file?.path;

      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }

      const updateduser = await productService.update(req.body, path, id);
      if (updateduser!.length > 0) {
        res.status(200).json({
          data: updateduser,
          msg: " product updated succesfully",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "Product not updated",
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
        if (error.errorKey == "FILE_REQUIRED") {
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
      const deleteeduser = await productService.delete(id);
      if (deleteeduser > 0) {
        res.status(200).json({
          data: deleteeduser,
          msg: "The Proudct is succesfully deleted ",
        });
      } else {
        res.status(200).json({
          data: null,
          msg: "The Product is not deleted ",
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
        if (error.errorKey == "PRODUCT_NOT_FOUND") {
          res.status(400).json({
            success: false,
            errorKey: error.errorKey,
            error: error.errorMessage,
          });
        }
      }
    }
  },
  async FetchAllProductByid(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number");
      }
      // const allproductByid =await
    } catch (error) {
      throw error;
    }
  },
  async FetchSupplierAllInfo(req: Request, res: Response) {
    try {
      const pid = Number(req.params.id);
      if (isNaN(pid)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      const FetchSupplierInfo = await productService.fetchSupplierInfoBypid(
        pid
      );

      res.status(200).json({ data: FetchSupplierInfo });
    } catch (error) {
      throw error;
    }
  },
  // async SearchByNamePrice(req: Request, res: Response) {
  //   try {
  //     const { name, price } = req.query;
  //     const dataofserch = {
  //       nameSearch: name,
  //       priceSearch: price,
  //     };
  //     const searchedData = await productService.SearchByNameSearch(dataofserch);
  //     return searchedData;
  //     // const search  =
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  async searchData(req: Request, res: Response) {
    console.log("int the searchservice");
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.pageSize) || 20;
    const offset = limit * page;
    const sortBy = String(req.query.sortBy) || "title_amount";
    const sortType = req.query.sortType === "asc" ? "ASC" : "DESC";
    const search = String(req.query.search) || "";
    console.log("the search is", search);
    const paginationData: paginationData = {
      limit: limit,
      offset: offset,
      sortBy: sortBy,
      sortType: sortType,
      search: search,
    };
    console.log("the price or product data", paginationData);
    const SearchedData = await productService.SearchByNameSearch(
      paginationData
    );
    // if()
    console.log("the data of the search", SearchedData);
    if (SearchedData) {
      res.json({ data: SearchedData });
    } else {
      res.json({ data: null });
    }
  },
};
