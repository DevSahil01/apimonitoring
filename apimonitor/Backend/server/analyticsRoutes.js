import express from 'express'
import getBasicAnalytics from '../AnalyticalServer/basicAnalytics.js';
import getPerformanceMetrics from '../AnalyticalServer/performanceAnalytics.js';
import errorAnalyticsController from '../AnalyticalServer/errorAnalyticsController.js';
import getErrorAnalytics from '../AnalyticalServer/errorAnalyticsController.js';
import getRecentLogs from '../AnalyticalServer/logsController.js';

const analyticsRouter = express.Router();

analyticsRouter.get('/basic/:projectId', getBasicAnalytics);
analyticsRouter.get('/performance/', getPerformanceMetrics);
analyticsRouter.get('/error/:projectId',getErrorAnalytics);
analyticsRouter.get('/logs/:projectId',getRecentLogs);


export default analyticsRouter;