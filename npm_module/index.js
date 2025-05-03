const axios = require('axios');

const createMonitor = (projectId, apiKey) => {
  let projectConfig = null;
  let configLastFetched = 0;

  return async (req, res, next) => {
    // Fetch config if not loaded or stale (1 hour cache)
    if (!projectConfig || Date.now() - configLastFetched > 3600000) {
      try {
        const response = await axios.get(`http://localhost:4000/projects/config/${projectId}`, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        projectConfig = response.data;
        configLastFetched = Date.now();
      } catch (err) {
        console.error('Failed to fetch project config:', err.message);
        return next(); // Continue without monitoring
      }
    }

    // Skip if this route should be excluded
    if (shouldExcludeRequest(req, projectConfig)) {
      return next();
    }

    const start = process.hrtime();

    res.on('finish', () => {
      if (!shouldLogRequest(req, res, projectConfig)) return;

      const [seconds, nanoseconds] = process.hrtime(start);
      const responseTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

      const logData = {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        responseTime,
        timestamp: new Date().toISOString(),
        projectId,
        ip: req.ip?.replace(/\.\d+$/, '.0'), // Basic anonymization
        userAgent: req.headers['user-agent']
      };

      axios.post('http://localhost:4000/api/demo/logData', logData, {
        timeout: 3000
      }).catch(err => console.error('Monitoring upload failed:', err.message));
    });

    next();
  };
};

// Helper functions (unchanged as requested)
function shouldExcludeRequest(req, config) {
  if (!config.excludeRoutes && !config.excludePatterns) return false;
  
  // Check exact path matches
  if (config.excludeRoutes?.includes(req.path)) return true;

  // Check regex patterns
  if (config.excludePatterns) {
    return config.excludePatterns.some(pattern => {
      try {
        return new RegExp(pattern).test(req.path);
      } catch (e) {
        console.warn(`Invalid exclude pattern: ${pattern}`);
        return false;
      }
    });
  }
  return false;
}

function shouldLogRequest(req, res, config) {
  // Implement sampling
  if (config.sampleRate && Math.random() > config.sampleRate) return false;
  
  // Skip if not tracking errors and this is an error
  if (config.trackErrors === false && res.statusCode >= 400) return false;
  
  return true;
}

module.exports = createMonitor;