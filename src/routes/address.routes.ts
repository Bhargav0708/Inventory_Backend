import { Router } from "express";
import { verifyToken } from "../middlewares/verifytoken";
import { AddressController } from "../controllers/adress.controller";

const address = Router();

address.post("/create", AddressController.create);
address.get("/alladdress", AddressController.getAll);
address.put("/updateaddress/:id", AddressController.update);
address.delete("/deleteaddress/:id", AddressController.delete);

export default address;
