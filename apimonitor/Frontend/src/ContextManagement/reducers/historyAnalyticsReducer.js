import {
  TREND_ANALYTICS_REQUEST,
  TREND_ANALYTICS_SUCCESS,
  TREND_ANALYTICS_FAIL,
} from '../constants/analyticsConstants';

const initialState = {
  loading: false,
  trendData: {},
  error: null,
};

const trendAnalyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TREND_ANALYTICS_REQUEST:
      return { ...state, loading: true };
    case TREND_ANALYTICS_SUCCESS:
      return { ...state, loading: false, trendData: action.payload };
    case TREND_ANALYTICS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default trendAnalyticsReducer;
