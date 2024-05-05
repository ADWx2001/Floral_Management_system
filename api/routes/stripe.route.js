import express from 'express';
import { createSession, handleWebhook} from '../controllers/stripe.controller.js';

const router = express.Router();

router.post('/create-checkout-session',createSession);
router.post('/webhook',handleWebhook)

export default router;