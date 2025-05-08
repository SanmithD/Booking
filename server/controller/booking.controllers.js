import 'dotenv/config';
import jwt from 'jsonwebtoken';
import activityModel from '../models/activity.model.js';
import bookingModel from '../models/booking.model.js';

const JWT = process.env.JWT_SECRET;

// Book activity
const booking = async (req, res) => {
    const { activityId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const { id: userId } = jwt.verify(token, JWT);

        const activity = await activityModel.findById(activityId);
        if (!activity) {
            return res.status(404).json({ success: false, message: "Activity not found" });
        }

        const booking = new bookingModel({
            user: userId,
            activity: activity._id
        });

        await booking.save();

        res.status(200).json({
            success: true,
            message: "Activity booked successfully",
            booking
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get user's booked activities
const getBookings = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const { id: userId } = jwt.verify(token, JWT);

        const bookings = await bookingModel.find({ user: userId }).populate('activity');

        res.status(200).json({
            success: true,
            message: "User's booked activities",
            bookings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const cancelBookings = async(req, res) =>{
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(400).json({
            success: false,
            message: "Invalid token"
        });
    }
    try {
        const response = await bookingModel.findByIdAndDelete(id);
        if(!response){
            return res.status(400).json({
                success: false,
                message: "Failed to cancel booking"
            });
        };
        res.status(200).json({
            success: true,
            message: "Booking canceled",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

export { booking, cancelBookings, getBookings };

