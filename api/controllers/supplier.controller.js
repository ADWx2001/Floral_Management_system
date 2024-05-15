import Supplier from "../models/supplier.model.js";
import { errorHandler } from "../utils/error.js";
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import Restocks from "../models/Restockrecords.model.js";

export const add = async (req, res, next) => {
  const { SupplierName, CompanyName, PhoneNumber, EmailAddress, Address, Paymentmethod, category, CommunicationMethod, image,accnum,bankname } = req.body;


 
  const mobileRegex = /^(071|076|077|075|078|070|074|072)\d{7}$/;
 

 if (!mobileRegex.test(PhoneNumber)) {
      return next(errorHandler(400, 'Invalid mobile number format'));
  } else {

const newSupplier = new Supplier({
    suppliername: SupplierName,
    comapnyname: CompanyName,
    phonenumber:PhoneNumber,
    email: EmailAddress,
    address: Address,
    category: category,
    paymenttype: Paymentmethod,
    communicationmethod: CommunicationMethod,
    profilePicture: image,
    bankaccnumber:accnum,
    Bankname:bankname,
  });

  try {
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    next(error);
  }

}
}

export const addstocksrec = async (req, res, next) => {
  const { SupplierName, itemname, cost, dstatus, qan, date } = req.body;


  const newRecord = new Restocks({
    supplier: SupplierName,
    itemname: itemname,
    cost: Number(cost),
    Deliverystatus: dstatus,
    quantity: Number(qan),
    Date: date,
  });

  try {
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    next(error);
  }

}

export const getstocksrec = async (req, res, next) => {
  try {
    const restocks = await Restocks.find();
    res.json(restocks);
  } catch (error) {
    next(error);
  }
}

export const deleteSrec = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Restocks.findByIdAndDelete(id);
    res.status(200).send({ status: "record deleted" });
  } catch (error) {
    next(error);
  }
}

export const get = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
}

export const getCount = async (req, res, next) => {
  try {
    const count = await Supplier.countDocuments();
    const ordercount= await Restocks.countDocuments();
    const st="Late Delivery"
    const latedeiverycount= await Restocks.countDocuments( { Deliverystatus: st });

    const totalSum = await Restocks.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$cost' } // Replace 'numericAttribute' with the actual attribute name
        }}, 
        {
          $project: {
            _id: 0,
            total: 1
          }
      }
    ]);
   
    const counts = {
      supplierCount: count,
      orderCount: ordercount,
      dCount:latedeiverycount,
      Totalcost:totalSum.length > 0 ? totalSum[0].total : 0,
    };

    res.json(counts);
  } catch (error) {
    next(error);
  }
}

export const Sendmail = async (req, res, next) => {
  const { email, subject, massege } = req.body;
  //console.log(email, subject, massege);
  
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pesaraicc@gmail.com',
        pass: 'mqkd dlyw slto mwsc'
      }
    });

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "SonduruMal pvt ltd",
        link: 'https://mailgen.js/'
      }
    });

    let response = {
      body: {
        name: "flora",
        intro: massege,
        table: {
          data: [
            {
              item: "Nodemailer Stack Book",
              description: "A Backend application",
              price: "000",
            }
          ]
        },
        outro: "Looking forward to do more business"
      }
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: 'pesaraicc@gmail.com',
      to:email,
      subject: subject,
      html: mail
    };

    await transporter.sendMail(message);
    return res.status(201).json({ msg: "you should receive an email" });
  } catch (error) {
    next(error);
  }
}

export const Delete = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await Supplier.findByIdAndDelete(userId);
    res.status(200).send({ status: "User deleted" });
  } catch (error) {
    next(error);
  }
}

export const Getuser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const supplier = await Supplier.findOne({ _id: userId });
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(401);
      console.log("error");
    }
  } catch (error) {
    next(error);
  }
}


export const Getprintdetails= async(req,res,next)=>{
  const Id= req.params.id;

  Restocks.findOne({_id:Id}).then((Restocks)=>{

    if (Restocks){
        res.json(Restocks)
       } else {
        res.status(401);
        console.log("error")
        
      }

})

}











export const updatesupplier = async (req, res, next) => {
  const { SupplierName, CompanyName, PhoneNumber, EmailAddress, Address, Paymentmethod, category, CommunicationMethod, image, Damageditem,accnum,bankname } = req.body;

 
  
 
  try {
    const updatesupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          suppliername: SupplierName,
          comapnyname: CompanyName,
          phonenumber: PhoneNumber,
          email: EmailAddress,
          address: Address,
          paymenttype: Paymentmethod,
          category: category,
          communicationmethod: CommunicationMethod,
          profilePicture: image,
          damageditemcount: Damageditem,
          bankaccnumber:accnum,
          Bankname:bankname,

        },
      },
      { new: true }
    );
    res.status(200).json(updatesupplier);
  } catch (error) {
    next(error);
  }
};
