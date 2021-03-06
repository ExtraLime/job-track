import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DatePicker } from "react-materialize";
import { addJob, clearCurrent, getJobs } from "../../actions/jobActions";
import FileUpload from "./FileUpload";

import { v4 as uuid } from "uuid";
import { Editor } from "@tinymce/tinymce-react";

const AddJobModal = ({ user, addJob, getJobs }) => {
  const [loading, setLoading] = useState("");
  const [jobStatus, setJobStatus] = useState(false);
  const [job, setJob] = useState({
    title: "",
    urgent: "off",
    dueDate: "",
    content: "",
    filesData: [],
    contractor: "",
  });
  const today = new Date();

  const onChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    setJob({
      title: "",
      urgent: "off",
      dueDate: "",
      content: "",
      filesData: [],
      contractor: "",
    });
    setJobStatus(true);
  };

  const setCSelect = (e) => {
    const fullContractor = () => {
      return user.connections.filter(
        (connection) => connection.id === e.target.value
      );
    };
    const temp = fullContractor();
    setJob({ ...job, contractor: { ...temp[0], _id: temp[0].id } });
  };

  const onSave = (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      job.title === "" ||
      job.content === "" ||
      job.dueDate === "" ||
      job.contractor === ""
    ) {
      M.toast({ html: "Title, Due Date, Contractor and Details are Required" });
    } else {
      console.log(job);
      addJob(job);
      M.toast({ html: "Document Saved" });
      onSubmit(e);
    }

    setLoading(false);
  };
  const onEditorChange = (content, editor) => {
    setJob({ ...job, content: content });
  };
  const onUrgent = (e) => {
    job.urgent === "off"
      ? setJob({ ...job, urgent: "on" })
      : setJob({ ...job, urgent: "off" });
    console.log(job);
  };
  const onClose = (e) => {
    setJobStatus(false);
    getJobs();
  };
  return (
    // Job Title
    <div id="add-job-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>New Job</h4>
        <form  className="form-container">
          {/* Title row and contractor select */}
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
            <div className="input-field col s6 m6">
              <select
                onChange={setCSelect}
                value={job.contractor}
                name="cSelect"
              >
                <option key="unique" value="" disabled>
                  Choose a Contractor
                </option>
                {user.connections ? (
                  user.connections.map((connection) => (
                    <option key={connection.id} value={connection.id}>
                      {connection.name}
                    </option>
                  ))
                ) : (
                  <option>
                    <p>You have no contractors</p>{" "}
                  </option>
                )}
              </select>
              <label htmlFor="cSelect">Contractor</label>
            </div>
          </div>{" "}
          {/* Due Date and Time */}
          <div className="row">
            <div className="col s6">
              <DatePicker
                options={{ minDate: today, format: "MM DD YYYY" }}
                type="text"
                className="text"
                label="Due Date"
                name="dueDate"
                readOnly
                value={job.dueDate}
                id="dueDate"
                onChange={(dueDate) => {
                  onChange({
                    target: {
                      name: "dueDate",
                      value: new Date(dueDate).toString(),
                    },
                  });
                }}
              />
            </div>
            {/* Urgent */}
            <div className="switch left">
              <label>
                Normal
                <input
                  type="checkbox"
                  name="urgent"
                  value={job.urgent}
                  onChange={onUrgent}
                  checked={job.urgent === "off" ? false : true}
                />
                <span className="lever"></span>
                Urgent
              </label>
            </div>
          </div>{" "}
          {/* Content */}
          <div className="row">
            <div className="input-field col s12">
              <Editor
                outputFormat="text"
                onEditorChange={onEditorChange}
                textareaName="content"
                initialValue="<p>This is the initial content of the editor</p>"
                value={job.content}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                }}
              />
              <label htmlFor="content">Job Details</label>
            </div>
          </div>
          {/* displaying job files*/}
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">
                This job has {job.filesData.length} files
              </div>
              <div className="collapsible-body">
                <div className="collection">
                  <ul>
                    {job.filesData.map((file) => (
                      <li key={uuid()}>
                        <div className="collection-item">
                          <span>
                            {file.name} <span className="badge green">Ok</span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          {/* File Uploads */}
          <FileUpload getData={(data) => setJob({ ...job, filesData: data })} />
          {/* Save Close and clear job */}
       {!loading &&   <div className="modal-footer">
            {" "}
            {jobStatus ? (
              <a
                href="#!"
                onClick={onClose}
                className="waves-effect modal-close green waves-light btn-large"
              >
                Close<i className="material-icons left">close</i>
              </a>
            ) : (
              <a
                href="#!"
                onClick={onSave}
                className="waves-effect green waves-light btn-large"
              >
                Create Job<i className="material-icons left">add</i>
              </a>
            )}
          </div>}
        </form>
      </div>
    </div>
  );
};
AddJobModal.propTypes = {
  user: PropTypes.object.isRequired,
  addJob: PropTypes.func.isRequired,
  getJobs: PropTypes.func.isRequired,
};

const modalStyle = {
  width: "75%",
  maxHeight: "100%",
};
const mapStateToProps = (state) => ({
  error: state.error,
  user: state.auth.user,
});
export default connect(mapStateToProps, { getJobs, clearCurrent, addJob })(
  AddJobModal
);
