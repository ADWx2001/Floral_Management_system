import express from "express";
import { addreview } from "../controllers/reviews.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/add', verifyToken, addreview);

export default router;