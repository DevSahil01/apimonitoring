import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBasicAnalytics } from '../../ContextManagement/actions/analyticsAction.js';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CSpinner,
    CAlert,
} from '@coreui/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const BasicAnalyticsPage = () => {
    const dispatch = useDispatch();

    const { loading, data, error } = useSelector((state) => state.basicAnalytics);

    console.log(data)

    useEffect(() => {
        dispatch(getBasicAnalytics());
    }, [dispatch]);

    if (loading) return <CSpinner className="d-block mx-auto mt-5" color="primary" />;
    if (error) return <CAlert color="danger">Error: {error}</CAlert>;

    const { totalRequests, uniqueIPs, topEndpoints, methods } = data;

    return (
        <>
            <CRow className="mb-4">
                <CCol sm={6}>
                    <CCard>
                        <CCardHeader>Total Requests</CCardHeader>
                        <CCardBody className="text-center fs-3 fw-bold text-primary">
                            {totalRequests}
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={6}>
                    <CCard>
                        <CCardHeader>Unique IPs</CCardHeader>
                        <CCardBody className="text-center fs-3 fw-bold text-success">
                            {uniqueIPs}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol md={6}>
                    <CCard>
                        <CCardHeader>HTTP Method Distribution</CCardHeader>
                        <CCardBody style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={methods.map(m => ({ ...m, count: parseInt(m.count) }))}
                                        dataKey="count"
                                        nameKey="method"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >
                                        {methods.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol md={6}>
                    <CCard>
                        <CCardHeader>Top Requested Endpoints</CCardHeader>
                        <CCardBody style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topEndpoints}>
                                    <XAxis dataKey="endpoint" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#8884d8" barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default BasicAnalyticsPage;
