import React, { useRef, useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(""); // storing the uploaded file    // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgress] = useState(0); // progess bar
  const el = useRef(); // accesing input element

  const handleChange = (e) => {
    setProgress(0);
    const file = e.target.files[0]; // accessing file
    console.log(file);
    setFile(file); // storing file
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
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
          path: "/api/jobs" + res.data.path,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    
    //       <div className="file-field input-field">
    //   <div className="btn">
    //     <span>Upload Files</span>
    //     <input name="files" type="file" multiple onChange={uploadFile} />
    //   </div>
    //   <div className="file-path-wrapper">
    //     <input  name='filesData' className="file-path validate"   type="text" placeholder="Upload one or more files"/>
    //   </div>
    // </div>
    <div className='file-field input-field'>
        <div className="btn green"><span>Browse</span>
        <input name='files' type="file" multiple ref={el} onChange={handleChange} />
        </div>
        <div className="file-path-wrapper">
         <input  name='filesData' className="file-path validate" type="text" placeholder="Upload one or more files"/>
      </div>

        <div onClick={uploadFile} className='btn green'><span>Upload</span>
          {" "}
          
        </div>
        {/* displaying received image*/}
        {data.path} 
      </div>

  );
}

export default FileUpload;
