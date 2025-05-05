import clickhouse from "../connection.js";

const getErrorAnalytics = async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log(projectId);

        const { period = '24 HOUR' } = req.query;

        const recurringErrorsQuery = `
            SELECT
                endpoint,
                status_code,
                count() AS occurrences,
                floor(avg(response_time_ms)) AS avg_latency,
                argMax(timestamp, timestamp) AS last_occurrence
            FROM api_request_logs
            WHERE is_error = 1
              AND project_id = {projectId:String}
            GROUP BY endpoint, status_code
            ORDER BY occurrences DESC
            LIMIT 10
        `;

        const errorCategoryDistributionQuery = `
            SELECT
                CASE
                    WHEN status_code BETWEEN 400 AND 499 THEN '4xx (Client Errors)'
                    WHEN status_code >= 500 THEN '5xx (Server Errors)'
                END AS error_type,
                count() AS count,
                round(count() / sum(count()) OVER () * 100, 2) AS percentage
            FROM api_request_logs
            WHERE is_error = 1
              AND project_id = {projectId:String}
              AND timestamp > now() - INTERVAL ${period}
            GROUP BY error_type
        `;

        const methodFailureRatesQuery = `
            SELECT
                method,
                count() AS total_requests,
                sum(is_error) AS errors,
                round(errors / total_requests * 100, 2) AS error_rate
            FROM api_request_logs
            WHERE project_id = {projectId:String}
              AND timestamp > now() - INTERVAL ${period}
            GROUP BY method
            ORDER BY error_rate DESC
        `;

        const [
            recurringErrorsResult,
            errorCategoryResult,
            methodFailureResult
        ] = await Promise.all([
            clickhouse.query({
                query: recurringErrorsQuery,
                query_params: { projectId },
                format: 'JSONEachRow'
            }).then(r => r.json()),

            clickhouse.query({
                query: errorCategoryDistributionQuery,
                query_params: { projectId },
                format: 'JSONEachRow'
            }).then(r => r.json()),

            clickhouse.query({
                query: methodFailureRatesQuery,
                query_params: { projectId },
                format: 'JSONEachRow'
            }).then(r => r.json())
        ]);

        res.json({
            recurringErrors: recurringErrorsResult,
            errorCategoryDistribution: errorCategoryResult,
            methodFailureRates: methodFailureResult
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

export default getErrorAnalytics;
