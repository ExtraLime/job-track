import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (message) => ({
  type: SET_ALERT,
  payload: message,
});

export const removeAlert = () => ({
  type: REMOVE_ALERT,
});
