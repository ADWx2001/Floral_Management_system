import Contact from "../models/contact.model.js";
import { errorHandler } from "../utils/error.js";

//create record
export const createRecord = async (req, res,next)=>{
    if (!req.body.email || !req.body.name || !req.body.message ) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }

      const email = req.body.email;
      const name = req.body.name;
      const message = req.body.message;


      const newRequest = new Contact({
        email,name,message
      })

      try {
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
      } catch (error) {
        next(error);
      }
}

//delete record
export const deleteRecord = async(req, res ,next)=>{
    let  recordId = req.params.id;
    try {
        await Contact.findByIdAndDelete(recordId);
        res.status(200).json('The Record has been deleted');
      } catch (error) {
        next(error);
      }
}

//get all records
export const  getAllRecords = async(req,res,next)=>{
    Contact.find().then((records)=>{
        res.json(records);
    }).catch((error)=>{
        console.log(error);
    })
}