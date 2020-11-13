import axios from "axios";
import setAuthToken from '../utils/setAuthToken'
import { Redirect } from 'react-router-dom'
import React from 'react'


import {
  ADD_JOB,
  EDIT_JOB,
  DELETE_JOB,
  SET_CURRENT,
  GET_JOBS,
  CLEAR_CURRENT,
  JOBS_ERROR,
  CLEAR_ERRORS,
  SEARCH_JOBS,
  SET_LOADING
} from "./types";

// GET JOBS FOR GIVEN USER

export const getJobs = () => async (dispatch) => {
    try {
      setLoading();
      const config = {
        headers: {
          "x-auth-token": localStorage.token,
          "Content-Type":"application/json"
        },
      };
      const res = await axios.get("/api/jobs",config);
      const data = await res.data;
      dispatch({
        type: GET_JOBS,
        payload: data,
      });
    } catch (error) {
        console.log(error)
      dispatch({ type: JOBS_ERROR, payload: error });
    }
  };
  
  // Add new job
  export const addJob = (job) => async (dispatch) => {
    

    try {
      setLoading();
      const config = {
        headers: {
          "x-auth-token": localStorage.token,
          "Content-Type": "application/json"
        },
      };
      const res = await axios.post("api/jobs",job,config) 
      dispatch({
        type: ADD_JOB,
        payload: res.data
      });
    } catch (error) {
      dispatch({ type: JOBS_ERROR, payload: error});
    }
  };
  
  // Delete Job from Server
  
  export const deleteJob = (_id) => async (dispatch) => {
    try {
      setLoading();
      const config = {
        headers: {
          "x-auth-token": localStorage.token,
        },
      };
      await axios.delete(`api/jobs/${_id}`, config);
      dispatch({
        type: DELETE_JOB,
        payload: _id,
      });
    } catch (error) {
      dispatch({ type: JOBS_ERROR, payload: error.response.data.msg });
    }
  };
  
  //Set current Job
  
  export const setCurrent = (job) => {
    return {
      type: SET_CURRENT,
      payload: job,
    };
  };
  // Clear Current Job
  export const clearCurrent = () => {
    return {
      type: CLEAR_CURRENT,
    };
  };
  // Update job from Server
   
  export const updateJob = (job) => async (dispatch) => {
    try {
      setLoading();
      console.log(job)
      const config = {
        headers: {
          "Content-Type":"application/json",
          "x-auth-token": localStorage.token,
        } 
      };
      console.log(job._id)
      const res = await axios.put(`api/jobs/${job._id}`,job, config)   
      dispatch({
        type: EDIT_JOB,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: JOBS_ERROR, payload: error.response.data.msg });
    }
  };
  
  // Search Jobs
  export const searchJobs = (text) => async (dispatch) => {
    try {
      setLoading();
      const res = await fetch(`api/jobs?q=${text}`);
      const data = await res.json();
      dispatch({
        type: SEARCH_JOBS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: JOBS_ERROR, payload: error.response.statusText });
    }
  };

   // Search Jobs
   export const searchContractors = (text) => async (dispatch) => {
    try {
      setLoading();
      const res = await fetch(`api/users/contractors?q=${text}`);
      const data = await res.json();
    } catch (error) {
      console.log(error)
    }
  };
  
  // Set Loading to true
  export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };

