import { Request, Response } from "express";
import { Purchase_orderServices } from "../services/purchase_order.services";
import { productService } from "../services/product.services";
import { Sales_orderServices } from "../services/sales_order.services";
import { customError } from "../helpers/customError";

export const sales_orderController = {
  async create(req: Request, res: Response) {
    // const data = req.user?.id;
    try {
      const product_id = Number(req.params.id);
      if (isNaN(product_id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      // console.log("the id is ", data);
      const purchase_orderdata = await Sales_orderServices.create(
        req.body,
        product_id
      );
      res.status(201).json({
        data: purchase_orderdata,
        msg: "the sales order is created",
      });
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
  async getAll(req: Request, res: Response) {
    const allSales = await Sales_orderServices.getAll();
    res.status(200).json({ data: allSales });
  },
  async update() {},
  async delete() {},
  async CustomrDataOfSalesOrder(req: Request, res: Response) {
    const AllCustomerData = await Sales_orderServices.CustomerDataOfSales();
    // return AllCustomerData;
    res.status(200).json({ AllCustomerData: AllCustomerData });
  },
  async SalesordersBySupplierID(req: Request, res: Response) {
    try {
      const supplier_id = Number(req.params.id);
      if (isNaN(supplier_id)) {
        throw new customError("ID_NAN", "Please Enter ID IN Number ");
      }
      // const SalesAllDataBySupplierID =
      // await Sales_orderServices.SalesAllDataBySupplierID(supplier_id);
      // const SalesAllData = await
    } catch (error) {}
  },
};
