import axios from 'axios'



export const updateConnections = (user) => async (dispatch) => {
    try {
      console.log(user)
      const config = {
        headers: {
          "Content-Type":"application/json",
          "x-auth-token": localStorage.token,
        } 
      };
      const res = await axios.put(`api/users/${user._id}`,user, config)
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