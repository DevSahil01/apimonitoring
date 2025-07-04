import express from 'express'
import getBasicAnalytics from '../AnalyticalServer/basicAnalytics.js';
import getPerformanceMetrics from '../AnalyticalServer/performanceAnalytics.js';
import errorAnalyticsController from '../AnalyticalServer/errorAnalyticsController.js';
import getErrorAnalytics from '../AnalyticalServer/errorAnalyticsController.js';
import getRecentLogs from '../AnalyticalServer/logsController.js';
import getTrendAnalysis from '../AnalyticalServer/historicalAnalytics.js';
import getComparisons from '../AnalyticalServer/comparisonAnalytics.js';

const analyticsRouter = express.Router();

analyticsRouter.get('/basic/:projectId', getBasicAnalytics);
analyticsRouter.get('/performance/', getPerformanceMetrics);
analyticsRouter.get('/error/:projectId',getErrorAnalytics);
analyticsRouter.get('/logs/:projectId',getRecentLogs);
analyticsRouter.get('/history/trends/:projectId',getTrendAnalysis);
analyticsRouter.get('/history/comparisons/:projectId',getComparisons);


export default analyticsRouter;