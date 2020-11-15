import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContractors } from "../../utils/getContractors";
import { updateConnections } from "../../actions/authActions";

const AddContractorModal = ({
  updateConnections,
  connections,
  add,
  user,
  getContractors,
}) => {
  const [contractors, setContractors] = useState([]);
  const [selected, setSelected] = useState("");
  const [connection, setConnection] = useState("");

  // Set list of contractor to list of contractors in the database
  useEffect(() => {
    getContractors(setContractors);
    // eslint-disable-next-line
  }, []);

  // Match get selected ID's information and set the connection
  const findSelected = () => {
    for (let i = 0; i < contractors.length; i++) {
      if (contractors[i]._id === selected) {
        return {
          name: contractors[i].name,
          email: contractors[i].email,
          _id: contractors[i]._id,
        };
      }
    }
  };
  const onSubmit = (e) => {
    // get connection information
    const newConn = findSelected();
    // update the DB, use add function from props
    // to update state in parent
    updateConnections(user, selected);
    add([...user.connections, newConn]);
    // set selected to null
    setSelected("");
    // window.location.reload()
  };

  return (
    <div id="add-contractor-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <form onSubmit={onSubmit}>
          <span>Add a Contractor</span>
          <div className="row">
          <div className="input-field col s12">
            <select
              name="selected"
              value={selected}
              className="browser-default"
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="" disabled>
                Select Contractor{" "}
              </option>

              {contractors &&
                contractors.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div></div>
        </form>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={onSubmit}
            className="waves-effect modal-close green waves-light btn-large"
          >
            <i className="material-icons">add</i>
          </a>
        </div>
      </div>
    </div>
  );
};
const modalStyle = {
  maxHeight: "50%",
  maxWidth: "50%",
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { updateConnections, getContractors })(
  AddContractorModal
);
