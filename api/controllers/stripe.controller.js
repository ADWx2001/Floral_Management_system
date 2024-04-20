import Stripe from 'stripe';
import dotenv from "dotenv";
import { createOrder } from './order.controller.js';

dotenv.config();

const stripe = Stripe(process.env.CHECKOUT_API_KEY_SECRET);

export const createSession = async (req, res) => {

  const cartItems = req.body.cartItems;

  const metadata = {
    userId: req.body.userId,
    items: cartItems.map(item => ({
      _id: item._id,
      title: item.title,
      cartTotalQuantity: item.cartTotalQuantity
    }))
  };

  // Convert metadata to a JSON string
  const metadataString = JSON.stringify(metadata);

  // Truncate metadata if it exceeds 500 characters
  //const truncatedMetadata = metadataString.length > 500 ? metadataString.substring(0, 500) : metadataString;
  
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cartItems: metadataString,
    }
  });


  const line_items = req.body.cartItems.map((item)=>{
    return{
      price_data: {
        currency: "lkr", // Changed currency to USD
        product_data: {
          name: item.title,
          images:[item.image],
          description:item.description,
          metadata:{
            id:item.id,
          },
        },
        // Adjust unit amount to cents (multiply by 100)
        unit_amount: item.price * 100, 
      },
      quantity:item.cartTotalQuantity,
    }
  }) 

  // Calculate the total amount
  const totalAmount = line_items.reduce((acc, item) => acc + (item.price_data.unit_amount * item.quantity), 0);

  // Check if the total amount is less than 50 cents in USD
  if (totalAmount < 50) {
    return res.status(400).send({ error: "Total amount must be at least 50 cents in USD." });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    shipping_address_collection:{
      allowed_countries:['LK'],
    },
    shipping_options:[
      {
        shipping_rate_data:{
          type:'fixed_amount',
          fixed_amount:{
            amount:0,
            currency:'lkr',
          },
          display_name:'Free Shipping',
          delivery_estimate:{
            minimum:{
              unit:'business_day',
              value: 1,
            },
            maximum:{
              unit:'business_day',
              value: 2,
            },
          }
        }
      },
      {
        shipping_rate_data:{
          type:'fixed_amount',
          fixed_amount:{
            amount:50000, // Adjusted amount to 500 cents (5 USD)
            currency:'lkr',
          },
          display_name:'One Day Delivery',
          delivery_estimate:{
            minimum:{
              unit:'business_day',
              value:1,
            },
            maximum:{
              unit:'business_day',
              value:1,
            },
          },
        },
      },
    ],
    phone_number_collection:{
      enabled:true,
    },
    customer:customer.id,
    line_items,
    mode: 'payment',
    success_url: `http://localhost:5173/order-pay-success`,
    cancel_url: `http://localhost:5173/cart`,
  });

  res.send({ url: session.url });
};


// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

//endpointSecret= "whsec_6c0972535b2f51c8b125039f0b17dae0f7db86e3d846040e34c5aba634d67879";

// router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });

export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  if(endpointSecret){

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified!!");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  }else{
    data = req.body.data.object;
    eventType = req.body.type;
  }


  // Handle the event
  if(eventType === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then((customer)=>{
      // console.log(customer);
      console.log("data",data);

      // Extract required data for creating order
      const {
        userId,
        productsId,
        first_name,
        last_name,
        email,
        phone,
        shipping_details: { address, state, zip },
        subtotal,
        shipping_cost: { amount_total: deliveryfee },
        total_details: { amount_total: totalcost }
      } = data;

      // Call createOrder with extracted data
      createOrder({
        userId,
        productsId,
        first_name,
        last_name,
        email,
        phone,
        address: address.line1,
        state: address.state,
        zip: address.postal_code,
        subtotal,
        deliveryfee,
        totalcost
      });

    console.log("Order created successfully!");

      // createOrder(data);

    }).catch((err)=>{
      console.log(err);
    })
  }
  

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};
