import React, { useRef, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

const FileUpload = (props) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]); // storing the uploaded filelist
  const [data, getFile] = useState({ name: "", path: "", _id: "" }); //storing response for each file
  const [progress, setProgress] = useState(0); // progress bar (not using)
  const el = useRef(); // accessing input element
  const [filelist, setFilelist] = useState([]); //set a list of files

  const clearUpload = () => {
    setFiles([]);
    setFilelist([]);
  };
  const handleChange = (e) => {
    setProgress(0);
    const files = e.target.files; // accessing file
    setFiles(files); // storing file
  };

  const uploadFiles = () => {
    setLoading(true);
    const fileList = [];
    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append("file", files[i]); // appending file

      axios
        .post("api/jobs/fileUpload", formData, {
          onUploadProgress: (ProgressEvent) => {
            let progress =
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%";
            setProgress(progress);
          },
        })
        .then((res) => {
          console.log(res);
          getFile({
            name: res.data.name,
            path: res.data.path,
            _id: res.data._id,
          });
          fileList.push({
            name: res.data.name,
            path: res.data.path,
            _id: res.data._id,
          });
          fileNames.push(res.data.name);
          setFilelist([fileNames]);
          props.getData(props.fList ? [...props.fList, ...fileList] : fileList);
        })
        .catch((err) => console.log(err));
    }
    setLoading(false);
    clearUpload();
  };

  return (
    <div className="row">
      <div className="file-field input-field">
        <div className="btn green">
          <span>
            <i className="material-icons right">search</i>Browse
          </span>
          <input name="files" type="file" multiple onChange={handleChange} />
        </div>{" "}
        <div onClick={uploadFiles} className="btn green">
          <span>
            <i className="material-icons right">file_upload</i>Upload
          </span>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
