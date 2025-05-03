import React, { useState } from 'react';
import {
    CForm,
    CFormInput,
    CFormTextarea,
    CFormCheck,
    CFormLabel,
    CFormFeedback,
    CButton,
    CCol,
    CRow,
    CFormRange,
    CContainer,
    CSpinner
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerProject } from '../../ContextManagement/actions/projectActions';
// import { createProject } from '@/api/projects';
// import { useRouter } from 'next/navigation';

const NewProjectPage = () => {
    const dispatch = useDispatch();
    const response=useSelector((state)=>state.projectRegisterState)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        baseURL: '',
        trackErrors: true,
        trackLatency: true,
        sampleRate: 1.0,
        errorRateThreshold: 10,
        slowResponseThreshold: 1000,
        excludeRoutes: '',
        excludePatterns: '',
    });

    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Project name is required.';
        }
        if (!formData.baseURL.trim()) {
            newErrors.baseURL = 'API base URL is required.';
        } else if (!/^https?:\/\/.+/.test(formData.baseURL)) {
            newErrors.baseURL = 'Enter a valid URL starting with http:// or https://';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await dispatch(registerProject(formData));
            console.log(response)
            // if(isRegistered.status === 200 )  router.push('/projects');
           
        } catch (error) {
            console.error('Error creating project:', error);
        } 
    };

    return (
        <CContainer className="py-5">
            <h2 className="mb-4 fw-bold">Create Monitoring Project</h2>
            <CForm onSubmit={handleSubmit}>
                <CRow className="mb-3">
                    <CCol md={12}>
                        <CFormLabel htmlFor="name">Project Name </CFormLabel>
                        <CFormInput
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your project name"
                            value={formData.name}
                            onChange={handleChange}
                            invalid={!!errors.name}
                        />
                        <CFormFeedback invalid>{errors.name}</CFormFeedback>
                    </CCol>
                </CRow>

                <CRow className="mb-3">
                    <CCol md={12}>
                        <CFormLabel htmlFor="description">Project Description</CFormLabel>
                        <CFormTextarea
                            id="description"
                            name="description"
                            rows={3}
                            placeholder="Provide a short description of your project"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </CCol>
                </CRow>

                <CRow className="mb-3">
                    <CCol md={12}>
                        <CFormLabel htmlFor="baseURL">API Base URL *</CFormLabel>
                        <CFormInput
                            type="text"
                            id="baseURL"
                            name="baseURL"
                            placeholder="https://api.example.com"
                            value={formData.baseURL}
                            onChange={handleChange}
                            invalid={!!errors.baseURL}
                        />
                        <CFormFeedback invalid>{errors.baseURL}</CFormFeedback>
                    </CCol>
                </CRow>


                <CRow className="mb-3">
                    <CCol md={12}>
                        <CFormLabel htmlFor="excludeRoutes">Excluded Routes (comma separated)</CFormLabel>
                        <CFormInput
                            type="text"
                            id="excludeRoutes"
                            name="excludeRoutes"
                            placeholder="/health, /status"
                            value={formData.excludeRoutes}
                            onChange={handleChange}
                        />
                        <small className="text-muted">
                            Exact paths to exclude from monitoring
                        </small>
                    </CCol>
                </CRow>

                <CRow className="mb-3">
                    <CCol md={12}>
                        <CFormLabel htmlFor="excludePatterns">Exclusion Patterns (regex, comma separated)</CFormLabel>
                        <CFormInput
                            type="text"
                            id="excludePatterns"
                            name="excludePatterns"
                            placeholder="^/internal/.*, ^/private/"
                            value={formData.excludePatterns}
                            onChange={handleChange}
                        />
                        <small className="text-muted">
                            Regular expression patterns to exclude from monitoring
                        </small>
                    </CCol>
                </CRow>






                <h5 className="mt-4 mb-3 fw-semibold">Monitoring Preferences</h5>

                <CRow className="mb-3">
                    <CCol md={6}>
                        <CFormCheck
                            id="trackErrors"
                            name="trackErrors"
                            label="Enable tracking of error responses (4xx/5xx)"
                            checked={formData.trackErrors}
                            onChange={handleChange}
                        />
                    </CCol>
                    <CCol md={6}>
                        <CFormCheck
                            id="trackLatency"
                            name="trackLatency"
                            label="Enable monitoring of response time"
                            checked={formData.trackLatency}
                            onChange={handleChange}
                        />
                    </CCol>
                </CRow>

                <CRow className="mb-3">
                    <CCol md={12}>
                        <CFormLabel htmlFor="sampleRate">
                            Sampling Rate: {formData.sampleRate}
                        </CFormLabel>
                        <CFormRange
                            id="sampleRate"
                            name="sampleRate"
                            min="0"
                            max="1"
                            step="0.1"
                            value={formData.sampleRate}
                            onChange={handleChange}
                        />
                        <small className="text-muted">Set the percentage of requests to be monitored (0 to 1).</small>
                    </CCol>
                </CRow>

                <CRow className="mb-3">
                    <CCol md={6}>
                        <CFormLabel htmlFor="errorRateThreshold">Error Rate Threshold (%)</CFormLabel>
                        <CFormInput
                            type="number"
                            id="errorRateThreshold"
                            name="errorRateThreshold"
                            value={formData.errorRateThreshold}
                            onChange={handleChange}
                        />
                        <small className="text-muted">Alert if the error rate exceeds this percentage.</small>
                    </CCol>

                    <CCol md={6}>
                        <CFormLabel htmlFor="slowResponseThreshold">Slow Response Threshold (ms)</CFormLabel>
                        <CFormInput
                            type="number"
                            id="slowResponseThreshold"
                            name="slowResponseThreshold"
                            value={formData.slowResponseThreshold}
                            onChange={handleChange}
                        />
                        <small className="text-muted">Alert if response time exceeds this threshold (ms).</small>
                    </CCol>
                </CRow>

                <CButton type="submit" color="primary" >
                    create project 
                    
                </CButton>
            </CForm>
        </CContainer>
    );
};

export default NewProjectPage;
