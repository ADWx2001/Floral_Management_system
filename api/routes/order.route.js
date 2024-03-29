import express from 'express'
import { createOrder, deleteOrder, getAllOrders, updateOrder, getOrder, testOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/create',createOrder);
router.get('/test', testOrder)
router.get('/getorders',getAllOrders);
router.get('/getorder/:id', getOrder);
router.delete('/deleteorder/:id',deleteOrder);
router.put('/updateorder/:id',updateOrder);

export default router;