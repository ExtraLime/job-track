import React from "react";

const FileItem = (file) => {
  return (
    <li key={file._id}>
      <div className="collection-item">
       <a href='!#' ><span>
          {file.name} <span className="badge green">Ok</span>
        </span></a>
      </div>
    </li>
  );
};

export default FileItem;
