import { Router } from "express";
import { purchase_orderController } from "../controllers/purchase_order.controller";
import { sales_orderController } from "../controllers/sales_order.controller";

const sales_order = Router();

sales_order.post("/create/:id", sales_orderController.create);
sales_order.get("/AllSalesData", sales_orderController.getAll);
sales_order.get(
  "/AllCustomerDataOfSales",
  sales_orderController.CustomrDataOfSalesOrder
);
sales_order.get("Allsales/:id", sales_orderController.SalesordersBySupplierID);
export default sales_order;
