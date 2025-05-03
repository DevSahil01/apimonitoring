import clickhouse from "../connection.js";

// Helper function to format timestamp for ClickHouse
function formatClickHouseTimestamp(isoString) {
    return isoString.replace('T', ' ').replace('Z', '');
}

async function insertLog(logData) {
    try {
        await clickhouse.insert({
            table: 'api_request_logs',
            values: [{
                id: generateUUIDv4(),
                project_id: logData.projectId,
                method: logData.method,
                endpoint: logData.path,
                status_code: logData.status,
                response_time_ms: parseFloat(logData.responseTime),
                timestamp: formatClickHouseTimestamp(logData.timestamp),
                ip_address: logData.ip || '',
                user_agent: logData.userAgent || '',
                is_error: logData.status >= 400 ? 1 : 0
            }],
            format: "JSONEachRow"
        });
        console.log("Log inserted successfully");
        return true;
    } catch (err) {
        console.error("Error inserting into ClickHouse:", err);
        throw err;
    }
}

// UUID v4 generator
function generateUUIDv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

async function logHandler(req, res, next) {
    const logData = req.body;
    
    if (!logData || !logData.timestamp) {
        return res.status(400).json({ error: "Invalid log data" });
    }

    try {
        await insertLog(logData);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Logging failed:", err);
        res.status(500).json({ 
            error: "Failed to log request",
            details: err.message
        });
    }
}

export default logHandler;