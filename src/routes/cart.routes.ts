import { Router } from "express";
import { cartController } from "../controllers/cart.controller";

const cart = Router();

cart.post("/makingcart", cartController.create);
cart.get("/getcart/:id", cartController.cartByuserid);
cart.put("/removalOfCartByProductId/:id", cartController.RemoveByProductId);
cart.put("/cartupdatequantity/:id", cartController.cartItemRemovebyquantity);
cart.delete("/removalOfByUserId/:id", cartController.RemoveCartByUserId);
cart.put("/addproduct", cartController.AddProductQuantity);
export default cart;
