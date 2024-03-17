import express from 'express'
import { createOrder, deleteOrder, getAllOrders, updateOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/create',createOrder);
router.get('/getorders',getAllOrders);
router.delete('/deleteorder/:orderId/:userId',deleteOrder);
router.put('/updateorder/:orderId/:userId',updateOrder);

export default router;