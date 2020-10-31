import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import SearchBarModal from '../layout/SearchBarModal'

import "materialize-css/dist/css/materialize.min.css";
import ActionButton from "../layout/ActionButton";
import { v4 as uuid } from "uuid";
import { getContractors } from '../../actions/jobActions'

const Contractors = ({getContractors, user }) => {
  const cList = getContractors();
  console.log(cList)
  useEffect(()=>{
    const list1 = getContractors();
    //eslint-disable-next-line
  },[])


  console.log(user);
  console.log(cList);

  return (
      
    <Fragment>
<SearchBarModal />
      <ul className="collection with-headers">
        <li className="collection-header">
          <span><ActionButton side='left' icon="search" color="green" action="#search-modal" />
            <h4 className="center">Contractor List</h4>
            
          </span>
        </li>
        {user.contractors && user.contractors.length > 0 ? (
          user.contractors.map((contractor) => (
            <li className="collection-item">{user.contractor.id}</li>
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

export default connect(mapStateToProps, { getContractors })(Contractors);
