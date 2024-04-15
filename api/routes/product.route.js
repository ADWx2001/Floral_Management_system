import express from "express";
import { productsInfo } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/products',productsInfo);

export default router;