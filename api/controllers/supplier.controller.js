import Supplier from "../models/supplier.model.js";
import { errorHandler } from "../utils/error.js";
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import Restocks from "../models/Restockrecords.model.js";

export const add = async (req, res, next) => {
  const { SupplierName, CompanyName, PhoneNumber, EmailAddress, Address, Paymentmethod, category, CommunicationMethod, image } = req.body;

  const newSupplier = new Supplier({
    suppliername: SupplierName,
    comapnyname: CompanyName,
    phonenumber: Number(PhoneNumber),
    email: EmailAddress,
    address: Address,
    category: category,
    paymenttype: Paymentmethod,
    communicationmethod: CommunicationMethod,
    profilePicture: image,
  });

  try {
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    next(error);
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
    res.json(count);
  } catch (error) {
    next(error);
  }
}

export const Sendmail = async (req, res, next) => {
  const { email, subject, massege } = req.body;
  console.log(email, subject, massege);
  
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
        name: "Mailgen",
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
              price: "$10.99",
            }
          ]
        },
        outro: "Looking forward to do more business"
      }
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: 'pesaraicc@gmail.com',
      to: email,
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

export const updatesupplier = async (req, res, next) => {
  const { SupplierName, CompanyName, PhoneNumber, EmailAddress, Address, Paymentmethod, category, CommunicationMethod, image, Damageditem } = req.body;
  
  try {
    const updatesupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          suppliername: SupplierName,
          comapnyname: CompanyName,
          phonenumber: Number(PhoneNumber),
          email: EmailAddress,
          address: Address,
          paymenttype: Paymentmethod,
          category: category,
          communicationmethod: CommunicationMethod,
          profilePicture: image,
          damageditemcount: Damageditem,
        },
      },
      { new: true }
    );
    res.status(200).json(updatesupplier);
  } catch (error) {
    next(error);
  }
};