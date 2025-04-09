import express from "express";

import { createProduct, deleteProducts, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

// console.log(process.env.MONGO_URI);

router.delete("/:id", deleteProducts);

router.put("/:id", updateProduct);

export default router;