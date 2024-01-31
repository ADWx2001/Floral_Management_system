import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async(req,res,next)=>{
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
      }
      if (!req.body.title || !req.body.description || !req.body.price || !req.body.quantity || !req.body.supplier || !req.body.deliveryTime ) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }
      const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
      const newProduct = new Product({
        ...req.body,
        slug,
        userId: req.user.id,
      });

      try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      } catch (error) {
        next(error);
      }

}