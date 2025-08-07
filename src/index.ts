import express from "express";

import { sequelize } from "./config/database";
import router from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import supplier from "./routes/suppiler.routes";
import product from "./routes/product.routes";
import warehouse from "./routes/warehouse.routes";
import warehouseaddress from "./routes/warehouseaddress.routes";
import address from "./routes/address.routes";
import stock from "./routes/stock.routes";
import payments from "./routes/payment.routes";
import purchase_order from "./routes/purchase_order.routes";
import sales_order from "./routes/sales_orders.routes";
import pdfroute from "./routes/pdf.routes";
import { sendSalesrecord } from "../utils/cron";
import { swaggerSpec, swaggerUi } from "./swagger";
import cors from "cors";
import cart from "./routes/cart.routes";
import { callbackPromise } from "nodemailer/lib/shared";

const app = express();

// const allowedOrigins = [process.env.FRONTEND_URL, " http://localhost:5173"];
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    // origin: "http://localhost:5173",
    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log("the origin is", origin);
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Origin not allowed by cors"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(cookieParser());
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", router);
app.use("/supplier", supplier);
app.use("/product", product);
app.use("/warehouse", warehouse);
app.use("/warehouseadd", warehouseaddress);
app.use("/address", address);
app.use("/stocks", stock);
app.use("/payments", payments);
app.use("/purchaseorder", purchase_order);
app.use("/salesorder", sales_order);
app.use("/pdfroute", pdfroute);
app.use("/cart", cart);

sendSalesrecord();

const PORT = process.env.PORT || 3000;
console.log("port is:", PORT);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start app:", err);
  }
};

start();
