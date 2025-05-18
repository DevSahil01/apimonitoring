// logReducer.js
import {
    LOGS_FETCH_START,
    LOGS_FETCH_SUCCESS,
    LOGS_FETCH_ERROR,
} from './../constants/analyticsConstants.js';

const logReducer = (state = { }, action) => {
    console.log(action.payload)
    switch (action.type) {
        case LOGS_FETCH_START:
            return { ...state, loading: true, error: null };
        case LOGS_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                logs: action.payload,
                error: null,
            };
        case LOGS_FETCH_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default logReducer;
