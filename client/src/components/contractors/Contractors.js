import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import AddContractorModal from "./AddContractorModal";
import ContractorItem from "../contractors/ContractorItem";
import axios from "axios";

import "materialize-css/dist/css/materialize.min.css";
import ActionButton from "../layout/ActionButton";
import { v4 as uuid } from "uuid";

const Contractors = ({ user, jobs }) => {
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
    setContractors([contractors]);

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
              icon="search"
              color="green"
              action="#add-contractor-modal"
            />
            <h4 className="center">Contractor List</h4>
          </span>
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
          <p>No Contractors to Show</p>
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
