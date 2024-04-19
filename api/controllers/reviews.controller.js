import Review from "../models/review.model.js";
import { errorHandler } from "../utils/error.js";

export const addreview = async (req, res, next) => {
    try {
        const { content, productId, userId, reviewimage ,productname,username,rating} = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to add reviews'));
        }

        const newReview = new Review({
            content,
            productId,
            userId,
            reviewimage,
            productname,
            username, 
            rating,
            
        });

        await newReview.save();

        res.status(200).json(newReview);
    } catch (error) {
        next(error);
    }
};

export const getProductReview = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 6; 
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const reviews = await Review.find({ productId: req.params.productId })
            .sort({ createdAt: sortDirection})
            .skip(startIndex)
            .limit(limit);
       
        res.status(200).json(reviews);
        
    } catch (error) {
        next(error);
    }
};




export const UpdateReview = async(req,res,next) => {
    try{
        const review = await Review.findById(req.params.reviewId);
        if(!review){
            return next(errorHandler(404,'Review not found'));
        }

        if(review.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403,'you are not allow to edit reviews'));
        }

        const updatedReview = await Review.findByIdAndUpdate(
        req.params.reviewId,
        {$set:{
            content:req.body.content,
            rating:req.body.rating,
            reviewimage:req.body.reviewimage,
            
        }
        },
        {new:true}
        );
        res.status(200).json(updatedReview)

    }catch(error){
        next(error);
    }
};


export const deleteReview = async(req,res,next) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if(!review){
            return  next(errorHandler(404,'Review not found'));
        }
        if(review.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403,'Your are not allow to delte this review'));
        }
        await Review.findByIdAndDelete(req.params.reviewId);
        res.status(200).json('Review has been deleted');
    } catch (error) {
       next(error);
    }
}

export const getReviews = async(req,res,next) => {
    if(!req.user.isAdmin)
        return next(errorHandler(403,'Your not allow to see all th reviews'));
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const reviews = await Review.find()
            .sort({createdAt: sortDirection})
            .skip(startIndex)
            .limit(limit);
            const totalReviews = await Review.countDocuments();
            const Fivestar = await Review.countDocuments({rating:5});
            const Fourstar = await Review.countDocuments({rating:4});
            const Threestar = await Review.countDocuments({rating:3});
            const Twostar = await Review.countDocuments({rating:2});
            const Onestar = await Review.countDocuments({rating:1});
            const now = new Date();
            const oneMonthAgo = new Date(now.getFullYear(),now.getMonth() -1,now.getDate());
            const lastMonthReviews = await Review.countDocuments({createdAt: {$gte: oneMonthAgo}});
            res.status(200).json({reviews,totalReviews,lastMonthReviews,Fivestar,Fourstar,Threestar,Twostar,Onestar});
    } catch (error) {
        next(error);
    }
};

export const adminReply = async(req,res,next) =>{
    
    try {
        const review = await Review.findById(req.params.reviewId);
        if(!review){
            return next(errorHandler(404,'Review not found'));
        }
        
        if(review.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403,'you are not allow to edit reviews'));
        }
        
        const { reply } = req.body;

        // Update the review with the reply
        review.reply = reply;

        await adminReply.save();
        res.status(200).json(adminReply);
        
    } catch (error) {
        next(error);
        
    }
};