import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJob, setCurrent, clearCurrent } from "../../actions/jobActions";
import M from "materialize-css/dist/js/materialize.min.js";

const JobItem = ({ user, job, deleteJob, setCurrent, clearCurrent }) => {
  const contractor =
    user.role === "owner"
      ? user.connections.filter(
          (connection) => connection.id === job.contractor
        )
      : user.connections.filter((connection) => connection.id === job.owner);
  console.log(contractor);
  const onDelete = () => {
    deleteJob(job._id);
    M.toast({ html: "Job Deleted" });
  };

  return (
    <li className="collection-item">
      <ul className="collection">
        {/* title row */}
        <li className="collection-item">
          <div className="row" style={{ marginBottom: "0px" }}>
            <a
              href={`#${user.role === "owner" ? "edit" : "view"}-job-modal`}
              className={`modal-trigger ${
                job.urgent ? "red-text" : "blue-text"
              }`}
              onClick={() => setCurrent(job)}
            >
              <span className="center-align card-title text-center">
                <h5 style={{ margin: "0 0 0 0" }}>{job.title}</h5>
              </span>
            </a>
          </div>
        </li>

        {/* status and actions row */}
        <li className="collection-item">
          <div className="row" style={{ marginBottom: "0px" }}>
            <div className="col s6">
              Status: <span className="new badge green"></span>
              {job.urgent && (
                <span
                  data-badge-caption="urgent"
                  className="new badge red"
                ></span>
              )}
            </div>
            <div className="col s6">
              Actions:{" "}
              <span>
                {user.role === "owner" && (
                  <a
                    href="#!"
                    onClick={onDelete}
                    className="btn-floating right red wave-effect waves-light btn-small"
                  >
                    <i className="material-icons">delete</i>
                  </a>
                )}
                <a
                  onClick={() => setCurrent(job)}
                  className="modal-trigger right btn-floating green waves-effect waves-light btn-small"
                  href={`#${user.role === "owner" ? "edit" : "view"}-job-modal`}
                >
                  <i className="material-icons">{`${
                    user.role === "owner" ? "edit" : "search"
                  }`}</i>
                </a>
              </span>
            </div>
          </div>
        </li>

        {/* status row */}
        <li className="collection-item">
          <div className="row valign-wrapper" style={{ marginBottom: "0px" }}>
            <div className="col s6">
              Due Date:{" "}
              <span
                className="badge"
                data-badge-caption={job.dueDate.toString().substring(0, 10)}
              ></span>
            </div>
            <div className="col s6 valign-wrapper">
            {user.role === "owner" ? "Contractor" : "Owner"}
            <span className='right-align'>
              {contractor.length > 0 ? (
                <div className="chip right">
                  {/* add from profile later */}
                  <img src="images/yuna.jpg" alt=":-)"></img>
                  {contractor[0].name}
                </div>
              ) : (
                <span className="badge" data-badge-caption="">
                  Not yet assigned
                </span>
              )}
            </span>
            </div>
          </div>
        </li>
        {/* counter owner*/}

        <li className="collection-item">
          <div className="row" style={{ marginBottom: "0px" }}>

          </div>
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
          <Moment format="MMM Do YY">{job.lastUpdate.date}</Moment>
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
  user: state.auth.user,
});
export default connect(mapStateToProps, { deleteJob, setCurrent })(JobItem);
