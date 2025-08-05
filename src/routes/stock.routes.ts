import { Router } from "express";
import { verifyToken } from "../middlewares/verifytoken";
import { stockController } from "../controllers/stock.controller";
import { upload } from "../../utils/cloudinary";

const stock = Router();
stock.post(
  "/create",
  upload.none(),
  verifyToken(["admin", "supplier"]),
  stockController.create
);
stock.get(
  "/allstocks",
  verifyToken(["admin", "supplier"]),
  stockController.getAll
);
stock.put(
  "/stock/:id",
  verifyToken(["admin", "supplier"]),
  stockController.update
);
stock.delete(
  "/stockdelete/:id",
  verifyToken(["admin", "supplier"]),
  stockController.delete
);

export default stock;
