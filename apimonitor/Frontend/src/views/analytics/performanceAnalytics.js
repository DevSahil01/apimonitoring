import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPerformanceAnalytics } from '../../ContextManagement/actions/analyticsAction';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CAlert
} from '@coreui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  Label
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Format time for better display
const formatTimeTick = (timeStr) => {
  const date = new Date(timeStr);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const PerformanceAnalyticsPage = () => {
  const dispatch = useDispatch();
  const { performance, loading, error } = useSelector((state) => state.performanceAnalytics);
  const {currentProjectID}= useSelector((state=> state.currentProjectState))

 useEffect(() => {
     if(currentProjectID){

       dispatch(getPerformanceAnalytics('today',500,currentProjectID));
     }
   }, [dispatch,currentProjectID]);

  // console.log(currentProjectID)

  // Data processing
  const processChartData = () => {
    if (!performance) return null;

    return {
      avgResponseTimes: performance.avgResponseTimes?.map(item => ({
        ...item,
        avg_response_time: Number(item.avg_response_time),
        request_count: Number(item.request_count)
      })),
      slowEndpoints: performance.slowEndpoints?.map(item => ({
        ...item,
        avg_time: Number(item.avg_time),
        max_time: Number(item.max_time),
        requests: Number(item.requests)
      })),
      timeDistribution: performance.timeDistribution?.map(item => ({
        ...item,
        count: Number(item.count)
      })),
      timeTrend: performance.timeTrend?.map(item => ({
        ...item,
        avg_time: Number(item.avg_time),
        p95_time: Number(item.p95_time),
        // Convert to JavaScript Date for better axis formatting
        time_bucket: new Date(item.time_bucket).toISOString()
      }))
    };
  };

  const chartData = processChartData();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <CSpinner color="primary" />
      </div>
    );
  }

  if (error) {
    return <CAlert color="danger">{error}</CAlert>;
  }

  if (!chartData || !performance) {
    return <CAlert color="info">No performance data available</CAlert>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Avg Response Time Chart */}
      <CCard>
        <CCardHeader>Average Response Times (ms)</CCardHeader>
        <CCardBody style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.avgResponseTimes}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="endpoint" 
                angle={-45} 
                textAnchor="end" 
                height={80}
              />
              <YAxis>
                <Label 
                  angle={-90} 
                  value="Response Time (ms)" 
                  position="insideLeft" 
                  style={{ textAnchor: 'middle' }} 
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => [`${value.toFixed(2)} ms`]}
                labelFormatter={(value) => `Endpoint: ${value}`}
              />
              <Legend />
              <Bar 
                dataKey="avg_response_time" 
                fill="#8884d8" 
                name="Avg Response Time"
              />
            </BarChart>
          </ResponsiveContainer>
        </CCardBody>
      </CCard>

      {/* Slow Endpoints Chart */}
      <CCard>
        <CCardHeader>Slow Endpoints (ms)</CCardHeader>
        <CCardBody style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData.slowEndpoints}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="endpoint" 
                angle={-45} 
                textAnchor="end" 
                height={80}
              />
              <YAxis>
                <Label 
                  angle={-90} 
                  value="Response Time (ms)" 
                  position="insideLeft" 
                  style={{ textAnchor: 'middle' }} 
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => [`${value.toFixed(2)} ms`]}
                labelFormatter={(value) => `Endpoint: ${value}`}
              />
              <Legend />
              <Bar 
                dataKey="avg_time" 
                fill="#82ca9d" 
                name="Average Time"
              />
              <Bar 
                dataKey="max_time" 
                fill="#ff7300" 
                name="Max Time"
              />
            </BarChart>
          </ResponsiveContainer>
        </CCardBody>
      </CCard>

      {/* Time Distribution Chart */}
      <CCard>
        <CCardHeader>Response Time Distribution</CCardHeader>
        <CCardBody style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.timeDistribution}
                dataKey="count"
                nameKey="time_bucket"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.timeDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} requests`]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CCardBody>
      </CCard>

      {/* Time Trend Chart */}
      <CCard>
        <CCardHeader>Response Time Trend</CCardHeader>
        <CCardBody style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData.timeTrend}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time_bucket" 
                tickFormatter={formatTimeTick}
              />
              <YAxis>
                <Label 
                  angle={-90} 
                  value="Response Time (ms)" 
                  position="insideLeft" 
                  style={{ textAnchor: 'middle' }} 
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => [`${value.toFixed(2)} ms`]}
                labelFormatter={(value) => `Time: ${formatTimeTick(value)}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="avg_time" 
                stroke="#8884d8" 
                name="Average Time"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="p95_time" 
                stroke="#82ca9d" 
                name="95th Percentile"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default PerformanceAnalyticsPage;