import {
     PROJECT_REGISTER_FAIL,
     PROJECT_REGISTER_SUCCESS,
     PROJECT_REGISTER_REQUEST,
     GET_PROJECTS_REQUEST,
     GET_PROJECTS_SUCCESS,
     GET_PROJECTS_FAIL
} from '../constants/projectConstants.js'
import {
     CLEAR_ERRORS
} from '../constants/userConstants.js'


export const projectRegisterReducer = (state = { isRegistered: {} }, action) => {

     switch (action.type) {
          case PROJECT_REGISTER_REQUEST:
               return {
                    ...state,
                    loading: true
               }
          case PROJECT_REGISTER_SUCCESS:
               return {
                    registerResponse: action.payload,
                    loading: false,
               }
          case PROJECT_REGISTER_FAIL:
               return {
                    ...state,
                    loading: false,
                    error: action.payload
               }
          case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null
               }
          default:
               return state;
     }
}      

export const getProjectsReducer = (state = { projects : [] },action)=>{
     
      switch (action.type){
           case GET_PROJECTS_REQUEST:
                return {
                     ...state,
                     loading:true
                }
           case GET_PROJECTS_SUCCESS:
                return {
                     ...state,
                     loading:false,
                     projects:action.payload
                }
           case GET_PROJECTS_FAIL:
                return {
                     loading : false,
                     error: action.payload,
                }
           case CLEAR_ERRORS:
               return {
                    ...state,
                    error: null
               }
          default:
               return state;
      }
}