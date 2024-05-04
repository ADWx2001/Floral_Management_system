
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { Create, getEventBySlug, getevents,Getevents,updateevent,Delete } from '../controllers/events.controller.js';
import { CreateEventRequest,UpdateEventRequest, DeleteEventRequest, GetAllEventRequest, GetOneEventRequest } from '../controllers/events.controller.js';

const router = express.Router();

router.post('/create',Create);
router.get('/get',getevents);
router.get('/getevent/:id',Getevents);
router.get('/get/:slug', getEventBySlug);
router.put('/updateevent/:id',updateevent);
router.delete('/delete/:id',Delete);

router.post('/create-request',CreateEventRequest);
router.get('/get-event-requests',GetAllEventRequest);
router.get('/get-event-request/:id',GetOneEventRequest);
router.put('/update-event-request/:id',UpdateEventRequest);
router.delete('/delete-event-request/:id',DeleteEventRequest);



export default router;
