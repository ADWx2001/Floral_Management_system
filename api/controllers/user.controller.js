import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: 'API is working'
  });
};

export const updateUser = async (req,res,next) => {
    if(req.user.id !== req.params.id) {
        return next (errorHandler(401,'You can update only your Account'))
    }

    try {
       if(req.body.password){
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
          }
          req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        if (req.body.username) {
            if (req.body.username.length < 7 || req.body.username.length > 20) {
              return next(
                errorHandler(400, 'Username must be between 7 and 20 characters')
              );
            }
            if (req.body.username.includes(' ')) {
              return next(errorHandler(400, 'Username cannot contain spaces'));
            }
           
            if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
              return next(
                errorHandler(400, 'Username can only contain letters and numbers')
              );
            }
          }
       

       const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set : {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture
            }
        },
        {new:true}
       );
       const {password , ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }

}
export const deleteUser = async(req,res,next)=>{
  if (req.user.id !== req.params.id) {
      return next(errorHandler(401,'You can delete only your Account'));
  }

  try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been Deleted...")
  } catch (error) {
      next(error)
  }
}
export const signout = (req,res)=>{
  res.clearCookie(`acess_token`).status(200).json("Signout Success");
}