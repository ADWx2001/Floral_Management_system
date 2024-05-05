import mongoose from 'mongoose'

// Define the schema for the event booking
const eventBookingSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    description:{
        type : String,
        required:true
    },
    guestCount: {
        type: Number,
        required: true
    },
    themeColor: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    arrangements: {
        type: String,
        
       
    },
});

// Create a model using the schema
const EventBooking = mongoose.model('eventbooking', eventBookingSchema);

export default  EventBooking;
