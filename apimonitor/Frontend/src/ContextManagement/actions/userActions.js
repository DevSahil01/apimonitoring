import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
} from "../constants/userConstants.js";

import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: USER_REGISTER_REQUEST });

        console.log(userData)

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post("/api/user/register", userData, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })


    }

    catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }

}


export const LoginUser = (userData) => async (dispatch) => {
    try {

        console.log('requesting user')
        dispatch({ type: USER_LOGIN_REQUEST });

        console.log(userData)

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post("/api/user/login", userData, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })


    }

    catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message
        })
    }

}