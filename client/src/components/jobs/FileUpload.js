import React, { useRef, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

const FileUpload = (props) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]); // storing the uploaded file    // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "", _id: "" });
  const [progress, setProgress] = useState(0); // progess bar
  const el = useRef(); // accesing input element
  const [filelist, setFilelist] = useState([]);

  useEffect(() => {
    if (props.fList) {
    }
  });

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
      console.log(files[i]);
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
          getFile({
            name: res.data.name,
            Key: res.data.Key,
            _id: res.data._id,
          });
          fileList.push({
            name: res.data.name,
            Key: res.data.Key,
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
Browse
            <i className="material-icons right">search</i>
          </span>
          <input
            name="files"
            type="file"
            multiple
            // ref={el}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <div className="file-path-wrapper ">
            <input
              name="filesData"
              className="file-path validate dark"
              type="radio"
              value={filelist}
              placeholder="Upload up to 5"
            />
          </div>
        </div> {files ? (
          <p>{files.length} files selected.</p>
        ) : (
          <p>0 files selected</p>
        )}
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
