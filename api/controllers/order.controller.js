import Order from "../models/order.model.js";
import SellerRequest from "../models/seller-request.model.js";
import { mongoose } from "mongoose";
import { errorHandler } from "../utils/error.js";

//test order
export const testOrder = (req, res) => {
    res.json({ msg: "Order works" });
}

//create new order
export const createOrder = async (req, res,next)=>{
    if (!req.body.userId || !req.body.productsId || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone || !req.body.address ||!req.body.state || !req.body.zip  || !req.body.subtotal || !req.body.deliveryfee || !req.body.totalcost ) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }

      const userId = req.body.userId;
      const productsId = req.body.productsId;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const phone = req.body.phone;
      const address = req.body.address;
      const state = req.body.state;
      const zip = req.body.zip;
      const subtotal = req.body.subtotal;
      const deliveryfee = req.body.deliveryfee;
      const totalcost = req.body.totalcost;

      function idGen(phone) {
        const randomString = Math.random().toString(36).substring(2, 10); 
        const id = "ORD" + randomString + phone; 
        return id;
      }

      const orderId = idGen(phone);

      const newOrder = new Order({
        orderId,userId,productsId,first_name,last_name,email,phone,
        address,state,zip,subtotal,deliveryfee,totalcost
      })

      try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
      } catch (error) {
        next(error);
      }
}



//get all orders
export const  getAllOrders = async(req,res,next)=>{
    Order.find().then((orders)=>{
        res.json(orders);
    }).catch((error)=>{
        console.log(error);
    })
}


export const getOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json(order);    

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


//update order
export const updateOrder = async(req, res, next)=>{
    let orderId = req.params.id;
    if ( !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.address || !req.body.zip ) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }
    const {first_name, last_name, email, address, zip} = req.body;
    
    const updateOrder = {
        first_name,
        last_name,
        email,
        address,
        zip
    }

    try {
        await Order.findByIdAndUpdate(orderId, updateOrder);
        res.status(200).json(updateOrder);
    } catch (error) {
        next(error);
    }
}

//delete order
export const deleteOrder = async(req, res ,next)=>{
    let  orderId = req.params.id;
    try {
        await Order.findByIdAndDelete(orderId);
        res.status(200).json('The Order has been deleted');
      } catch (error) {
        next(error);
      }
}

//item request placement with seller functions

//create record
export const placeRequestRecord = async(req, res, next)=>{
    if (!req.body.title || !req.body.category || !req.body.description || !req.body.quantity || !req.body.email ||!req.body.supplier ) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }

      const title = req.body.title;
      const category = req.body.category;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const email = req.body.email;
      const supplier = req.body.supplier;

      const newRequest = new SellerRequest({
        title,category,description,quantity,email,supplier
      })

      try {
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
      } catch (error) {
        next(error);
      }

      
    }

      

//fetch only one record from database
export const getOneRequestRecord = async(req, res, next)=>{

    try {
        const requestId = req.params.id;
        const result = await SellerRequest.findById(requestId);
        
        if (!result) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json(result);    

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//get all the request records
export const getRequestRecords = async(req,res,next)=>{
    SellerRequest.find().then((requests)=>{
        res.json(requests);
    }).catch((error)=>{
        console.log(error);
    })
}

//update the request record
export const updateRequestRecord = async(req, res, next)=>{
    let requestId = req.params.id;
    const {title,category,description,quantity,email,seller} = req.body;
    
    const updateRequest = {
        title,category,description,quantity,email,seller
    }

    try {
        await SellerRequest.findByIdAndUpdate(requestId, updateRequest);
        res.status(200).json(updateRequest);
    } catch (error) {
        next(error);
    }
}

//delete the request record
export const deleteRequestRecord = async(req, res, next)=>{
    let  requestId = req.params.id;
    try {
        await SellerRequest.findByIdAndDelete(requestId);
        res.status(200).json('The record has been deleted');
      } catch (error) {
        next(error);
      }
}


export const getOrdersByCustomerId = async (req, res, next) => {
    try {
      const customerId = req.params.id;
      const orders = await Order.find({ userId: customerId });
      
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };