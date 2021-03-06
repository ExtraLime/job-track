import React, { useEffect } from "react";
import Jobs from "../../components/jobs/Jobs";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import Contractors from "../contractors/Contractors";

const UserDash = () => {
  useEffect(() => M.AutoInit()); //eslint-disable-next-line);

  return (
    <div className="container">
      <div className="row ">
        <div className="col s8">
          <Jobs />
        </div>
        <div className="col s4">
          <Contractors user="user12" />
        </div>
      </div>
    </div>
  );
};

export default UserDash;
