import activityModel from '../models/activity.model.js';

// add activity
const addActivity = async(req, res) =>{
    const { title, description, location, date_time } = req.body;

    if(!title || !description || !location || !date_time){
        return res.status(400).json({
            success: false,
            message: "fill all details"
        });
    }
    try {
        const newActivity = new activityModel({
            title,
            location,
            description,
            date_time
        });
        if(!newActivity){
            return res.status(400).json({
                success: false,
                message: "Fail to add activity"
            });
        }
        await newActivity.save();
        res.status(200).json({
            success: true,
            message: "New activity added",
            newActivity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    };
};

//get public activity
const getActivity = async(req, res) =>{
    try {
        const response = await activityModel.find();
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Empty"
            });
        }

        //retrieving all activity
        res.status(200).json({
            success: true,
            message: "All activities",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
};

//get activity by id
const getActivityById = async(req, res) =>{
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Invalid activity id"
        });
    }
    try {
        const response = await activityModel.findById(id);
        if(!response){
            return res.status(400).json({
                success: false,
                message: "Failed to get data"
            });
        }
        res.status(200).json({
            success: true,
            message: "Activity",
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

export { addActivity, getActivity, getActivityById };
