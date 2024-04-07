import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { add } from '../controllers/Staff.controller.js';
import { getstaff } from '../controllers/Staff.controller.js';
import { Delete } from '../controllers/Staff.controller.js';
import { Getmember } from '../controllers/Staff.controller.js';

const router = express.Router();

router.post('/add',add);
router.get('/get',getstaff);
router.delete('/delete/:id',Delete);
router.get('/getmember/:id',)
router.put('/updatemember/:id',)



export default router;