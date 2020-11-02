import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContractors } from "../../utils/getContractors";
import { updateConnections } from "../../actions/authActions";



const AddContractorModal = ({ updateConnections, connections, add, user, getContractors }) => {
  const [contractors, setContractors] = useState([]);
  const [selected, setSelected] = useState('')

  useEffect(() => {
    getContractors(setContractors);
    //eslint-disable-next-line
  }, []);
  console.log(connections)
  const onSubmit = e =>{
    add([selected])
    updateConnections(user,selected)     
  }
console.log(connections)
  return (

      <div id="add-contractor-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <form onSubmit={onSubmit}>
        <span>Add a Contractor</span>
        <div className="row">
          <select
            name="selected"
            value={selected}
            className="browser-default"
            onChange={e => setSelected(e.target.value)}
  
          >
            <option value="" disabled>
              Select Contractor{" "}
            </option>

            {contractors && contractors.map((c) => (
      <option key={c._id} value={c._id}>
        {c.name}
      </option>
    ))}
          </select>
        </div>
        </form>
        <div className="modal-footer">
            <a
              href="#!"
              onClick={onSubmit}
              className="waves-effect modal-close green waves-light btn-large"
            >
              <i className="material-icons">add</i>
            </a></div>
      </div>
    </div>

 
    
  );
};
const modalStyle = {
  maxHeight:"50%",
  maxWidth:"50%"

}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { updateConnections, getContractors })(
  AddContractorModal
);
