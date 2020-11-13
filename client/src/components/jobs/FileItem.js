import React from "react";
import { connect } from 'react-redux';


const FileItem = (file) => {

    const genDl = (key) => {
        
    }
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
const mapStateToProps = ({
    user: state.auth.user
})

export default connect(mapStateToProps, {genDl})(FileItem);
