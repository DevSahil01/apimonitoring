// utils/periodUtils.js
function getPeriodStart(period) {
    const now = new Date();
    const date = new Date(now); // Clone to avoid mutation
    
    switch (period) {
      case 'hour':
        date.setHours(date.getHours() - 1);
        break;
      case 'today':
        date.setHours(0, 0, 0, 0);
        break;
      case 'week':
        date.setDate(date.getDate() - 7);
        break;
      case 'month':
        date.setMonth(date.getMonth() - 1);
        break;
      case 'year':
        date.setFullYear(date.getFullYear() - 1);
        break;
      default: // 'all' or invalid
        return 0; // Unix epoch start
    }
  
    return Math.floor(date.getTime() / 1000); // Convert to Unix timestamp (seconds)
  }
export default getPeriodStart;