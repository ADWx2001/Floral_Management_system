import Review from "../models/review.model.js";
import { errorHandler } from "../utils/error.js";

export const addreview = async (req, res, next) => {
    try {
        const { content, productId,reviewId, userId, reviewimage ,productname,username,rating,title} = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to add reviews'));
        }

        if (req.body.content) {
            if (!req.body.content || req.body.content.trim().length === 0) {
              return next(
                errorHandler(400, 'Content can not be empty')
              );
            }
         
          }
          if (req.body.rating) {
            if (!req.body.rating || req.body.rating.trim().length === 0) {
              return next(
                errorHandler(400, 'Rating can not be empty')
              );
            }
         
          }
        

        const newReview = new Review({
            content,
            productId,
            userId,
            reviewimage,
            productname,
            username, 
            rating,
            title
            
        });

        await newReview.save();

        res.status(200).json(newReview);
        
    } catch (error) {
        next(error);
    }
};

//Get reviews into product details page
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

//calculate modarate rating
export const getModarateRating = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        // Count total reviews for the specific product
        const totalReviews = await Review.countDocuments({ productId });
        // Count reviews with each rating for the specific product
        const Fivestar = await Review.countDocuments({ productId, rating: 5 });
        const Fourstar = await Review.countDocuments({ productId, rating: 4 });
        const Threestar = await Review.countDocuments({ productId, rating: 3 });
        const Twostar = await Review.countDocuments({ productId, rating: 2 });
        const Onestar = await Review.countDocuments({ productId, rating: 1 });

        // Rating value mapping
        const ratingValue = {
            5: 5,
            4: 4,
            3: 3,
            2: 2,
            1: 1
        };

        // Calculate the sum of the rating values
        const totalratingValue = (Fivestar * ratingValue[5]) + (Fourstar * ratingValue[4]) + (Threestar * ratingValue[3]) + (Twostar * ratingValue[2]) + (Onestar * ratingValue[1]);

        // Calculate the number of total ratings
        const totalRatings = Fivestar + Fourstar + Threestar + Twostar + Onestar;

        // Calculating the moderate rating
        const moderateRating = totalRatings !== 0 ? (totalratingValue / totalRatings).toFixed(1) : 0;

        res.status(200).json({ totalReviews, Fivestar, Fourstar, Threestar, Twostar, Onestar, moderateRating });
        
    } catch (error) {
        next(error);
    }
}

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
            reply:req.body.reply,
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
            return next(errorHandler(403,'Your are not allow to delete this review'));
        }
        await Review.findByIdAndDelete(req.params.reviewId);
        res.status(200).json('Review has been deleted');
    } catch (error) {
       next(error);
    }
}

//Get reviews into admin dashboard
export const getReviews = async(req,res,next) => {
    
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const reviews = await Review.find()
            .sort({createdAt: sortDirection})
            .skip(startIndex)
            
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
            return next(errorHandler(403,'you are not allow to reply reviews'));
        }
        
        const replyReview = await Review.findByIdAndUpdate(
            req.params.reviewId,
            {$set:{
                reply:req.body.reply,
                
            }
            },
            {new:true}
            );
            res.status(200).json(replyReview)
        
    } catch (error) {
        next(error);
        
    }
};