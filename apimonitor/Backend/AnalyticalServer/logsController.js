// controllers/recentLogsController.js
import clickhouse from '../connection.js';

const getRecentLogs = async (req, res) => {
  try {
    const { limit = 20, } = req.query;
    const {projectId}= req.params;
    console.log(projectId)

    const result = await clickhouse.query({
      query: `
        SELECT *
        FROM api_request_logs
        WHERE project_id = {projectId:String}
        ORDER BY timestamp DESC
        LIMIT {limit:UInt32}
      `,
      format: 'JSONEachRow',
      query_params: { limit: parseInt(limit), projectId },
    }).then(r => r.json());

    res.json(result);
  } catch (error) {
    console.error('Error fetching recent logs:', error);
    res.status(500).json({ error: 'Failed to fetch recent logs' });
  }
};


export default getRecentLogs