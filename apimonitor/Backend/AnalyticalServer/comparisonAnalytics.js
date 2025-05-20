import clickhouse from "../connection.js";
import getPeriodStart from "../Utils/periodUtils.js";

const getComparisons = async (req, res) => {
  try {
    const { currentPeriod = '7d', previousPeriod = '14d', projectId } = req.query;
    const currentStart = getPeriodStart(currentPeriod);
    const previousStart = getPeriodStart(previousPeriod);

    const [
      trafficComparison,
      avgTimeComparison,
      topEndpointsComparison,
      errorRateComparison
    ] = await Promise.all([
    
      clickhouse.query({
        query: `
          SELECT
            'current' AS period,
            count(*) AS request_count
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({currentStart:String})
          AND project_id = {projectId:String}
          UNION ALL
          SELECT
            'previous' AS period,
            count(*) AS request_count
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({previousStart:String})
          AND timestamp < parseDateTimeBestEffort({currentStart:String})
          AND project_id = {projectId:String}
        `,
        format: 'JSONEachRow',
        query_params: { currentStart, previousStart, projectId }
      }).then(r => r.json()),

      clickhouse.query({
        query: `
          SELECT
            'current' AS period,
            avg(response_time_ms) AS avg_response_time
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({currentStart:String})
          AND project_id = {projectId:String}
          UNION ALL
          SELECT
            'previous' AS period,
            avg(response_time_ms) AS avg_response_time
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({previousStart:String})
          AND timestamp < parseDateTimeBestEffort({currentStart:String})
          AND project_id = {projectId:String}
        `,
        format: 'JSONEachRow',
        query_params: { currentStart, previousStart, projectId }
      }).then(r => r.json()),

     
      clickhouse.query({
        query: `
          SELECT 'current' AS period, endpoint, count(*) AS hits
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({currentStart:String})
          AND project_id = {projectId:String}
          GROUP BY endpoint
          ORDER BY hits DESC
          LIMIT 5
          UNION ALL
          SELECT 'previous' AS period, endpoint, count(*) AS hits
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({previousStart:String})
          AND timestamp < parseDateTimeBestEffort({currentStart:String})
          AND project_id = {projectId:String}
          GROUP BY endpoint
          ORDER BY hits DESC
          LIMIT 5
        `,
        format: 'JSONEachRow',
        query_params: { currentStart, previousStart, projectId }
      }).then(r => r.json()),


      clickhouse.query({
        query: `
          SELECT
            'current' AS period,
            countIf(status_code >= 400) * 100.0 / count(*) AS error_rate
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({currentStart:String})
          AND project_id = {projectId:String}
          UNION ALL
          SELECT
            'previous' AS period,
            countIf(status_code >= 400) * 100.0 / count(*) AS error_rate
          FROM api_request_logs
          WHERE timestamp >= parseDateTimeBestEffort({previousStart:String})
          AND timestamp < parseDateTimeBestEffort({currentStart:String})
          AND project_id = {projectId:String}
        `,
        format: 'JSONEachRow',
        query_params: { currentStart, previousStart, projectId }
      }).then(r => r.json()),
    ]);

    res.json({
      trafficComparison,
      avgTimeComparison,
      topEndpointsComparison,
      errorRateComparison
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getComparisons;
