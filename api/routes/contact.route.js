import express from 'express';
import { createRecord, getAllRecords, deleteRecord } from '../controllers/contact.controller.js';
const router = express.Router();


//Delivery records handeling routes
router.post('/create-contact-record',createRecord);
router.get('/getallrecords',getAllRecords);
router.delete('/deletedrecord/:id',deleteRecord);


export default router;