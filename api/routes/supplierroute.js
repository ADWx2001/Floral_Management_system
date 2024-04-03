import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { add } from '../controllers/supplier.controller.js';
import {get}  from '../controllers/supplier.controller.js'
import { Delete } from '../controllers/supplier.controller.js';
import { Getuser } from '../controllers/supplier.controller.js';
import {updatesupplier} from '../controllers/supplier.controller.js'

const router = express.Router();

router.post('/add',add);
router.get('/get',get);
router.delete('/delete/:id',Delete);
router.get('/getsupplier/:id',Getuser)
router.put('/updatesupplier/:id',updatesupplier)



export default router;