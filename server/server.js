import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectToDB from './db.js';
import activityRouter from './routes/activity.route.js';
import bookRouter from './routes/booking.route.js';
import userRouter from './routes/user.route.js';

//initializing database
connectToDB();
const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors())
app.use(bodyParser.json());

//api's
app.get('/',(req, res)=>{
    res.send("Hello welcome to booking")
});
app.use('/api/auth', userRouter);
app.use('/api/booking', bookRouter );
app.use('/api/activity', activityRouter );

//server running
app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})