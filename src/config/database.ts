import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/user.model";
import { OTP } from "../models/otp.model";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import { Warehouse } from "../models/warehouse.model";
import { Warehouseaddresses } from "../models/warehouseaddress.model";
import { Addresses } from "../models/address.model";
import { Stocks } from "../models/stock.model";
import { Payments } from "../models/payment.model";
import { Stockalerts } from "../models/stockalert.model";
import { Stocktransactions } from "../models/stocktransaction.model";
import { Purchaseorders } from "../models/purchase_order.model";
import { Salesorders } from "../models/sales_order.model";
import { Roles } from "../models/role.model";
import { Permission } from "../models/permission.model";
import { userRole } from "../models/userRole.model";
import { RolePermisson } from "../models/rolepermission.model";
import { Cart } from "../models/cart.model";
// import { Warehouseaddresses } from "../models/address.model";

// import { models, User } from "../models";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [
    User,
    OTP,
    Product,
    Category,
    Warehouse,
    Warehouseaddresses,
    Addresses,
    Stocks,
    Payments,
    Stockalerts,
    Stocktransactions,
    Purchaseorders,
    Salesorders,
    Roles,
    Permission,
    userRole,
    RolePermisson,
    Cart,
  ],
  logging: false,
});
