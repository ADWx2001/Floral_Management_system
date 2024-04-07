import express from "express";
import { addreview,getProductReview,UpdateReview ,deleteReview, getReviews,adminReply} from "../controllers/reviews.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/add', verifyToken, addreview);
router.get('/getProductReview/:productId', getProductReview);
router.put('/UpdateReview/:reviewId/:userId', verifyToken,UpdateReview);
router.delete('/deleteReview/:reviewId', verifyToken,deleteReview);
router.get('/getReviews',verifyToken, getReviews);
router.get('/adminReply',verifyToken, adminReply);
export default router;