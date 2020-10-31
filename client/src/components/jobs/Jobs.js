import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getJobs } from "../../actions/jobActions";
import JobItem from "./JobItem";
import "materialize-css/dist/css/materialize.min.css";
import ActionButton from "../layout/ActionButton";
import { v4 as uuid } from "uuid";
import AddJobModal from "../jobs/AddJobModal";
import EditJobModal from "../jobs/EditJobModal";

const Jobs = ({ jobs, getJobs }) => {
  useEffect(() => {
    getJobs();
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <AddJobModal />
      <EditJobModal />
      <ul className="collection with-headers">
        <li className="collection-header">
        <ActionButton icon='add' side="right" color="green" action="#add-job-modal" />
          <span>            
            <h4 className="center">Jobs</h4>
          </span>
        </li>
        {!jobs.loading && jobs.jobs.length === 0 ? (
          <p>No Jobs to show...</p>
        ) : jobs.jobs.msg ? (
          <p>{jobs.jobs.msg}</p>
        ) : (
          jobs.jobs.map((job) => <JobItem job={job} key={job._id} />)
        )}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  jobs: state.jobs,
});

export default connect(mapStateToProps, { getJobs })(Jobs);
