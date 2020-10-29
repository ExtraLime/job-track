import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getJobs } from "../../actions/jobActions";
import JobItem from "./JobItem";
import "materialize-css/dist/css/materialize.min.css";
import ActionButton from '../layout/ActionButton'


const Jobs = ({ jobs, getJobs }) => {
  useEffect(() => {
    getJobs();
    //eslint-disable-next-line
  }, []);
  return (
    <ul className="collection with-headers">
      
      <li className="collection-header">
        <span><ActionButton type="jobs" color="green" action="#add-job-modal" />
          <h4 className="center">Jobs</h4>
        </span>
      </li>
      {!jobs.loading && jobs.jobs.length === 0 ? (
        <p>No Jobs to show...</p>
      ) : jobs.jobs.msg? (<p>{jobs.jobs.msg}</p>):(
        jobs.jobs.map((job) => <JobItem job={job} key={job.id} />)
      )}
    </ul>
  );
};


const mapStateToProps = (state) => ({
  user: state.auth.user,
  jobs: state.jobs,
});

export default connect(mapStateToProps, { getJobs })(Jobs);
