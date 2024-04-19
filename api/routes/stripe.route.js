import express from 'express';
import { createSession } from '../controllers/stripe.controller.js';

const router = express.Router();

router.post('/create-checkout-session',createSession);

export default router;