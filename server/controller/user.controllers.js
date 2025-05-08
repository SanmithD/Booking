import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import userModel from "../models/user.model.js";

//jwt secrete
const SECRET = process.env.JWT_SECRET;

//user signup
const signup = async(req, res) =>{

    const { name, email, phone_number, password } = req.body;

    if(!name || !email || !phone_number || !password){
        return res.status(400).json({
            success: false,
            message: "Enter all filed"
        });
    };
    try {
        //finding existing user
        const user = await userModel.findOne({ email });
        if(user){
            return res.status(400).json({
                success: false,
                message: "user already exist"
            });
        }

        //hashing user password
        const hashedPass = await bcrypt.hash(password, 10);

        //saving new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPass,
            phone_number
        });
        if(!newUser){
            return res.status(400).json({
                success: false,
                message: "Failed to signup"
            });
        }
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Signup success",
            newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

//login 
const login = async(req, res) =>{
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Enter all filed"
        });
    }
    try {
        //checking user exist or not
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exist please signup"
            });
        }

        //comparing password
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(400).json({
                success: false,
                message: "Incorrect details"
            });
        }
        
        //generating jwt token 
        const token = jwt.sign(
            {id: user._id, email: user.email},
            SECRET,
            {expiresIn: '24h'}
        );

        res.status(200).json({
            success: true,
            message: "Login success",
            name: user.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

//user profile
const profile = async(req, res) =>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(400).json({
            success: false,
            message: "Invalid token"
        });
    }
    //retrieving user profile
    try {
        const { id } = jwt.verify(token, SECRET);
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            });
        }
        //finding user data in db
        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not exist"
            });
        }
        res.status(200).json({
            success: true,
            message: "User profile",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
}

export { login, profile, signup };
