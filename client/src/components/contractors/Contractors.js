import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import AddContractorModal from "../layout/AddContractorModal";
import axios from "axios";

import "materialize-css/dist/css/materialize.min.css";
import ActionButton from "../layout/ActionButton";
import { v4 as uuid } from "uuid";
import { getContractors } from "../../utils/getContractors";
import { set } from "mongoose";


const Contractors = ({ user }) => {

  const [connections, setConnections] = useState([...user.connections])
  const [contractors, setContractors] = useState([])
  
  // useEffect(() => {
  //   setContractors([...user.connections,connections])
  // },[connections])
console.log(connections)
console.log(contractors)
  return (
    <Fragment>
      <AddContractorModal connections={connections} add={setConnections}/>
      <ul className="collection with-headers">
        <li className="collection-header">
          <span>
            <ActionButton
              side="left"
              icon="search"
              color="green"
              action="#add-contractor-modal"
            />
            <h4 className="center">Contractor List</h4>
          </span>
        </li>
        {connections && connections.length > 0 ? (
          connections.map((connection) => (
            <li key={connection._id} className="collection-item">{connection.name}</li>
          ))
        ) : (
          <p>No Contractors to Show</p>
        )}
        {/* change to contractors
      {!jobs.loading && jobs.jobs.length === 0 ? (
        <p>No Jobs to show...</p>
      ) : jobs.jobs.msg? (<p>{jobs.jobs.msg}</p>):(
        jobs.jobs.map((job) => <JobItem job={job} key={job._id} />)
      )}  */}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {  })(Contractors);
