import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorAnalytics } from '../../ContextManagement/actions/analyticsAction';
import {
  CCard, CCardBody, CCardHeader, CRow, CCol, CSpinner, CAlert
} from '@coreui/react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title
} from 'chart.js';

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title);

const ErrorAnalyticsPage = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.errorAnalytics);

  useEffect(() => {
    dispatch(getErrorAnalytics('681534d8060da104357abe87'));
  }, [dispatch]);

  const pieChartData = {
    labels: data.errorCategoryDistribution?.map(item => item.error_type),
    datasets: [{
      data: data.errorCategoryDistribution?.map(item => item.count),
      backgroundColor: ['#FF6384', '#FF9F40', '#36A2EB']
    }]
  };

  const methodBarChart = {
    labels: data.methodFailureRates?.map(item => item.method),
    datasets: [
      {
        label: 'Error Rate (%)',
        data: data.methodFailureRates?.map(item => item.error_rate),
        backgroundColor: '#36A2EB',
      }
    ]
  };

  const recurringErrorChart = {
    labels: data.recurringErrors?.map(item => item.endpoint),
    datasets: [
      {
        label: 'Occurrences',
        data: data.recurringErrors?.map(item => parseInt(item.occurrences)),
        backgroundColor: '#FF6384',
      }
    ]
  };

  return (
    <div>
      <h2>Error Analytics</h2>
      {loading ? (
        <CSpinner color="primary" />
      ) : error ? (
        <CAlert color="danger">{error}</CAlert>
      ) : (
        <>
          <CRow>
            <CCol md={6}>
              <CCard>
                <CCardHeader>Error Category Distribution</CCardHeader>
                <CCardBody>
                  {data.errorCategoryDistribution?.length ? (
                    <Pie data={pieChartData} />
                  ) : <p>No error distribution data</p>}
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md={6}>
              <CCard>
                <CCardHeader>Method Failure Rates</CCardHeader>
                <CCardBody>
                  {data.methodFailureRates?.length ? (
                    <Bar data={methodBarChart} />
                  ) : <p>No method failure rate data</p>}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow className="mt-4">
            <CCol md={12}>
              <CCard>
                <CCardHeader>Top Recurring Errors</CCardHeader>
                <CCardBody>
                  {data.recurringErrors?.length ? (
                    <Bar
                      data={recurringErrorChart}
                      options={{
                        indexAxis: 'y', // Horizontal Bar
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                          title: { display: true, text: 'Endpoint Error Frequencies' },
                        },
                      }}
                    />
                  ) : <p>No recurring error data</p>}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}
    </div>
  );
};

export default ErrorAnalyticsPage;
