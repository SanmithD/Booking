import mongoose from 'mongoose';

//schema for activity
const activitySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date_time:{
        type: Date,
        required: true
    }
},{ timestamps: true });

//activity model
const activityModel = mongoose.model('activity',activitySchema );

export default activityModel