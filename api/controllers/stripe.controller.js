import Stripe from 'stripe';
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.CHECKOUT_API_KEY_SECRET);

export const createSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "t-Shirt",
          },
          unit_amount: 1000, // Amount in the smallest currency unit (e.g., cents for USD)
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:5173/order-pay-success`,
    cancel_url: `http://localhost:5173/cart`,
  });

  res.send({ url: session.url });
};
