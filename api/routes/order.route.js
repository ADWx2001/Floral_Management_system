import express from 'express'
import { createOrder, deleteOrder, getAllOrders, updateOrder, getOrder, testOrder, placeRequestRecord,getOneRequestRecord,getRequestRecords, updateRequestRecord, deleteRequestRecord, getOrdersByCustomerId } from '../controllers/order.controller.js';

const router = express.Router();

//custommer order handeling routes
router.post('/create',createOrder);
router.get('/test', testOrder)
router.get('/getorders',getAllOrders);
router.get('/getorder/:id', getOrder);
router.delete('/deleteorder/:id',deleteOrder);
router.put('/updateorder/:id',updateOrder);

//seller item request handling route
router.post("/place-request", placeRequestRecord);
router.get("/get-request/:id", getOneRequestRecord)
router.get("/get-item-requests" ,getRequestRecords);
router.put("/updaterequest/:id", updateRequestRecord)
router.delete("/delete/seller-item-request/:id", deleteRequestRecord);
router.get("/customer/:id", getOrdersByCustomerId);



export default router;