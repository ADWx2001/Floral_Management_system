import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { add } from '../controllers/supplier.controller.js';
import {get}  from '../controllers/supplier.controller.js'
import { Delete } from '../controllers/supplier.controller.js';
import { Getuser } from '../controllers/supplier.controller.js';

import {updatesupplier} from '../controllers/supplier.controller.js';
import { getCount } from '../controllers/supplier.controller.js';
import { Sendmail } from '../controllers/supplier.controller.js';
import { addstocksrec } from '../controllers/supplier.controller.js';
import { getstocksrec } from '../controllers/supplier.controller.js';
import { deleteSrec } from '../controllers/supplier.controller.js';
import { Getprintdetails } from '../controllers/supplier.controller.js';






const router = express.Router();

router.post('/add',add);

router.post('/addstockrecords',addstocksrec);
router.get('/getstockrecords',getstocksrec);
router.delete('/deletestockrecords/:id',deleteSrec);
router.get('/getprintstck/:id',Getprintdetails);
router.post('/sendmail',Sendmail);
router.get('/get',get);
router.delete('/delete/:id',Delete);
router.get('/getsupplier/:id',Getuser);
router.put('/updatesupplier/:id',updatesupplier);
router.get('/getcount',getCount);


router.get('/get',get);
router.delete('/delete/:id',Delete);
router.get('/getsupplier/:id',Getuser)
router.put('/updatesupplier/:id',updatesupplier)




export default router;