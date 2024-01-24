import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req,res,next)=>{

    const{username,email,password} = req.body;

    if(!username || !email || !password || username === "" || email === "" || password === ""){
        return res.status(400).json({message:"All fields are required"});
    }

   
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUSer = new User({username,email,password:hashedPassword});
    try{
        await newUSer.save();
        res.status(201).json({message:"User created successfuly"});

    } catch(err){
      next(err);
    }
   
};