import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const getContractors = () => async (dispatch) => {
    try {
setAuthToken(localStorage.token)
      const res = await axios.get("/api/users/contractors");
      const data = await res.data;
      return data
   
    } catch (error) {
        console.log(error)
     
    }
  };