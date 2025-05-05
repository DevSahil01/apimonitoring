import express from 'express'
import getBasicAnalytics from '../AnalyticalServer/basicAnalytics.js';
import getPerformanceMetrics from '../AnalyticalServer/performanceAnalytics.js';
import errorAnalyticsController from '../AnalyticalServer/errorAnalyticsController.js';
import getErrorAnalytics from '../AnalyticalServer/errorAnalyticsController.js';

const analyticsRouter = express.Router();

analyticsRouter.get('/basic', getBasicAnalytics);
analyticsRouter.get('/performance', getPerformanceMetrics);
analyticsRouter.get('/error/:projectId',getErrorAnalytics);


export default analyticsRouter;