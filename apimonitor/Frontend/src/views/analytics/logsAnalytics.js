// ShowLogs.js
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '../../ContextManagement/actions/analyticsAction';
import downloadLogsAsExcel from './getLogsExcel';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CButtonGroup,
  CSpinner,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload, cilReload } from '@coreui/icons';

const ShowLogs = () => {
  const dispatch = useDispatch();
  const { loading, logs, error } = useSelector((state) => state.projectLogs);
  const { currentProjectID } = useSelector((state) => state.currentProjectState);
  const logEndRef = useRef(null);

  // Fetch logs on mount + polling
  useEffect(() => {
    if (currentProjectID) {
      fetchLogs(dispatch, currentProjectID);
      const interval = setInterval(() => {
        fetchLogs(dispatch, currentProjectID);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dispatch, currentProjectID]);

  // Auto-scroll to latest log
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleRefresh = () => {
    if (currentProjectID) {
      fetchLogs(dispatch, currentProjectID);
    }
  };

  const handleDownload = () => {
    if (logs && logs.length > 0) {
      downloadLogsAsExcel(logs);
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <strong>Recent Logs</strong>
        <CButtonGroup>
          <CButton color="primary" variant="outline" onClick={handleRefresh}>
            <CIcon icon={cilReload} className="me-2" />
            Refresh
          </CButton>
          <CButton color="success" variant="outline" onClick={handleDownload}>
            <CIcon icon={cilCloudDownload} className="me-2" />
            Download Excel
          </CButton>
        </CButtonGroup>
      </CCardHeader>

      <CCardBody style={{ backgroundColor: '#000', color: '#00ff00', fontFamily: 'monospace', height: '500px', overflowY: 'scroll' }}>
        {loading && <CSpinner color="light" />}
        {error && <CAlert color="danger">Error: {error}</CAlert>}
        {logs && logs.slice().reverse().map((log, idx) => (
          <div key={idx} className="mb-1">
            <p className="text-sm">
              <span style={{ color: '#facc15' }}>[{log.status_code}]</span>{' '}
              [{new Date(log.timestamp).toLocaleTimeString()}] {log.method} {log.endpoint} -{' '}
              <span style={{ color: '#7dd3fc' }}>{log.response_time_ms}ms</span>
            </p>
          </div>
        ))}
        <div ref={logEndRef} />
      </CCardBody>
    </CCard>
  );
};

export default ShowLogs;
