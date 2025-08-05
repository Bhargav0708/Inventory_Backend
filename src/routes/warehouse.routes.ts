import { Router } from "express";
import router from "./auth.routes";
import { verifyToken } from "../middlewares/verifytoken";
import { categoryController } from "../controllers/category.controller";
import { warehouseController } from "../controllers/warehouse.controller";
const warehouse = Router();

warehouse.post("/create", verifyToken(["admin"]), warehouseController.create);
warehouse.get(
  "/allwarehouses",
  verifyToken(["admin"]),
  warehouseController.getAll
);
warehouse.put(
  "/warehouse/:id",
  verifyToken(["admin"]),
  warehouseController.update
);
warehouse.delete(
  "/deletewarehouse/:id",
  verifyToken(["admin"]),
  warehouseController.delete
);
export default warehouse;
