"use client"

import { useState } from "react"
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardHeader,
  CCardTitle,
  CCardSubtitle,
  CCardFooter,
  CFormFeedback,
  CFormCheck,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilLockLocked, cilUser, cilEnvelopeClosed, cilPencil, cilArrowRight, cilPhone } from "@coreui/icons"
import { useDispatch } from "react-redux"
import { registerUser } from "../../../ContextManagement/actions/userActions"

const Register = () => {

  const dispatch=useDispatch();
  


  const [userData, setUserData] = useState({ username: "", name: "", email: "", password: "", c_password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    setValidated(true)
    dispatch(registerUser(userData))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #4a0072 0%, #1e2a4a 50%, #0f172a 100%)",
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      {/* Background overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'url("https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: 0,
        }}
      ></div>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={5}>
            <div className="mb-4 text-center text-white">
              <h1 className="display-5 fw-bold" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                Join Our Platform
              </h1>
              <p className="lead">Create an account to get started on your journey</p>
            </div>

            <CCard
              className="mx-4 border-0 shadow-lg"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
              }}
            >
              <CCardHeader className="text-center border-0 bg-transparent pt-4 pb-0">
                <CCardTitle className="text-white fs-2 fw-bold">Register</CCardTitle>
                <CCardSubtitle className="text-light mt-2 mb-3">Create your account</CCardSubtitle>
              </CCardHeader>

              <CCardBody className="p-4">
                <CForm className="needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
                  <CInputGroup className="mb-3" hover>
                    <CInputGroupText
                      style={{
                        background: "rgba(99, 102, 241, 0.2)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                    >
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      required
                      style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                      className="form-control-lg"
                    />
                    <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText
                      style={{
                        background: "rgba(99, 102, 241, 0.2)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                    >
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Full Name"
                      autoComplete="name"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      required
                      style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                      className="form-control-lg"
                    />
                    <CFormFeedback invalid>Please enter your name.</CFormFeedback>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText
                      style={{
                        background: "rgba(99, 102, 241, 0.2)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                    >
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      required
                      type="email"
                      style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                      className="form-control-lg"
                    />
                    <CFormFeedback invalid>Please enter a valid email.</CFormFeedback>
                  </CInputGroup>

                  

                  <CInputGroup className="mb-3">
                    <CInputGroupText
                      style={{
                        background: "rgba(99, 102, 241, 0.2)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                    >
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      required
                      minLength="8"
                      style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                      className="form-control-lg"
                    />
                    <CInputGroupText
                      onClick={togglePasswordVisibility}
                      style={{
                        background: "rgba(99, 102, 241, 0.2)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      <p>{showPassword?"show":"hide"}</p>
                    </CInputGroupText>
                    <CFormFeedback invalid>Password must be at least 8 characters.</CFormFeedback>
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText
                      style={{
                        background: "rgba(99, 102, 241, 0.2)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                    >
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      name="c_password"
                      value={userData.c_password}
                      onChange={handleChange}
                      required
                      style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                      }}
                      className="form-control-lg"
                    />
                    <CInputGroupText
                      onClick={toggleConfirmPasswordVisibility}
                      style={{
                        background: "rgba(99, 102, 241, 0.2)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      <p>{showConfirmPassword ? "hide":"show"} </p>
                    </CInputGroupText>
                    <CFormFeedback invalid>Passwords must match.</CFormFeedback>
                  </CInputGroup>

                  <div className="mb-3">
                    <CFormCheck
                      id="termsCheck"
                      label="I agree to the Terms and Privacy Policy"
                      required
                      style={{ color: "white" }}
                    />
                  </div>

                  <div className="d-grid">
                    <CButton
                      type="submit"
                      style={{
                        background: "linear-gradient(to right, #8b5cf6, #6366f1)",
                        border: "none",
                        padding: "12px",
                        transition: "all 0.3s ease",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                      className="btn-lg"
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "linear-gradient(to right, #7c3aed, #4f46e5)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "linear-gradient(to right, #8b5cf6, #6366f1)")
                      }
                    >
                      Create Account
                      <CIcon icon={cilArrowRight} className="ms-2" />
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>

              <CCardFooter className="text-center py-3 border-0 bg-transparent">
                <div className="text-white-50">
                  Already have an account?{" "}
                  <a href="#/login" className="text-decoration-none" style={{ color: "#a78bfa" }}>
                    Sign In
                  </a>
                </div>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
