import * as XLSX from 'xlsx';

const downloadLogsAsExcel = (logs) => {

  const formattedData = logs.map(log => ({
    Timestamp: log.timestamp,
    Method: log.method,
    Endpoint: log.endpoint,
    Status: log.status_code,
    ProjectID: log.project_id
  }));

 
  const worksheet = XLSX.utils.json_to_sheet(formattedData);


  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Recent Logs');

  XLSX.writeFile(workbook, 'recent_logs.xlsx');
};


export default downloadLogsAsExcel;