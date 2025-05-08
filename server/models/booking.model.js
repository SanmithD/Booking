import mongoose from 'mongoose';

//user activity bookings
const bookingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    activity:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activity'
    },
    booked_at:{
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

//booking model
const bookingModel = mongoose.model('booking', bookingSchema );

export default bookingModel