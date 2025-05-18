import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroupItem,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react'
import { cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentProject, getProjects } from '../ContextManagement/actions/projectActions'

const ProjectSelector = () => {
  const dispatch = useDispatch();
  const {currentProjectID}= useSelector((state=> state.currentProjectState))
  const { projects, loading } = useSelector((state) => state.getMyprojects)
  const [projectsData, setProjectsData] = useState([])

  // Fetch projects on mount
  useEffect(() => {
    dispatch(getProjects());
   
  }, [dispatch])

  console.log(currentProjectID)

  // Sync Redux data to local state when it changes
  useEffect(() => {
    if (projects && projects.length > 0) {
      const initializedProjects = projects.map(p => ({
        ...p,
        selected: false, // Initialize all as not selected
      }))
      setProjectsData(initializedProjects)
      dispatch(changeCurrentProject(projects[0]._id))
    }
  }, [projects])

  const selectProject = (projectId) => {
    setProjectsData(prev =>
      prev.map(p => ({
        ...p,
        selected: p._id === projectId,
      }))
    )
    dispatch(changeCurrentProject(projectId))
  }

  const currentProject = projectsData.find(p => p.selected) || projectsData[0]

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="m-2">
          <CCardHeader className="d-flex justify-content-between align-items-center">

            <CDropdown>
              <CDropdownToggle color="secondary" size="sm">
                {currentProject && currentProject.name}
              </CDropdownToggle>
              <CDropdownMenu>
                {projects && projects.map(project => (
                  <CDropdownItem
                    key={project._id}
                    active={project.selected}
                    onClick={() => selectProject(project._id)}
                    className="d-flex justify-content-between align-items-center "
                    style={{cursor:'pointer'}}
                  >
                    <div >
                      {project.name}

                    </div>
                    <CBadge
                      color={project.status === 'active' ? 'success' : 'secondary'}
                      className="ms-2"
                    >
                      {project.status && "active "}
                    </CBadge>
                    {project.selected && (
                      <CIcon icon={cilCheckCircle} className="text-success ms-2" />
                    )}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          </CCardHeader>


        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProjectSelector
