import {
    PROJECT_REGISTER_REQUEST,
    PROJECT_REGISTER_SUCCESS,
    PROJECT_REGISTER_FAIL
    , GET_PROJECTS_REQUEST,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAIL,
    SET_CURRENT_PROJECT,
    SET_CURRENT_PROJECT_FAIL
} from '../constants/projectConstants.js';

import axios from 'axios';


const config = {
    withCredentials: true
}

export const registerProject = (projectData) => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_REGISTER_REQUEST });

        // const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];



        const { data } = await axios.post('/api/projects/register', projectData, {
            withCredentials: true
        });

        dispatch({
            type: PROJECT_REGISTER_SUCCESS,
            payload: data
        })

        console.log(data);


    }
    catch (err) {

        dispatch({
            type: PROJECT_REGISTER_FAIL,
            payload: err
        })
    }
}

export const getProjects = () => async (dispatch) => {

    try {

        dispatch({ type: GET_PROJECTS_REQUEST });

        const { data } = await axios.get("/api/projects/getprojects", {
            withCredentials: true,
        });

        console.log(data)

        dispatch({
            type: GET_PROJECTS_SUCCESS,
            payload: data
        })
    }
    catch (err) {
        dispatch({
            type: GET_PROJECTS_FAIL,
            paylaod: err
        })
    }

}


export const changeCurrentProject = (projectID) => async (dispatch) => {
    try {
        dispatch({
            type: SET_CURRENT_PROJECT,
            payload: projectID
        });

    }
    catch (err) {
        dispatch({
            type: SET_CURRENT_PROJECT_FAIL,
            payload: err
        })
    }
}