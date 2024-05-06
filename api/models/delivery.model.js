
import mongoose from 'mongoose'

const deliverySchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type:String,
        required : true,
    },
    items:{
        type:String,
        required:true,
    },
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,  
        lowercase:true, 
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    
    zip:{
        type:Number,
        required:true,
    },
    trackingnumber:{
        type: String,
        required:true, 
    },
    status:{
        type: String,
        required:true,
    },
    deliveryservice:{
        type:String,
        required:true,
    },
    deliverycontactno:{
        type:Number,
        required:true,
    }


    // orderstatus:{
    //     type: String,
    //     enum:['pending','processing','completed', 'cancelled'],
    // },
    // paymentstatus:{
    //     type: String,
    // },
    }, {timestamps: true}

);

const Delivery = mongoose.model('Delivery',deliverySchema);


export default Delivery;