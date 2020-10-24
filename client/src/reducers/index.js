import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertsReducer from "./alertsReducer";


export default combineReducers({
  auth: authReducer,
  alerts: alertsReducer
});
