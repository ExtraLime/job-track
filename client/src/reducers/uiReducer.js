import { SET_ALERT, SET_LOADING, CLEAR_ERRORS } from "../actions/types";
const initialState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
