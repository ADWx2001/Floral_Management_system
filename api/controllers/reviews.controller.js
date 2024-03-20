import Review from "../models/review.model.js";
import { errorHandler } from "../utils/error.js";

export const addreview = async (req, res, next) => {
    try {
        const { content, productId, userId, reviewimage } = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to add reviews'));
        }

        const newReview = new Review({
            content,
            productId,
            userId,
            reviewimage 
        });

        await newReview.save();

        res.status(200).json(newReview);
    } catch (error) {
        next(error);
    }
};

export const getProductReview =async(req,res,next) => {
    try{
        const reviews = await Review.find({productId: req.params.productId}).sort({
            createdAt: -1,
        });
        res.status(200).json(reviews);
    }catch(error){
    next(error)
    }
}
