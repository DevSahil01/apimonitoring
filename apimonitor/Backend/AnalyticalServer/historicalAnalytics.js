import clickhouse from '../connection.js'
import getPeriodStart from "../Utils/periodUtils.js";

const getTrendAnalysis = async (req, res) => {
  try {
    const { period = '7d'} = req.query;
    const periodStart = getPeriodStart(period);
    const intervalUnit = period === 'today' ? 'HOUR' : 'DAY';
    const {projectId} = req.params;

    const [
      requestVolumeTrend,
      avgResponseTrend,
      errorRateTrend,
      endpointTrend
    ] = await Promise.all([
    
      clickhouse.query({
        query: `
          SELECT 
            toStartOfInterval(timestamp, INTERVAL 1 ${intervalUnit}) AS time_bucket,
            count(*) AS requests
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({periodStart:String})
          AND project_id = {projectId:String}
          GROUP BY time_bucket
          ORDER BY time_bucket
        `,
        format: 'JSONEachRow',
        query_params: { periodStart, projectId }
      }).then(r => r.json()),


      clickhouse.query({
        query: `
          SELECT 
            toStartOfInterval(timestamp, INTERVAL 1 ${intervalUnit}) AS time_bucket,
            avg(response_time_ms) AS avg_response_time
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({periodStart:String})
          AND project_id = {projectId:String}
          GROUP BY time_bucket
          ORDER BY time_bucket
        `,
        format: 'JSONEachRow',
        query_params: { periodStart, projectId }
      }).then(r => r.json()),


      clickhouse.query({
        query: `
          SELECT 
            toStartOfInterval(timestamp, INTERVAL 1 ${intervalUnit}) AS time_bucket,
            countIf(status_code >= 400) * 100.0 / count(*) AS error_rate
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({periodStart:String})
          AND project_id = {projectId:String}
          GROUP BY time_bucket
          ORDER BY time_bucket
        `,
        format: 'JSONEachRow',
        query_params: { periodStart, projectId }
      }).then(r => r.json()),

 
      clickhouse.query({
        query: `
          SELECT 
            toStartOfInterval(timestamp, INTERVAL 1 ${intervalUnit}) AS time_bucket,
            endpoint,
            count(*) AS hits
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({periodStart:String})
          AND project_id = {projectId:String}
          GROUP BY time_bucket, endpoint
          ORDER BY time_bucket, hits DESC
        `,
        format: 'JSONEachRow',
        query_params: { periodStart, projectId }
      }).then(r => r.json()),
    ]);

    res.json({
      requestVolumeTrend,
      avgResponseTrend,
      errorRateTrend,
      endpointTrend
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getTrendAnalysis;
