import express  from "express";

import { deleteUser, forgetpassword, getUser, getUsers,  resetpassword,  signout, test, updateResetPassword, updateUser } from "../controllers/user.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test',test);
router.put("/update/:id" , verifyToken , updateUser);
router.delete("/delete/:id" , verifyToken , deleteUser);
router.get('/signout',signout);

router.get('/getusers', verifyToken, getUsers);
router.post('/forgetpassword',forgetpassword);
router.get('/resetpassword/:id/:token',resetpassword);
router.post('/updateResetPassword/:id/:token',updateResetPassword);
router.get('/:userId', getUser);


export default router;