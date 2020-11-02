import axios from "axios";
import setAuthToken from '../utils/setAuthToken'
import { Redirect } from 'react-router-dom'
import React from 'react'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER,
  AUTH_ERROR
} from "./types";

// Load User
export const loadUser = (history) =>  async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  
  try {
    const load = await axios.get('/api/auth')
    dispatch({type:USER_LOADED, payload: load.data})
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
    console.log(error.response.data.msg);
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg,
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
      payload: error.response.data.msg,
    });
  }
};

// Logout
export const logout = () => async(dispatch) => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


export const updateConnections = (user, connection) => async (dispatch) => {
  try {
    console.log(user)
    const config = {
      headers: {
        "Content-Type":"application/json",
        "x-auth-token": localStorage.token,
      } 
    };
    const res = await axios.put(`api/users/${user._id}`,{connection}, config)
      // await fetch(`api/jobs/${job.id}`, {
      // method: "PUT",
      // body: JSON.stringify(job),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      
  
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.msg });
  }
};