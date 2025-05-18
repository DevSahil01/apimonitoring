import clickhouse from "../connection.js";

const getBasicAnalytics = async (req, res) => {
  try {
    const period = req.query.period || 'today';
    const periodStart = getPeriodStart(period);
    const { projectId } = req.params;

    // Parallel queries
    const [summary, topEndpoints, methods] = await Promise.all([
      // ✅ Total Requests + 🌐 Unique IPs
      clickhouse.query({
        query: `
          SELECT 
            count() AS totalRequests,
            uniq(ip_address) AS uniqueIPs
          FROM api_request_logs
          WHERE timestamp >= {periodStart:String}
          AND project_id = {projectId:String}
        `,
        format: 'JSONEachRow',
        query_params: { periodStart, projectId }
      }).then(r => r.json()),

      // 🔁 Top Endpoints
      clickhouse.query({
        query: `
          SELECT 
            endpoint,
            count() AS count
          FROM api_request_logs
          WHERE timestamp >= {periodStart:String}
          AND project_id = {projectId:String}
          GROUP BY endpoint
          ORDER BY count DESC
          LIMIT 10
        `,
        format: 'JSONEachRow',
        query_params: { periodStart , projectId}
      }).then(r => r.json()),

      // 🧭 HTTP Methods
      clickhouse.query({
        query: `
          SELECT 
            method,
            count() AS count
          FROM api_request_logs
          WHERE timestamp >= {periodStart:String}
          AND project_id = {projectId:String}
          GROUP BY method
          ORDER BY count DESC
        `,
        format: 'JSONEachRow',
        query_params: { periodStart , projectId}
      }).then(r => r.json())
    ]);

    res.json({
      totalRequests: summary[0]?.totalRequests || 0,
      uniqueIPs: summary[0]?.uniqueIPs || 0,
      topEndpoints,
      methods
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper: Calculate period start
function getPeriodStart(period) {
  const now = new Date();
  switch (period) {
    case 'today': return now.setHours(0, 0, 0, 0);
    case 'week': return now.setDate(now.getDate() - 7);
    case 'month': return now.setMonth(now.getMonth() - 1);
    default: return 0; // All time
  }
}

export default getBasicAnalytics;