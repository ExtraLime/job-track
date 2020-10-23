import axios from "axios";
import setAuthToken from '../utils/setAuthToken'
import { Redirect } from 'react-router-dom'
import React from 'react'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "./types";

// const initialState = {
//   token: localStorage.getItem("token"),
//   user: null,
//   isAuthenticated: null,
//   loading: true,
//   error: null,
// };
// const [state, dispatch] = useReducer(authReducer, initialState);
// Load User
export const loadUser = (history) =>  async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  
  try {
    const load = await axios.get('/api/auth')
    dispatch({type:'USER_LOADED', payload: load.data})
    history.push('/')
  } catch (error) {
    console.log(error)
    return <Redirect to='/login'/>
  }}}


// Register User
export const register = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/users", formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    loadUser(history);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/auth", formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });  
    loadUser();
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

// Logout
export const logout = () => async(dispatch) => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


