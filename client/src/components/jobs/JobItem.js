import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJob, setCurrent, clearCurrent } from "../../actions/jobActions";
import M from "materialize-css/dist/js/materialize.min.js";

const JobItem = ({ role, job, deleteJob, setCurrent, clearCurrent }) => {


  const onDelete = () => {
    deleteJob(job._id);
    M.toast({ html: "Job Deleted" });
  };

  return (
    <li className="collection-item">
      <ul className="collection">
        {/* title row */}
        <li className="collection-item">
          <a
            href="#edit-job-modal"
            className={`modal-trigger ${
              job.urgent === "on" ? "red-text" : "blue-text"
            }`}
            onClick={() => setCurrent(job)}
          >
            <span className="card-title text-center">{job.title}</span>
          </a>
          <a
            href="#!"
            onClick={onDelete}
            className="btn-floating right red wave-effect waves-light btn-small"
          >
            <i className="material-icons right grey-text">delete</i>
          </a>
          <a
            onClick={() => setCurrent(job)}
            className="btn-floating green right waves-effect waves-light btn-small"
          >
            <i className="material-icons">edit</i>
          </a>
        </li>
        {/* status row */}
        <li className="collection-item">
          Status <span className="new badge green"></span>
        </li>
        <li className="collection-item">          
            Contractor <span>{job.contractor.name ? (
              <div className="chip">
                {/* add from profile later */}
                <img src="images/yuna.jpg" alt="Contact Person"></img>
                {job.contractor.name}
              </div>
            ) : (
              <span className="badge" data-badge-caption="">
                Not yet assigned
              </span>
            )}
          </span>
        </li>
        {/* files row */}
        <li className="collection-item">
          Job Files
          <span className="badge" data-badge-caption="files">
            {job.filesData.length}
          </span>
        </li>
        <li className="collection-item">
          Last Update on{" "}
          <Moment format="MMMM Do YYYY">{job.lastUpdate.date}</Moment>
          <span className="badge" data-badge-caption="">
          by {job.lastUpdate.by}
          </span>
        </li>
      </ul>
    </li>
  );
};
JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  deleteJob: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});
export default connect(mapStateToProps, { deleteJob, setCurrent })(JobItem);
