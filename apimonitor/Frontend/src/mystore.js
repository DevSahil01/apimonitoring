import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"

import { newUserReducer, userLoginReducer } from "./ContextManagement/reducers/userreducer";
import { changeState } from "./ContextManagement/reducers/templateReducer";
import { getProjectsReducer, projectRegisterReducer } from "./ContextManagement/reducers/projectReducer";
import { basicAnalyticsReducer } from "./ContextManagement/reducers/basicAnalyticsReducer";
import { performanceAnalyticsReducer } from "./ContextManagement/reducers/performanceAnalyticsReducer";


const reducers = combineReducers({
     userRegister: newUserReducer,
     loggedInUser: userLoginReducer,
     changeState: changeState,
     projectRegisterState: projectRegisterReducer,
     getMyprojects: getProjectsReducer,
     basicAnalytics: basicAnalyticsReducer,
     performanceAnalytics: performanceAnalyticsReducer
});


const middleware = [thunk];

export const myStore = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));






