import 'dotenv/config';
import jwt from 'jsonwebtoken';

//secrete key
const SECRET = process.env.JWT_SECRET;

const authorized = (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(400).json({
            success: false,
            message: "Invalid token"
        });
    };

    try {
        const decode = jwt.verify(token, SECRET);
        req.user = decode;
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error)
    }
};

export default authorized