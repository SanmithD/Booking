import express from 'express';
import { booking, cancelBookings, getBookings } from '../controller/booking.controllers.js';
import authorized from '../middleware/auth.middleware.js';

//route for booking activity
const bookRouter = express.Router();

bookRouter.post('/book/:activityId', authorized , booking);
bookRouter.get('/get', authorized, getBookings );
bookRouter.delete('/cancel/:id', authorized, cancelBookings );

export default bookRouter