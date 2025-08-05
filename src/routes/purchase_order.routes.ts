import { Router } from "express";
import { purchase_orderController } from "../controllers/purchase_order.controller";
import { verifyToken } from "../middlewares/verifytoken";

const purchase_order = Router();

// purchase_order.post("/create/:id", purchase_orderController.create);
// purchase_order.post("/create/:id", purchase_orderController.create)
purchase_order.post("/create/:id", purchase_orderController.create);
purchase_order.put(
  "/updatepurchase/:id",
  verifyToken(["supplier", "admin", "customer"]),
  purchase_orderController.update
);
purchase_order.delete("/deletepurchase/:id", purchase_orderController.delete);
purchase_order.get(
  "/purchaseordersByUserid/:id",
  purchase_orderController.PurchaseorderbyUseridget
);
purchase_order.get("/allpurchaseorders", purchase_orderController.getAll);
// purchase_order.post("/buyproduct/:id");
export default purchase_order;
