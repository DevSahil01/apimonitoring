import {
    GET_BASIC_ANALYTICS_REQUEST,
    GET_BASIC_ANALYTICS_SUCCESS,
    GET_BASIC_ANALYTICS_FAIL,
  } from "../constants/analyticsConstants.js";
  

export const basicAnalyticsReducer = (state = { loading: true, data: {} }, action) => {
    switch (action.type) {
      case GET_BASIC_ANALYTICS_REQUEST:
        return { loading: true };
  
      case GET_BASIC_ANALYTICS_SUCCESS:
        return { loading: false, data: action.payload };
  
      case GET_BASIC_ANALYTICS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  