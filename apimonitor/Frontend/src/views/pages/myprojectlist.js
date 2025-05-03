import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CSpinner
} from '@coreui/react';

import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../ContextManagement/actions/projectActions';


const ProjectList = () => {
  // const [projects, setProjects] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const data= useSelector((state)=>state.getMyprojects);
  const loading=data.loading;
 
  


  useEffect(() => {
    const fetchProjects = async () => {
       await dispatch(getProjects());
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <CContainer className="py-5 text-center">
        <CSpinner color="primary" />
      </CContainer>
    );
  }

  return (
    <CContainer className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Projects</h2>
        <Link to="/projects/new">
          <CButton color="success">Add Project</CButton>
        </Link>
      </div>

      <CRow className="g-4">
        {data.projects.map(project => (
          <CCol xs={12} md={6} lg={4} key={project._id}>
            <CCard className="h-100">
              <CCardBody>
                <CCardTitle>{project.name}</CCardTitle>
                <CCardText className="text-muted">
                  {project.description || 'No description'}
                </CCardText>
                <div className="mb-3">
                  <span className="badge bg-primary">{project.baseURL}</span>
                </div>
                <Link to={`/projects/${project._id}`} className="text-primary text-decoration-underline">
                  View Details
                </Link>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default ProjectList;
