import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
       
    },
    title: {
        type: String,
       
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
        default:"https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
    },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
