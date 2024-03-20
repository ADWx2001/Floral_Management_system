import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Array,
        default: []
    },
    numberofrating: {
        type: Number,
        default: 0
    },
    reviewimage:{
        type:String,
    },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
