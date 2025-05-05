import {
    GET_ERROR_ANALYTICS_REQUEST,
    GET_ERROR_ANALYTICS_SUCCESS,
    GET_ERROR_ANALYTICS_FAIL
  } from '../constants/analyticsConstants';
  
  const initialState = {
    loading: false,
    data: {},
    error: null
  };
  
  export const errorAnalyticsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ERROR_ANALYTICS_REQUEST:
        return { ...state, loading: true };
      case GET_ERROR_ANALYTICS_SUCCESS:
        return { loading: false, data: action.payload, error: null };
      case GET_ERROR_ANALYTICS_FAIL:
        return { loading: false, data: {}, error: action.payload };
      default:
        return state;
    }
  };
  