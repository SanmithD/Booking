import mongoose from "mongoose";

//create a user schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone_number:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{ timestamps: true });

// creating model
const userModel = mongoose.model('user',userSchema);

export default userModel