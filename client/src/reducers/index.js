import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from "./uiReducer";
import alertsReducer from "./alertsReducer";


export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  alerts: alertsReducer
});
