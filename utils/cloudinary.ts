import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

const Product_image = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "Inventory_management",
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});
const Profile_image = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "Inventory_management",
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});

const upload: multer.Multer = multer({ storage: Product_image });
const uploadProfile_image: multer.Multer = multer({ storage: Profile_image });
// const uploadDocument: multer.Multer = multer({ storage: statusStorage });
export { upload, uploadProfile_image };
