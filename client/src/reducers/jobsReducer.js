import {
  GET_JOBS,
  SET_LOADING,
  JOBS_ERROR,
  ADD_JOB,
  DELETE_JOB,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_JOBS,
  EDIT_JOB,
} from "../actions/types";

const initialState = {
  jobs: [],
  current: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case JOBS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
        loading: false,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case EDIT_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
      };
    case SEARCH_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };

    default:
      return state;
  }
};
