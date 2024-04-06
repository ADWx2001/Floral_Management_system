import mongoose from 'mongoose';

const restocksSchema = new mongoose.Schema(
  {
    supplier: {
      type: String,
      required: true,
    },
    itemname: {
        type: String,
        required: true,
      
      },
    cost: {
      type: Number,
      required: true,
    },
    
    Deliverystatus: {
      type: String,
      required: true,
     
    },
   
    quantity:{
      type: Number,
      required: true,
      
    },
  
    Date:{
        type: Date,
        required: true,
    },
    

   
  },
  { timestamps: true }
);

const Restocks = mongoose.model('Restocks', restocksSchema);

export default Restocks;