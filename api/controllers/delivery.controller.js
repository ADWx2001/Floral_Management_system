import { mongoose } from "mongoose";
import Delivery from "../models/delivery.model.js";
import { errorHandler } from "../utils/error.js";

//create new deliery record
export const createDeliverRecord = async (req, res,next)=>{
    if (!req.body.userId || !req.body.orderId || !req.body.items|| !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone || !req.body.address || !req.body.zip || !req.body.trackingnumber|| !req.body.status || !req.body. deliveryservice || !req.body.deliverycontactno ) {
        console.log(req.body);
        return next(errorHandler(400, 'Please provide all required fields'));
      }

      const userId = req.body.userId;
      const orderId = req.body.orderId;
      const items = req.body.items;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const phone = req.body.phone;
      const address = req.body.address;
     
      const zip = req.body.zip;
      const trackingnumber = req.body.trackingnumber;
      const status = req.body.status;
      const deliveryservice = req.body.deliveryservice;
      const deliverycontactno = req.body.deliverycontactno;

      const newDelivery = new Delivery({
        orderId,userId,items,first_name,last_name,email,phone,
        address,zip,trackingnumber,status,deliveryservice,deliverycontactno
      })

      try {
        const savedDelivery = await newDelivery.save();
        res.status(201).json(savedDelivery);
      } catch (error) {
        next(error);
      }
}

//get all delivery records
export const  getAllDeliveries = async(req,res,next)=>{
    Delivery.find().then((delivery)=>{
        res.json(delivery);
    }).catch((error)=>{
        console.log(error);
    })
}

//get a one delivery record
export const getADeliveryrecord = async (req, res, next) => {
    try {
        const deliveryId = req.params.id;
        const deliveryrecord = await Delivery.findById(deliveryId);
        
        if (!deliveryrecord) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json(deliveryrecord);    

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//update delivery record

export const updateDeliveryRecord = async(req, res, next)=>{
    let recordId = req.params.id;
    const {trackingnumber,status,deliveryservice,delivercontactno} = req.body;
    
    const updateDelivery = {
        trackingnumber,status,deliveryservice,delivercontactno
    }

    try {
        await Delivery.findByIdAndUpdate(recordId, updateDelivery);
        res.status(200).json(updateDelivery);
    } catch (error) {
        next(error);
    }
}

//delete  a delivery record
export const deleteRecord = async(req, res ,next)=>{
    let  deliveryId = req.params.id;
    try {
        await Delivery.findByIdAndDelete(deliveryId);
        res.status(200).json('The record has been deleted');
      } catch (error) {
        next(error);
      }
}
