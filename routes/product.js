import express from "express";
import multer from "multer";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/products", upload.array("productImages", 5), createProduct);
router.get("/products", getProducts);
router.get("/products/:productId", getSingleProduct);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

export default router;
