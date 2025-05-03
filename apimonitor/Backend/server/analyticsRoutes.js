import express from 'express'
import getBasicAnalytics from '../AnalyticalServer/basicAnalytics.js';
import getPerformanceMetrics from '../AnalyticalServer/performanceAnalytics.js';

const analyticsRouter = express.Router();

analyticsRouter.get('/basic', getBasicAnalytics);
analyticsRouter.get('/performance', getPerformanceMetrics);


export default analyticsRouter;