import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    CLEAR_ERRORS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
} from "../constants/userConstants.js"


export const newUserReducer = (state = { LoggedInUser: {} }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                message: action.payload,
                loading: false
            }
        case USER_REGISTER_FAIL:
            return {
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

export const userLoginReducer = (state = { LoggedIn: {} }, action) => {

    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loggedIn: true,
                serverRes: action.payload,
                loading: false
            }
        case USER_LOGIN_FAIL:
            return {
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