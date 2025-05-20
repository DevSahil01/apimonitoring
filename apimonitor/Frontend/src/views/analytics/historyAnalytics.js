import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react';
import { Line } from 'react-chartjs-2';
import { fetchTrendAnalytics } from '../../ContextManagement/actions/analyticsAction';
import 'chart.js/auto';

const TrendAnalytics = ( ) => {
  const dispatch = useDispatch();
  const { trendData, loading, error } = useSelector((state) => state.trendAnalytics);
  const {currentProjectID} = useSelector((state)=> state.currentProjectState)

  useEffect(() => {
    if (currentProjectID) {
      dispatch(fetchTrendAnalytics(currentProjectID, '7_days'));
    }
  }, [dispatch, currentProjectID]);

  const chartData = {
    labels: trendData?.trendOverTime?.map((d) => new Date(d.time_bucket).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Total Requests',
        data: trendData?.trendOverTime?.map((d) => d.total_requests) || [],
        borderColor: '#4bc0c0',
        fill: false,
      },
      {
        label: 'Error Count',
        data: trendData?.trendOverTime?.map((d) => d.error_count) || [],
        borderColor: '#ff6384',
        fill: false,
      },
    ],
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>Trend Analysis - Last 7 Days</CCardHeader>
      <CCardBody>
        {loading ? (
          <CSpinner />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <Line data={chartData} />
        )}
      </CCardBody>
    </CCard>
  );
};

export default TrendAnalytics;
