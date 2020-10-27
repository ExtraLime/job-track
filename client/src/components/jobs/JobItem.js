import React from "react";
import Moment from 'react-moment'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { deleteJob, setCurrent } from '../../actions/jobActions'
import M from 'materialize-css/dist/js/materialize.min.js'



const JobItem = ({ job, deleteJob, setCurrent }) => {

  const onDelete = () => {
    deleteJob(job.id);
    M.toast({ html: "Job Deleted"})
  }
    
  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-job-modal"
          className={`modal-trigger ${
            job.attention ? "red-text" : "blue-text"
          }`}
          onClick={() => setCurrent(job)}
        >
          {job.message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID #{job.id} </span>
           last updated by: <span className="black-text">
            {job.tech}
          </span> on {" "}
          <Moment format="MMMM Do YYYY, h:mm:ss a">{job.date}</Moment>
        </span>
        <a href="#!" onClick={onDelete} className="secondary-content">
            <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};
JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteJob, setCurrent })(JobItem);
