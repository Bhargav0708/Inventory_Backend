import { Router } from "express";
import router from "./auth.routes";
import { verifyToken } from "../middlewares/verifytoken";
import { productController } from "../controllers/product.controller";
import { upload } from "../../utils/cloudinary";
import { checkPermission } from "../middlewares/verifyPermission";

const product = Router();

// product.post(
//   "/create",
//   verifyToken(["supplier", ]),
//   productController.create
// );

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - barcode
 *               - price
 *               - supplierid
 *               - categoryid
 *               - product_image
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               barcode:
 *                 type: string
 *                 example: "123456789012"
 *               description:
 *                 type: string
 *                 example: The latest iPhone with enhanced performance
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 999.99
 *               supplierid:
 *                 type: integer
 *                 example: 1
 *               categoryid:
 *                 type: integer
 *                 example: 3
 *               product_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Created product data
 *                 msg:
 *                   type: string
 *                   example: Product has been created
 *       400:
 *         description: Bad request due to invalid/missing data
 *       401:
 *         description: Unauthorized – Token missing or invalid
 *       403:
 *         description: Forbidden – Insufficient permissions
 *       500:
 *         description: Internal server error
 */

product.post(
  "/create",
  verifyToken(["supplier", "admin"]),
  checkPermission("create-product"),
  // upload.single("product_image"),
  upload.none(),
  productController.create
);
product.get(
  "/allproducts",
  verifyToken(["supplier", "admin", "customer"]),
  productController.getAll
);
product.put(
  "/updateproduct/:id",
  verifyToken(["supplier", "admin"]),
  upload.single("product_image"),
  productController.update
);
product.delete(
  "/deleteproduct/:id",
  verifyToken(["supplier", "admin"]),
  upload.none(),
  // upload.single("product_image"),
  productController.delete
);
product.get(
  "/allproductsByid/:id",
  verifyToken(["supplier", "admin"]),
  productController.FetchAllProductByid
);
product.get(
  "/supplierInfo/:id",
  verifyToken(["supplier", "admin"]),
  productController.FetchSupplierAllInfo
);
product.get(
  "/productsearch",
  verifyToken(["supplier", "admin", "customer"]),
  productController.searchData
);
export default product;
