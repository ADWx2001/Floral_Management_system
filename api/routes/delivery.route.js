import express from 'express';
import { createDeliverRecord, getAllDeliveries,getADeliveryrecord,updateDeliveryRecord,deleteRecord } from '../controllers/delivery.controller.js';

const router = express.Router();

//Delivery records handeling routes
router.post('/create-delivery-record',createDeliverRecord);
router.get('/getalldeliveries',getAllDeliveries);
router.get('/getdelivery/:id', getADeliveryrecord);
router.delete('/deletedelivery/:id',deleteRecord);
router.put('/updatedelivery/:id',updateDeliveryRecord);

export default router;