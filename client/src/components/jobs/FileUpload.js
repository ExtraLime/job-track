import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

const FileUpload = (props) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]); // storing the uploaded file    // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgress] = useState(0); // progess bar
  const el = useRef(); // accesing input element
  const [filelist, setFilelist] = useState([]);

  const clearUpload = () => {
      setFiles([]);
      setFilelist([])
  }
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
          getFile({
            name: res.data.name,
            path: res.data.path,
          });
          fileList.push({
            name: res.data.name,
            path: res.data.path,
          });
          fileNames.push(res.data.name);
          setFilelist([fileNames]);
        })
        .catch((err) => console.log(err));
    }
    props.getData(fileList);
    setFilelist(fileNames);
    setLoading(false);
    clearUpload();
  };

  return (
    <div className="row">
      <div className="file-field input-field">
        <div className="btn green">
          <span>Browse</span>
          <input
            name="files"
            type="file"
            multiple
            // ref={el}
            onChange={handleChange}
          />
        </div>{" "}
        {files ? (
          <p>{files.length} files selected.</p>
        ) : (
          <p>0 files selected</p>
        )}
       <div className="input-field">
        <div className="file-path-wrapper ">
          <input
            name="filesData"
            className="file-path validate dark"
            type="checkbox"
value={filelist}
            placeholder="Upload up to 5"
          />
        </div>
        </div>
        <div onClick={uploadFiles} className="btn green">
          <span>Upload</span>{" "}
        </div>
      </div>
      
      {/* displaying received image*/}{/*
      <ul className="collection">
        {!loading &&
          filelist[0] &&
          filelist[0].map((file) => (
            <li key={uuid()} className="collection-item">
              <p>{file} <span className="badge green">Ok</span> </p>
            </li>
          ))}
      </ul> */}
    </div>
  );
};

export default FileUpload;