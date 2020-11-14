import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import { clearCurrent, updateJob } from "../../actions/jobActions";
import { v4 as uuid } from "uuid";
import { Editor } from "@tinymce/tinymce-react";

const ViewJobModal = ({ user, updateJob, clearCurrent, current }) => {
  const [loading, setLoading] = useState("");
  const [job, setJob] = useState({
    title: "",
    urgent: "",
    dueDate: "",
    content: "",
    filesData: [],
    contractor: "",
    status:''
  });

  useEffect(() => {
    if (current) {
      setJob(current);
    }
  }, [current]);

  const onChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (job.title === "" || job.content === "" || job.dueDate === "") {
      M.toast({ html: "Title, Due Date and Details are Required" });
    } else {
      
      setJob({ ...job, lastUpdate: { by: user._id, date: Date.now() } });
      updateJob(job);
      M.toast({ html: "Document Saved" });
    }

    setLoading(false);
  };
  const onClose = (e) => {
    updateJob(job);
    clearCurrent();
  };
  const onEditorChange = (closingNote, editor) => {
    setJob({ ...job, closingNote: closingNote });
  };

  return (
    // Job Title
    <div id="view-job-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>{job.title}</h4>

        <form onSubmit={onSubmit} className="form-container">
          {/* Due Date and Time */}
          <div className="row">
            <div className="col s4">
              Due Date: <span>{job.dueDate.substring(0, 10)}</span>
            </div>
            {/* Urgent */}
            <div className="col s4">
              {job.urgent === "on" && (
                <span
                  data-badge-caption="urgent"
                  className="new badge red left"
                ></span>
              )}
              <span
                data-badge-caption={job.status}
                className={`new badge ${job.status === 'NEW'? 'green':job.status==='In Progress'? 'orange':'red'} left`}
              ></span>
            </div>
            <div className="col s4"></div>
          </div>{" "}
          {/* Content */}
          <div className="row">
            <span>Job Details</span> 
            <div className="input-field col s12 align-right">{job.content}</div>
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
                      <li key={file.Key}>
                        <div key={file.Key} className="collection-item">
                          <a
                            href={`https://bucketeer-129dc88f-2950-47ee-afbc-f78f0fce725d.s3.amazonaws.com/${file.Key}`}
                            download
                          >
                            <span>
                              {file.name}{" "}
                              <span className="badge green">
                                <i className="material-icons">download</i>
                              </span>
                            </span>
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <div className="row">
          <div className="input-field col s6 m6">
                <select onChange={onChange} name="status">
                <option value='' disabled default>
                    Set Status
                  </option>
                  <option value="In Progress" >
                    In Progress
                  </option>
                  <option value="Closed" >
                    Close Job
                  </option>
                </select>
                <label htmlFor="status">Status</label>
              </div>
                    {job.status === "Closed" &&          <div className="row">
            <div className="input-field col s12">
              <Editor
                outputFormat="text"
                onEditorChange={onEditorChange}
                textareaName="closingNote"
                initialValue="Add a closing note"
                value="Add a closing note"
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                }}
              />
              <label className="active" htmlFor="closingNote">
                Closing Note
              </label>
            </div></div>}</div>
          {/* Footer */}
          <div className="modal-footer">
              <a
                href="#!"
                onClick={onSubmit}
                className="waves-effect green waves-light btn-large"
              >
                Update Job
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
  user: state.auth.user,
});
export default connect(mapStateToProps, { updateJob, clearCurrent })(
  ViewJobModal
);
