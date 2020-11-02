import axios from "axios";

export const getContractors = (setContractors) => async () => {
  axios
    .get("api/users/contractors")
    .then((res) => {
      console.log(res);
      setContractors(res.data);
    })
    .catch((err) => console.log(err));
};
