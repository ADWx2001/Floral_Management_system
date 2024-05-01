import express from "express";
import { addreview,getProductReview,UpdateReview ,deleteReview, getReviews,adminReply,getModarateRating} from "../controllers/reviews.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/add', verifyToken, addreview);
router.get('/getProductReview/:productId', getProductReview);
router.put('/UpdateReview/:reviewId/:userId', verifyToken,UpdateReview);
router.delete('/deleteReview/:reviewId', verifyToken,deleteReview);
router.get('/getReviews',verifyToken, getReviews);
router.put('/adminReply/:reviewId',verifyToken, adminReply);
router.get('/getModarateRating/:productId', getModarateRating);
export default router;