import express from 'express';
import { login, profile, signup } from '../controller/user.controllers.js';
import { loginSchema, userSchema } from '../middleware/user.middleware.js';

//creating user routes
const userRouter = express.Router();

userRouter.post('/signup', userSchema, signup );
userRouter.post('/login', loginSchema, login );
userRouter.get('/profile', profile );

export default userRouter