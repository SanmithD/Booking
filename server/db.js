import 'dotenv/config';
import mongoose from "mongoose";

//connecting
const connectToDB = async() =>{
    //get connection url from dotenv
    const MONGO = process.env.MONGO_URI;
    try {
        const connection = await mongoose.connect(MONGO);
        console.log(`Connected to`, connection.connection.host )
    } catch (error) {
        console.log(error)
    }
}

export default connectToDB