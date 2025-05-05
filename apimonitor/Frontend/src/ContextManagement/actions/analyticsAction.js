import axios from "axios";
import {
  GET_BASIC_ANALYTICS_REQUEST,
  GET_BASIC_ANALYTICS_SUCCESS,
  GET_BASIC_ANALYTICS_FAIL,
  GET_PERFORMANCE_ANALYTICS_REQUEST,
  GET_PERFORMANCE_ANALYTICS_SUCCESS,
  GET_PERFORMANCE_ANALYTICS_FAIL,
  GET_ERROR_ANALYTICS_REQUEST,
  GET_ERROR_ANALYTICS_SUCCESS,
  GET_ERROR_ANALYTICS_FAIL
} from "../constants/analyticsConstants.js";

export const getBasicAnalytics = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BASIC_ANALYTICS_REQUEST });

    const { data } = await axios.get("/api/analytics/basic", {
      withCredentials: true,
    });

    dispatch({
      type: GET_BASIC_ANALYTICS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_BASIC_ANALYTICS_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};


export const getPerformanceAnalytics = (period = 'today', threshold = 500) => async (dispatch) => {
  try {
    dispatch({ type: GET_PERFORMANCE_ANALYTICS_REQUEST });

    const { data } = await axios.get("/api/analytics/performance", {
      params: { period, threshold },
      withCredentials: true,
    });

    dispatch({
      type: GET_PERFORMANCE_ANALYTICS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_PERFORMANCE_ANALYTICS_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const getErrorAnalytics = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ERROR_ANALYTICS_REQUEST });

    const { data } = await axios.get(`/api/analytics/error/${projectId}`, {
      withCredentials: true
    });

    dispatch({
      type: GET_ERROR_ANALYTICS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_ERROR_ANALYTICS_FAIL,
      payload: error.message || 'Failed to fetch error analytics'
    });
  }
};