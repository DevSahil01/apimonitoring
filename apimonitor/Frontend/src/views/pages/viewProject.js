import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol,
    CBadge,
    CButton,
    CAlert,
} from '@coreui/react';

const ProjectDetails = () => {
    const { id } = useParams();
    const { projects, loading } = useSelector((state) => state.getMyprojects);
    console.log(projects)

    // Find the project with matching ID
    const project = projects.find((p) => p._id === id);

    if (!id) {
        return <CAlert color="danger">Project ID is missing</CAlert>;
    }
    if (!project) {
        return <CAlert color="danger">Project not found</CAlert>;
    }


    const DetailItem = ({ label, value }) => (
        <div className="mb-2">
          <strong>{label}:</strong> <span>{value}</span>
        </div>
      );
      
    return (
        <div className="container my-4">
            <CCard>
                <CCardHeader className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="mb-0">{project.name}</h1>
                        <p className="mb-0">{project.description}</p>
                    </div>
                    <CBadge color={project.active ? 'success' : 'secondary'} className="ms-2">
                        {project.active ? 'Active' : 'Inactive'}
                    </CBadge>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        {/* Basic Information */}
                        <CCol md={6}>
                            <CCard className="mb-3">
                                <CCardHeader>Basic Information</CCardHeader>
                                <CCardBody>
                                    <DetailItem label="Project ID" value={project._id} />
                                    <DetailItem
                                        label="Created At"
                                        value={new Date(project.createdAt).toLocaleString()}
                                    />
                                    <DetailItem
                                        label="Last Updated"
                                        value={new Date(project.updatedAt).toLocaleString()}
                                    />
                                    <DetailItem label="Owner" value={project.owner} />
                                </CCardBody>
                            </CCard>
                        </CCol>

                        {/* Model Configuration */}
                        <CCol md={6}>
                            <CCard className="mb-3">
                                <CCardHeader>Monitoring Configuration</CCardHeader>
                                <CCardBody>
                                    <DetailItem label="Sample Rate" value={project.monitoringConfig.sampleRate} />
                                    <DetailItem label="Track Errors" value={project.monitoringConfig.trackErrors ? 'Yes' : 'No'} />
                                    <DetailItem label="Track Latency" value={project.monitoringConfig.trackLatency ? 'Yes' : 'No'} />
                                    <DetailItem label="Error Rate Threshold" value={project.monitoringConfig.alertThresholds?.errorRate + '%'} />
                                    <DetailItem label="Slow Response Threshold" value={project.monitoringConfig.alertThresholds?.slowResponse + 'ms'} />
                                    <DetailItem label="Excluded Routes" value={project.monitoringConfig.excludeRoutes.length > 0 ? project.monitoringConfig.excludeRoutes.join(', ') : 'None'} />
                                    <DetailItem label="Excluded Patterns" value={project.monitoringConfig.excludePatterns.length > 0 ? project.monitoringConfig.excludePatterns.join(', ') : 'None'} />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>

                    <CRow>
                        {/* Data Sources */}
                        <CCol md={6}>
                            <CCard className="mb-3">
                                <CCardHeader>Data Sources</CCardHeader>
                                <CCardBody>
                                    {project.dataSources && project.dataSources.length > 0 ? (
                                        <ul className="list-unstyled">
                                            {project.dataSources.map((source, index) => (
                                                <li key={index} className="mb-2">
                                                    <strong>{source.type}:</strong> {source.uri}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted">No data sources configured</p>
                                    )}
                                </CCardBody>
                            </CCard>
                        </CCol>

                        {/* API Configuration */}
                        <CCol md={6}>
                            <CCard className="mb-3">
                                <CCardHeader>API Configuration</CCardHeader>
                                <CCardBody>
                                    <DetailItem
                                        label="Base URL"
                                        value={project.apiConfig?.baseUrl || 'Not configured'}
                                    />
                                    <DetailItem
                                        label="Endpoint"
                                        value={project.apiConfig?.endpoint || 'Not configured'}
                                    />
                                    <DetailItem
                                        label="Authentication"
                                        value={project.apiConfig?.authMethod || 'Not configured'}
                                    />
                                    <h5 className="mt-3">Headers</h5>
                                    {project.apiConfig?.headers &&
                                        Object.entries(project.apiConfig.headers).length > 0 ? (
                                        <ul className="list-unstyled">
                                            {Object.entries(project.apiConfig.headers).map(([key, value]) => (
                                                <li key={key}>
                                                    <strong>{key}:</strong> {value}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted">No custom headers</p>
                                    )}
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>

                    {/* Advanced Settings */}
                    {project.advancedSettings && (
                        <CRow>
                            <CCol>
                                <CCard className="mb-3">
                                    <CCardHeader>Advanced Settings</CCardHeader>
                                    <CCardBody>
                                        <CRow>
                                            <CCol md={4}>
                                                <DetailItem
                                                    label="Cache Enabled"
                                                    value={project.advancedSettings.cacheEnabled ? 'Yes' : 'No'}
                                                />
                                            </CCol>
                                            <CCol md={4}>
                                                <DetailItem
                                                    label="Retry Attempts"
                                                    value={project.advancedSettings.retryAttempts}
                                                />
                                            </CCol>
                                            <CCol md={4}>
                                                <DetailItem
                                                    label="Timeout (ms)"
                                                    value={project.advancedSettings.timeout}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mt-2">
                                            <CCol md={4}>
                                                <DetailItem
                                                    label="Logging Level"
                                                    value={project.advancedSettings.loggingLevel}
                                                />
                                            </CCol>
                                            <CCol md={4}>
                                                <DetailItem
                                                    label="Rate Limit"
                                                    value={project.advancedSettings.rateLimit}
                                                />
                                            </CCol>
                                            <CCol md={4}>
                                                <DetailItem
                                                    label="Batch Size"
                                                    value={project.advancedSettings.batchSize}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    )}

                    {/* Actions */}
                    <div className="d-flex justify-content-end">
                        <CButton color="secondary" className="me-2">
                            Edit Configuration
                        </CButton>
                        <CButton color="primary">Test Configuration</CButton>
                    </div>
                </CCardBody>
            </CCard>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="mb-2">
        <strong>{label}:</strong> <span>{value.toString()}</span>
    </div>
);

export default ProjectDetails;
