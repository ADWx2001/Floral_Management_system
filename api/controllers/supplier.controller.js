import Supplier from "../models/supplier.model.js";
import { errorHandler } from "../utils/error.js";

export const add = async(req,res,next)=>{
   
   const suppliername=req.body.SupplierName;
   const comapnyname=req.body.CompanyName;
   const phonenumber=Number(req.body.PhoneNumber);
   const email=req.body.EmailAddress;
   const address=req.body.Address;
   const paymenttype=req.body.Paymentmethod;
   const category=req.body.category;
   const communicationmethod=req.body.CommunicationMethod;
   const profilePicture=req.body.image;
      const newsupplier = new Supplier({
        suppliername,
        comapnyname,
        phonenumber,
        email,
        address,
        category,
        paymenttype,
        communicationmethod,
        profilePicture,




        
       
      });

      try {
        const savedsupplier = await newsupplier.save();
        res.status(201).json(savedsupplier);
      
      } catch (error) {
        next(error);
       
      }



}

export const get = async(req,res,next)=>{
   

    Supplier.find().then((suppliers)=>{
      res.json(suppliers)
     
      }).catch((err)=>{
      console.log(err);
  })
  
 


}

export const Delete= async(req,res,next)=>{
   let userId = req.params.id;
  
Supplier.findByIdAndDelete(userId)
.then (() => {
res.status (200).send({status: "User deleted"})
}).catch((err) => {
console.log(err);
res.status (500). send({status: "Error with deleting data", error: err.message});
})
}



export const Getuser= async(req,res,next)=>{
  const userId= req.params.id;
  console.log(userId);
  Supplier.findOne({_id:userId}).then((supplier)=>{

    if (supplier){
        res.json(supplier)
       } else {
        res.status(401);
        console.log("error")
        
      }

})

}

export const updatesupplier = async (req, res, next) => {

  try {
    const updatesupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
         suppliername:req.body.SupplierName,
         comapnyname:req.body.CompanyName,
           phonenumber:Number(req.body.PhoneNumber),
           email:req.body.EmailAddress,
          address:req.body.Address,
           paymenttype:req.body.Paymentmethod,
          category:req.body.category,
           communicationmethod:req.body.CommunicationMethod,
           profilePicture:req.body.image,

        },
      },
      { new: true }
    );
    res.status(200).json(updatesupplier);
  } catch (error) {
    next(error);
  }
};