import clickhouse from "../connection.js";
import getPeriodStart from "../Utils/periodUtils.js";

const getPerformanceMetrics = async (req, res) => {
  try {
    const { period = 'today', threshold = 500 } = req.query;
    const periodStart = getPeriodStart(period);
    const intervalUnit = period === 'today' ? 'HOUR' : 'DAY';


    const [
      avgResponseTimes,
      slowEndpoints,
      timeDistribution,
      timeTrend
    ] = await Promise.all([
      // 📈 Average Response Time per Endpoint
      clickhouse.query({
        query: `
          SELECT 
            endpoint,
            avg(response_time_ms) AS avg_response_time,
            count() AS request_count
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({periodStart:String})
          GROUP BY endpoint
          ORDER BY avg_response_time DESC
        `,
        format: 'JSONEachRow',
        query_params: { periodStart }
      }).then(r => r.json()),

      // 🐢 Slow Endpoints (avg > threshold)
      clickhouse.query({
        query: `
          SELECT 
            endpoint,
            avg(response_time_ms) AS avg_time,
            max(response_time_ms) AS max_time,
            count() AS requests
          FROM api_request_logs
          WHERE 
            timestamp >= parseDateTimeBestEffort({periodStart:String})
            AND response_time_ms > {threshold:UInt32}
          GROUP BY endpoint
          ORDER BY avg_time DESC
          LIMIT 10
        `,
        format: 'JSONEachRow',
        query_params: { periodStart, threshold: parseInt(threshold) }
      }).then(r => r.json()),

      // ⏱️ Response Time Distribution
      clickhouse.query({
        query: `
          SELECT 
            CASE
              WHEN response_time_ms < 200 THEN '0-200ms'
              WHEN response_time_ms < 500 THEN '200-500ms'
              WHEN response_time_ms < 1000 THEN '500ms-1s'
              ELSE '>1s'
            END AS time_bucket,
            count(*) AS count
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({periodStart:String})
          GROUP BY time_bucket
          ORDER BY time_bucket
        `,
        format: 'JSONEachRow',
        query_params: { periodStart }
      }).then(r => r.json()),

      // 📊 Time Series of Response Times
      clickhouse.query({
        query: `
          SELECT 
            toStartOfInterval(timestamp, INTERVAL 1 ${intervalUnit}) AS time_bucket,
            avg(response_time_ms) AS avg_time,
            quantile(0.95)(response_time_ms) AS p95_time
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({periodStart:String})
          GROUP BY time_bucket
          ORDER BY time_bucket
        `,
        format: 'JSONEachRow',
        query_params: { periodStart }
      }).then(r => r.json())
    ]);

    res.json({
      avgResponseTimes,
      slowEndpoints,
      timeDistribution,
      timeTrend
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getPerformanceMetrics;
