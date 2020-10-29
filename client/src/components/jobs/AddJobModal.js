import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addJob } from "../../actions/jobActions";
import FileUpload from "./FileUpload";
import { setAlert, removeAlert } from "../../actions/alertsActions";
import Jobs from "./Jobs";

const AddJobModal = ({ addJob, setAlert, removeAlert }) => {
  const [loading, setLoading] = useState('')  
  const [job, setJob] = useState({
    title: "",
    urgent: false,
    dueDate: "",
    time: "Noon",
    content: "",
    filesData: [],
    links: [],
  });

  const onChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
      setLoading(true);
    e.preventDefault();
    if (job.title === "" || job.content === "" || job.dueDate === "") {
      M.toast({ html: "Title, Due Date and Details are Required" });
    } else {
      addJob(job);
    }
    setLoading(false)
  };

  return (
    // Job Title
    <div id="add-job-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>New Job</h4>

        <form onSubmit={onSubmit} className="form-container">
          <div className="row">
            <div className="input-field col s6 m6">
              <input
                type="text"
                name="title"
                value={job.title}
                onChange={onChange}
              />
              <label htmlFor="title">Job Title</label>
            </div>
          </div>{" "}
          {/* Due Date and Time */}
          <div className="row">
            <div className="col s4">
              <input
                type="date"
                value={job.dueDate}
                className="datepiker"
                name="dueDate"
                onChange={onChange}
              />
              <label htmlFor="dueDate">Due Date</label>
            </div>
            {/* Urgent */}
            <div className="switch left">
              <label>
                Normal
                <input type="checkbox" name="urgent" onChange={onChange} />
                <span className="lever"></span>
                Urgent
              </label>
            </div>
          </div>{" "}

          {/* Content */}
          <div className="row">
            <div className="input-field col s12">
              <textarea
                name="content"
                id="content"
                value={job.content}
                className="materialize-textarea"
                onChange={onChange}
              ></textarea>
              <label htmlFor="content">Job Details</label>
            </div>
          </div>
                    {/* displaying job files*/}
                    <ul className="collection">
            {job.filesData.length>0 &&
              job.filesData.map((file) => (
                <li key={file} className="collection-item">
                  <p>
                    {file.name} <span className="badge green">Ok</span>{" "}
                  </p>
                </li>
              ))}
          </ul>
          {/* File Uploads */}
          <FileUpload getData={(data) => setJob({ ...job, filesData: data })} />
          <div className="modal-footer">
            <a
              href="#!"
              onClick={onSubmit}
              className="waves-effect green waves-light btn-large"
            >
              Enter
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
const modalStyle = {
  width: "75%",
  maxHeight: "100%",
};
const mapStateToProps = (state) => ({
  error: state.error,
});
export default connect(mapStateToProps, { addJob, setAlert })(AddJobModal);
