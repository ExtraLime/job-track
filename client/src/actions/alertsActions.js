import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, type, timeout = 3000) => (dispatch) => {
  
  dispatch({
      type: SET_ALERT,
      payload: { msg, type }
  });

  setTimeout(() => dispatch({ type:REMOVE_ALERT}), timeout)
}

export const removeAlert = () => ({
  type: REMOVE_ALERT,
});
