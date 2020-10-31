import React, { useRef,useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchContractors } from "../../actions/jobActions";
import { getContractors } from "../../utils/getContractors";

const SearchBarModal = ({ getContractors, searchContractors }) => {

  const text = useRef("");

  const onChange = (e) => {
    searchContractors(text.current.value);
  };
  return (
    <div id="search-modal" className="modal">
      <div className="modal-content">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search for Contractors"
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getContractors, searchContractors })(
  SearchBarModal
);
