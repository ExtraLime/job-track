import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import { clearCurrent, updateJob } from "../../actions/jobActions";
import FileUpload from "./FileUpload";
import { DatePicker } from "react-materialize";
import { Editor } from "@tinymce/tinymce-react";


const EditJobModal = ({ user, updateJob, clearCurrent, current }) => {

  const [loading, setLoading] = useState("");
  const [job, setJob] = useState({
    title: "",
    urgent: "",
    dueDate: "",
    content: "",
    filesData: [],
    contractor: "",
  });

  const today = new Date();

  useEffect(() => {
    if (current) {
      setJob(current);
    }
  }, [current]);

  const setCSelect = (e) => {
    const fullContractor = () => {
      return user.connections.filter(
        (connection) => connection.id === e.target.value
      );
    };
    const temp = fullContractor();
    setJob({ ...job, contractor: { ...temp[0], _id: temp[0].id } });
  };
  const onChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (job.title === "" || job.content === "" || job.dueDate === "") {
      M.toast({ html: "Title, Due Date and Details are Required" });
    } else {
      const date = Date.now();
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
  const onUrgent = (e) => {
    job.urgent === 'off' ?
    setJob({ ...job, urgent: 'on' }):
    setJob({ ...job, urgent: 'off' })
    console.log(job)
  };
  const onEditorChange = (content, editor) => {
    setJob({ ...job, content: content });
  };

  return (
    // Job Title
    <div id="edit-job-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit Job</h4>

        <form onSubmit={onSubmit} className="form-container">
          {/* Title Row */}
          <div className="row">
            <div className="input-field col s6 m6">
              <input
                type="text"
                name="title"
                value={job.title}
                onChange={onChange}
              />
            </div>
            {user.role === "owner" && (
              <div className="input-field col s6 m6">
                <select onChange={setCSelect} name="cSelect">
                  <option value="" disabled>
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
            )}
          </div>{" "}
          {/* Due Date and Time */}
          <div className="row">
            <div className="col s6">
              <DatePicker
                options={{ minDate: today }}
                type="text"
                className="text"
                label="Due Date"
                name="dueDate"
                value={(job.dueDate = "" ? job.dueDate : job.dueDate)}
                id="dueDate"
                onChange={(dueDate) => {
                  onChange({
                    target: {
                      name: "dueDate",
                      value: new Date(dueDate),
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
                  
                  checked={job.urgent==='off'? (false):(true)}
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
                    "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                }}
              />
              <label className="active" htmlFor="content">
                Job Details
              </label>
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
          {/* File Uploads */}
          <FileUpload
            fList={job.filesData}
            getData={(data) => setJob({ ...job, filesData: data })}
          />
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
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  updateJob,
  clearCurrent,
})(EditJobModal);
