import express from 'express';
import { addActivity, getActivity, getActivityById } from '../controller/activity.controllers.js';
import authorized from '../middleware/auth.middleware.js';

//router for activity
const activityRouter = express.Router();

activityRouter.post('/addActivity', addActivity );
activityRouter.get('/', authorized, getActivity );
activityRouter.get('/activityById/:id', authorized, getActivityById );

export default activityRouter