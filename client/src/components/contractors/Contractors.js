import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import AddContractorModal from "./AddContractorModal";
import ContractorItem from "../contractors/ContractorItem";

import "materialize-css/dist/css/materialize.min.css";
import ActionButton from "../layout/ActionButton";


const Contractors = ({ user, jobs }) => {
  const [loading,setLoading] = useState(false)
  const [connections, setConnections] = useState([...user.connections]);
  const [contractors, setContractors] = useState([]);

  // creates object job count per connection
  const jobCounts = jobs
    .map((job) => job.contractor)
    .reduce((map, value) => {
      map[value] = (map[value] || 0) + 1;
      return map;
    }, {});

  useEffect(() => {
    setLoading(true)
    setContractors([contractors]);
    setLoading(false)
    // eslint-disable-next-line
  }, [connections]);
  return (
    
    <Fragment>
      
      <AddContractorModal connections={connections} add={setConnections} />
  
      <ul className="collection with-headers">
        
        <li className="collection-header">
          <span>
            <ActionButton
              side="left"
              icon="add people"
              color="green"
              action="#add-contractor-modal"
            />
            <h4 className="center">Contractor List</h4>
          </span>
          {!loading && connections && connections.length ===0 ? (<span className='red-text'>Add a Contractor here</span>):(<p>You have {connections.length} contractor{connections.length ===1?"":"s"}</p>)}
        </li>
        {connections && connections.length > 0 ? (
          connections.map((connection) => (
            <ContractorItem
              key={connection.id}
              contractor={connection}
              counts={jobCounts[connection.id] ? jobCounts[connection.id] : 0}
            />
          ))
        ) : (
          <span className='grey-text'>No Contractors to show!</span>
        )}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  jobs: state.jobs.jobs,
});

export default connect(mapStateToProps, {})(Contractors);
