import express from "express";
import { addreview,getProductReview } from "../controllers/reviews.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/add', verifyToken, addreview);
router.get('/getProductReview/:productId', getProductReview);
export default router;