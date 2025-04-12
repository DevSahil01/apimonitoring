// index.js
const axios = require('axios');

const monitor = () => {
  return (req, res, next) => {
    const start = process.hrtime();

    res.on('finish', () => {
      const [s, ns] = process.hrtime(start);
      const responseTime = (s * 1e3 + ns / 1e6).toFixed(2); // in ms

      const logData = {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        responseTime,
        timestamp: new Date().toISOString(),
      };

      console.log(logData)

      axios.post("http://localhost:4000/logData",logData)
      .catch((err)=>{
           console.log("Failed to send data to middleware server. ",err)
      })

      
    });

    next();
  };
};

module.exports = monitor;
