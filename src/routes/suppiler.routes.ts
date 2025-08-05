import { Router } from "express";
import router from "./auth.routes";
import { verifyToken } from "../middlewares/verifytoken";
import { categoryController } from "../controllers/category.controller";
const supplier = Router();

supplier.post("/create", verifyToken(["supplier"]), categoryController.create);
supplier.get(
  "/allcateogires",
  verifyToken(["supplier", "customer"]),
  categoryController.getAll
);
supplier.post(
  "/updatedcateogry/:id",
  verifyToken(["supplier"]),
  categoryController.update
);
supplier.delete(
  "/deletecateogries/:id",
  verifyToken(["supplier"]),
  categoryController.delete
);

export default supplier;
