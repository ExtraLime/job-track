import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearCurrent, updateJob } from "../../actions/jobActions";
import FileUpload from "./FileUpload";
import { setAlert, removeAlert } from "../../actions/alertsActions";
import {v4 as uuid } from 'uuid'

const EditJobModal = ({ user, updateJob,clearCurrent, current }) => {
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

  useEffect(() =>{
      if(current){
          setJob(current)
      }
  },[current])
  const onSave = (e) => {
    setJob({...job})
    
 }

  const onChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
      setLoading(true);
    e.preventDefault();
    if (job.title === "" || job.content === "" || job.dueDate === "") {
      M.toast({ html: "Title, Due Date and Details are Required" });
    } else {
      const date = Date.now();
      setJob({...job, lastUpdate: {by: user._id, date:Date.now()}})
      updateJob(job);
      M.toast({ html: "Document Saved" });
    }
    
    setLoading(false)

  };
  const onClose = (e) => {
    updateJob(job);
    clearCurrent();
  }

  return (
    // Job Title
    <div id="edit-job-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit Job</h4>

        <form onSubmit={onSubmit} className="form-container">
          <div className="row">
            <div className="input-field col s6 m6">
              <input
                type="text"
                name="title"
                value={job.title}
                onChange={onChange}
              />
              <label className='active' htmlFor="title">Job Title</label>
            </div>
          </div>{" "}
          {/* Due Date and Time */}
          <div className="row">
            <div className="col s4">
              <input
                type="date"
                value={job.dueDate.toString()}
                className="datepiker"
                name="dueDate"
                onChange={onChange}
              />
              <label className='active' htmlFor="dueDate">Due Date</label>
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
              <label className='active' htmlFor="content">Job Details</label>
            </div>
          </div>



                    {/* displaying job files*/}                    
            <ul className='collapsible'>
              <li>
                <div className="collapsible-header">
                  This job has {job.filesData.length} files
                </div>
                <div className="collapsible-body">
                  <div className="collection">
                  <ul>{job.filesData.map((file) => ( 
                    <li key={uuid()} >
                      <div className="collection-item">
                            <span>{file.name} <span className="badge green">Ok</span></span>
                      </div>
                    </li>))}                
                </ul></div>
                </div>                
              </li>

          </ul>

          {/* File Uploads */}
          <FileUpload fList={job.filesData} getData={(data) => setJob({ ...job, filesData: data })} />
          <div className="modal-footer">
            <a
              href="#!"
              onClick={onSubmit}
              className="waves-effect green waves-light btn-large"
            >
              Save Job
            </a>
            <a
              href="#!"
              onClick={onClose}
              className="waves-effect modal-close green waves-light btn-large"
            >
              Job List
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
const modalStyle = {
  width: "75%",
  maxHeight: "75%",
};
const mapStateToProps = (state) => ({
  error: state.error,
  current: state.jobs.current,
  user: state.auth.user
});
export default connect(mapStateToProps, { updateJob, clearCurrent })(EditJobModal);
