
import {
    GET_PERFORMANCE_ANALYTICS_REQUEST,
    GET_PERFORMANCE_ANALYTICS_SUCCESS,
    GET_PERFORMANCE_ANALYTICS_FAIL,
  } from "../constants/analyticsConstants";
  
  const initialState = {
    loading: true,
    performance: {
      avgResponseTimes: [],
      slowEndpoints: [],
      timeDistribution: [],
      timeTrend: []
    },
    error: null
  };
  
  export const performanceAnalyticsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PERFORMANCE_ANALYTICS_REQUEST:
        return { ...state, loading: true };
  
      case GET_PERFORMANCE_ANALYTICS_SUCCESS:
        return { 
          loading: false, 
          performance: action.payload,
          error: null
        };
  
      case GET_PERFORMANCE_ANALYTICS_FAIL:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
  
      default:
        return state;
    }
  };