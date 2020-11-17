import React, { useState } from "react";
import axios from "axios";

const FileUpload = (props) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]); // storing the uploaded file    // storing the recived file from backend
  const [progress, setProgress] = useState(0); // progress bar
  const [filelist, setFilelist] = useState([]); // 

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
// call the api with each file then call getData function props push file into state
console.log(formData)
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
    setProgress('0%')
    clearUpload();
  };

  return (
    <div className="row">
        <div className="progress" style={{width:`${progress}`}}>${progress}
      <div className="determinate" ></div>
  </div>
      <div className="file-field input-field">
        <div className="btn green">
          <span>
            Browse
            <i className="material-icons right">search</i>
          </span>
          <input name="files" type="file" multiple onChange={handleChange} />
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
        </div>{" "}
        {!loading && files ? (
          <p>
            {files.length === 1
              ? `${files.length} file`
              : `${files.length} files`}{" "}
            selected.
          </p>
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
