import { Router } from "express";
import router from "./auth.routes";
import { verifyToken } from "../middlewares/verifytoken";
import { warehouseAddressController } from "../controllers/warehouseaddress.controller";

const warehouseaddress = Router();
warehouseaddress.post(
  "/create",
  verifyToken(["admin"]),
  warehouseAddressController.create
);
warehouseaddress.get(
  "/allwarehouseaddress",
  verifyToken(["admin"]),
  warehouseAddressController.getAll
);
warehouseaddress.put(
  "/warehouse/:id",
  verifyToken(["admin"]),
  warehouseAddressController.update
);
warehouseaddress.delete(
  "/deletewarehouse/:id",
  verifyToken(["admin"]),
  warehouseAddressController.delete
);
export default warehouseaddress;

//product id : 1
//warehouse id : 1
