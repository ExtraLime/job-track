import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";

import { updateJob, clearCurrent, getJobs } from "../../actions/jobActions";
import { setAlert } from "../../actions/alertsActions";
import { v4 as uuid } from "uuid";
import { Editor } from "@tinymce/tinymce-react";

const AddUpdateModal = ({
  user,
getJobs,
  updateJob,
  setAlert,
  removeAlert,
  current,
}) => {
  const [loading, setLoading] = useState("");
  const [update, setUpdate] = useState("");

  const [job, setJob] = useState({
    updates: [],
  });

  const today = new Date();

  useEffect(() => {
    if (current) {
      setJob(current);
    }
  }, [current]);

  const onSubmit = () => {
    setJob({ ...job, lastUpdate: { by: user._id, date: Date.now() } });
    updateJob(job);
    clearCurrent();
    M.toast({ html: "Update Added" });
  };

  const onSave = (e) => {
    setLoading(true);
    e.preventDefault();
    if (update === "") {
      M.toast({ html: "Please add an update" });
    } else {
      console.log(job);
      setJob({ ...job, updates: [...job.updates, update] });
      console.log(job);
      setUpdate("");
      M.toast({ html: "Document Saved" });
    }

    setLoading(false);
  };
  const onEditorChange = (update, editor) => {
    setUpdate({ by: user._id, date: Date.now(), message: update });
    console.log(update);
  };

  const onClose = () => {
    onSubmit();
    setUpdate("");
    getJobs();
  };

  return (
    // Job Title
    <div id="add-update-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Job Updates</h4>
        {/* displaying job files*/}
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              This job has {job.updates ? job.updates.length : 0} updates
            </div>
            <div className="collapsible-body">
              <div className="collection">
                {job.updates &&
                  job.updates.map((update) => (
                    <div className="collection-item">{update.message}</div>
                  ))}
              </div>
            </div>
          </li>
        </ul>
        <form onSubmit={onSubmit} className="form-container">
          {/* Add Update */}
          {user.role === "contractor" && (
            <div className="row">
              <div className="input-field col s12">
                <Editor
                  outputFormat="text"
                  onEditorChange={onEditorChange}
                  textareaName="update"
                  initialValue="<p>This is the initial content of the editor</p>"
                  value={update}
                  init={{
                    height: 150,
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
                <label htmlFor="update">Add Update</label>
              </div>
            </div>
          )}

          <div className="modal-footer">
            {user.role === "contractor" && (
              <a
                href="#!"
                onClick={onSave}
                className="waves-effect green waves-light btn-large"
              >
                Add Update<i className="material-icons left">add</i>
              </a>
            )}
            <a
              href="#!"
              onClick={onClose}
              className="waves-effect modal-close green waves-light btn-large"
            >
              Close<i className="material-icons left">close</i>
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
  user: state.auth.user,
  current: state.jobs.current,
});
export default connect(mapStateToProps, { clearCurrent, updateJob, getJobs, setAlert })(
  AddUpdateModal
);
