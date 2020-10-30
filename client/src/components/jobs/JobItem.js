import React from "react";
import Moment from 'react-moment'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { deleteJob, setCurrent, clearCurrent } from '../../actions/jobActions'
import M from 'materialize-css/dist/js/materialize.min.js'



const JobItem = ({ role ,job, deleteJob, setCurrent, clearCurrent }) => {
console.log(role)

  const onDelete = () => {
    deleteJob(job._id);
    M.toast({ html: "Job Deleted"})
  }
    
  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-job-modal"
          className={`modal-trigger ${
            job.urgent === 'on' ? "red-text" : "blue-text"
          }`}
          onClick={() => setCurrent(job)}
        >
          {job.title}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID #{job._id} </span>
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

const mapStateToProps = state => ({
  role: state.auth.role
})
export default connect(mapStateToProps, { deleteJob, setCurrent })(JobItem);
