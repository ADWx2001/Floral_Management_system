import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deleteproduct, getProducts } from '../controllers/products.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getproducts',getProducts);
router.delete('/deleteproduct/:productId/:userId', verifyToken, deleteproduct)


export default router;