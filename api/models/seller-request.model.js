import { mongoose } from 'mongoose';

const requestSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    supplier:{
        type:String,
        required: true,
        unique:true,
    }
},{timestamps:true}

);

const  RequestStock = mongoose.model('StockRequests',requestSchema);
export default RequestStock;

