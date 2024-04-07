import express from 'express';
const router = express.Router();

router.get('/status', (req, res) => {
  // Parse the POST parameters sent by PayHere
  const { merchant_id, order_id, payment_id, payhere_amount, payhere_currency, status_code, md5sig, custom_1, custom_2, method, status_message, card_holder_name, card_no, card_expiry } = req.body;

  // need to add necessary validations on the received data

  // need to  the md5 signature to ensure the authenticity of the request
  // need to implement the same md5 hashing logic used during payment initiation

  // need to update  database based on the payment status

  // Respond with a HTTP status 200 to acknowledge receipt of the notification
  res.status(200).send('Notification received successfully.');
});

export default router;
