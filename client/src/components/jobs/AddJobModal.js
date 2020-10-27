import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addJob } from "../../actions/jobActions";
import FileUpload from './FileUpload'
import Jobs from "./Jobs";
import TestUp from './TestUp'


const AddJobModal = ({ addJob, fileUpload }) => {


  const [job, setJob] = useState({
    title: "",
    urgent: false,
    dueDate: '',
    time:'',
    content: "",
    files: [],
    filesData:null,
    links: [],
  });

  const onChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  useEffect(() => {
    console.log(job)

  }, []);

  const handleUpload = (e) => {
    console.log("upload")
      };
  

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // <div id="modal1" class="modal">
    //   <div class="modal-content">
    //     <h4>Modal Header</h4>
    //     <p>A bunch of text</p>
    //   </div>
    //   <div class="modal-footer">
    //     <a href="!#" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    //   </div>
    // </div>

    // Job Title
    <div id="modal1" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>New Job</h4>

        <form onSubmit={onSubmit} className="form-container">
          <div className="row">
            <div className="input-field col s6">
              <input type="text" name="title"  value={job.title} onChange={onChange} />
              <label htmlFor="title">Job Title</label>
            </div>
          </div>{" "}
          {/* Due Date and Time */}
          <div className="row">
            <div className="col s6">
              <input type="date" value={job.dueDate} className="datepiker" name='dueDate' onChange={onChange} />
              <label htmlFor="dueDate">Due Date</label>
            </div>
          </div>{" "}
          <div className="row">
            <div className="input-field col s6">
              <input name='time' type="hour" className="timepicker" value={job.time} onChange={onChange} />
              <label htmlFor="time">Time</label>
            </div>
          </div>{" "}
          {/* Urgent */}
          <div className="switch left">
            <label>
              Normal
              <input type="checkbox" name="urgent" onChange={onChange} />
              <span className="lever"></span>
              Urgent
            </label>
          </div>
          {/* Content */}
          <div className="row">
            <div className="input-field col s12">
              <textarea id="content" className="materialize-textarea" onChange={onChange}></textarea>
              <label htmlFor="content">Job Details</label>
            </div>
          </div>{" "}
          {/* links */}
          <div className="row">
            <div className="input-field col s12 s6">
              <input
                type="text"
                name="links"
                value={job.links}
                onChange={onChange}
              />
              <label htmlFor="links">Links</label>
            </div>
          </div>{" "}
          


          {/* File Uploads */}
          <div className="row">
          <div className="input-field col s12 s6">
          <FileUpload onClick={onChange} value={job.files} />
          </div></div>
          {/* <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                name="files"
                value={job.files}
                onChange={onChange}
              />
              <label htmlFor="files">File Upload</label>
            </div>
          </div>{" "} */}

          {/* <div className="file-field input-field">
      <div className="btn">
        <span>Upload Files</span>
        <input name="files" type="file" multiple onChange={handleUpload} />
      </div>
      <div className="file-path-wrapper">
        <input  name='filesData' className="file-path validate"  onChange={onChange} type="text" placeholder="Upload one or more files"/>
      </div>
    </div> */}


        </form>

<TestUp name='files' onClick={onChange}/>
      </div>
    </div>
  );
};
const modalStyle = {
  width: "75%",
  height: "75%",
};
export default AddJobModal;
