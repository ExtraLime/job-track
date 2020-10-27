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
      const res = await fetch("/jobs");
      const data = await res.json();
      dispatch({
        type: GET_JOBS,
        payload: data,
      });
    } catch (error) {
        
      dispatch({ type: JOBS_ERROR, payload: error });
    }
  };
  
  // Add new job
  export const addJob = (job) => async (dispatch) => {
    try {
      setLoading();
      const res = await fetch("/jobs", {
        method: "POST",
        body: JSON.stringify(job),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({
        type: ADD_JOB,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: JOBS_ERROR, payload: error.response.statusText });
    }
  };
  
  // Delete Job from Server
  
  export const deleteJob = (id) => async (dispatch) => {
    try {
      setLoading();
      await fetch(`/jobs/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: DELETE_JOB,
        payload: id,
      });
    } catch (error) {
      dispatch({ type: JOBS_ERROR, payload: error.response.statusText });
    }
  };
  
  //Set current Job
  
  export const setCurrent = (Job) => {
    return {
      type: SET_CURRENT,
      payload: Job,
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
        await fetch(`/jobs/${job.id}`, {
        method: "PUT",
        body: JSON.stringify(job),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      dispatch({
        type: EDIT_JOB,
        payload: job,
      });
    } catch (error) {
      dispatch({ type: JOBS_ERROR, payload: error.response.statusText });
    }
  };
  
  // Search Jobs
  export const searchJobs = (text) => async (dispatch) => {
    try {
      setLoading();
      const res = await fetch(`/jobs?q=${text}`);
      const data = await res.json();
      dispatch({
        type: SEARCH_JOBS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: JOBS_ERROR, payload: error.response.statusText });
    }
  };
  
  // Set Loading to true
  export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };


