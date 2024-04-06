
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { Create } from '../controllers/events.controller.js';
import {getevents} from '../controllers/events.controller.js'
import { Getevents } from '../controllers/events.controller.js';
import { updateevent } from '../controllers/events.controller.js';
import { Delete } from '../controllers/events.controller.js';

const router = express.Router();

router.post('/create',Create);
router.get('/get',getevents);
router.get('/getevent/:id',Getevents)
router.put('/updateevent/:id',updateevent)
router.delete('/delete/:id',Delete);



export default router;
