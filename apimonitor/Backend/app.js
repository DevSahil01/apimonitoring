
import express, { application }  from 'express'
import projectRouter from './server/projectRoutes.js';
// import fetchlogs from './AnalyticalServer/fetchlogs.js';
import demoRouter from './server/demoRoutes.js';
import cors from 'cors';
import userRouter from './server/userRoutes.js';
import connectDB from './configdb.js';
import cookieParser from 'cookie-parser';
import analyticsRouter from './server/analyticsRoutes.js';

connectDB();
const app = express();

app.use(express.json())

app.use(cookieParser())


app.use(cors( {
  origin: ['http://localhost:5173'], // Your frontend URL
  credentials: true, // REQUIRED for cookies
  allowedHeaders: ['Content-Type', 'Authorization']
}));



///my application routes

app.use('/user',userRouter);
app.use('/projects',projectRouter)
app.use('/api/demo',demoRouter);
app.use('/analytics',analyticsRouter);


const PORT = 4000;






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
