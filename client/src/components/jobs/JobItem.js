import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteJob, setCurrent } from "../../actions/jobActions";
import M from "materialize-css/dist/js/materialize.min.js";

const JobItem = ({ user, job, deleteJob, setCurrent }) => {
  const contractor =
    user.role === "owner"
      ? user.connections.filter(
          (connection) => connection.id === job.contractor
        )
      : user.connections.filter((connection) => connection.id === job.owner);

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
                job.urgent === 'on' ? "red-text" : "blue-text"
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
            <div className="col s6 valign-wrapper" style={{ justifyContent: "space-between" }}>
              Status: 
              <div>
               {job.status === 'NEW' ? <span data-badge-caption='NEW' className="new badge green"></span>:
               job.status === 'In Progress'? <span data-badge-caption='In Progress' className="new badge orange"></span>:
               <span data-badge-caption='Closed' className="new badge red"></span>}
              {job.urgent === 'on' && (
                <span
                  data-badge-caption="urgent"
                  className="new badge red"
                ></span>
              )}</div>
            </div>
            <div
              className="col s6 valign-wrapper"
              style={{ justifyContent: "space-between" }}
            >
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

        {/* Due Date & counter owner row */}
        <li className="collection-item">
          <div className="row valign-wrapper" style={{ marginBottom: "0px" }}>
            <div className="col s6 valign-wrapper" style={{justifyContent:'space-between'}}>
              Due Date:{" "}
              <span
                className="badge"
                data-badge-caption={job.dueDate.toString().substring(0, 10)}
              ></span>
            </div>

            <div
              className="col s6 valign-wrapper"
              style={{ justifyContent: "space-between" }}
            >
              {user.role === "owner" ? "Contractor:" : "Owner:"}
              <span className="right-align">
                {contractor.length > 0 ? (
                  <div className="chip right">
                    {/* add from profile later */}
                    <img src="https://symbols.getvecta.com/stencil_32/1_user-management.8258f1cffe.svg" style={{marginLeft:'4px',borderRadius:'70%', width:'20px'}} alt=":-)"></img>
                    <span className="truncate">{contractor[0].name}</span>
                  </div>
                ) : (
                  <span
                    className="badge"
                    data-badge-caption="Not yet assigned"
                  ></span>
                )}
              </span>
            </div>
          </div>
        </li>
        {/* counter owner*/}

        <li className="collection-item">
          <div className="row valign-wrapper" style={{ marginBottom: "0px" }}>
          <div className="col s6 left-align valign-wrapper" style={{justifyContent:'space-between'}}>
          Last Update on {" "}
          <Moment className='right-align' format="MMM Do YYYY">{job.lastUpdate.date}</Moment>
                 </div>
            <div className="col s6 valign-wrapper" style={{justifyContent:'space-between'}}>
              Job Files
              <span className="badge" data-badge-caption={job.filesData.length === 1 ?"file":"files"}>
                {job.filesData.length}
              </span>
            </div>
          </div>
        </li>

        {/* updates link row */}
        <li className="collection-item">
          <div className="row" style={{ marginBottom: "0px" }}>
            <a
              href={'#add-update-modal'}
              className={`modal-trigger ${
                job.updates.length >0 ? "black-text" : "grey-text"
              }`}
              onClick={() => setCurrent(job)}
            >
              <span className="center-align card-title text-center">
                <span style={{ margin: "0 0 0 0" }}>{user.role ==='owner' ? ("View"):("Add")} Updates ({job.updates.length})</span>
              </span>
            </a>
          </div>
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
