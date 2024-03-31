import express from "express";
import { addreview,getProductReview,UpdateReview ,deleteReview, getReviews} from "../controllers/reviews.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/add', verifyToken, addreview);
router.get('/getProductReview/:productId', getProductReview);
router.put('/UpdateReview/:reviewId', verifyToken,UpdateReview);
router.delete('/deleteReview/:reviewId', verifyToken,deleteReview);
router.get('/getReviews',verifyToken, getReviews);
export default router;