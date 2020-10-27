import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertsReducer from "./alertsReducer";
import jobsReducer from "./jobsReducer";



export default combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  jobs: jobsReducer
});
