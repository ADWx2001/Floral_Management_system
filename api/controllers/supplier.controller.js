import Supplier from "../models/supplier.model.js";
import { errorHandler } from "../utils/error.js";
import nodemailer from 'nodemailer';
import Mailgen  from 'mailgen';
import Restocks from "../models/Restockrecords.model.js";

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


export const addstocksrec = async(req,res,next)=>{
   
  const supplier=req.body.SupplierName;
  const itemname=req.body.itemname;
  const cost=Number(req.body.cost);
  const Deliverystatus=req.body.dstatus;
  const quantity=Number(req.body.qan);
  const Date=req.body.date;



  



     const newrecord = new Restocks({
      supplier,
      itemname,
      cost,
      Deliverystatus,
      quantity,
      Date,
    
});

     try {
       const savedrecord = await newrecord.save();
       res.status(201).json(savedrecord);
     
     } catch (error) {
       next(error);
      
     }



}


export const getstocksrec = async(req,res,next)=>{
  

  Restocks.find().then((Restocks)=>{
     res.json(Restocks)
    
     }).catch((err)=>{
     console.log(err);
 })

}

export const Deletesrec= async(req,res,next)=>{
  let id = req.params.id;
 
Restocks.findByIdAndDelete(id)
.then (() => {
res.status (200).send({status: "record deleted"})
}).catch((err) => {
console.log(err);
res.status (500). send({status: "Error with deleting data", error: err.message});
})
}










export const get = async(req,res,next)=>{
  

   Supplier.find().then((suppliers)=>{
      res.json(suppliers)
     
      }).catch((err)=>{
      console.log(err);
  })
 
 


}


export const getCount = async(req,res,next)=>{
  
  const count= await Supplier.find().countDocuments();

  if(count){
    res.json(count)
}

}



export const Sendmail = (req, res) => {

  const sEmail=req.body.email;
  const subject=req.body.subject;
  const msg=req.body.massege;

  console.log(sEmail);
  console.log(subject);
  console.log(msg);

  let config = {
      service : 'gmail',
      auth : {
          user: 'pesaraicc@gmail.com',
          pass: 'mqkd dlyw slto mwsc'
      }
  }

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
      theme: "default",
      product : {
          name: "Mailgen",
          link : 'https://mailgen.js/'
      }
  })

  let response = {
      body: {
          name : "flora ",
          intro: msg,
          table : {
              data : [
                  {
                      item : "Nodemailer Stack Book",
                      description: "A Backend application",
                      price : "$10.99",
                  }
              ]
          },
          outro: "Looking forward to do more business"
      }
  }

  let mail = MailGenerator.generate(response)

  let message = {
      from : 'pesaraicc@gmail.com',
      to : sEmail,
      subject: subject,
      html: mail
  }

  transporter.sendMail(message).then(() => {
      return res.status(201).json({
          msg: "you should receive an email"
      })
  }).catch(error => {
      return res.status(500).json({ error })
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
           damageditemcount:req.body.Damageditem,

        },
      },
      { new: true }
    );
    res.status(200).json(updatesupplier);
  } catch (error) {
    next(error);
  }
};