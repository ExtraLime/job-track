import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ContractorItem = ({ contractor, counts }) => {
  return (
    <li key={contractor.id} className="collection-item">
      <div className="row" style={{ marginBottom: "0px" }}>
        <span className="black-text">{contractor.name} </span>{" "}
      </div>
      <div className="row" style={{ marginBottom: "0px" }}>
        {" "}
        <div className="col s10 grey-text left-align">
          Total jobs with you:{" "}
        </div>
        <div className="col s2 black-text right-align">{counts}</div>
      </div>
      <div className="row" style={{ marginBottom: "0px" }}>
        {" "}
        <div className="col s6 grey-text left-align">Contact: </div>
        <div className="col s6 black-text right-align">{contractor.email}</div>
      </div>
      <div
        className="row valign-wrapper center-align"
        style={{ marginBottom: "0px" }}
      >
        <div className="col s12 center-align">
          <a
            disabled
            href="#!"
            onClick={console.log("poof")}
            className="secondary-content"
          >
            <i className="material-icons center grey-text">person</i>
          </a>
        </div>
      </div>
    </li>
  );
};

ContractorItem.propTypes = {
  contractor: PropTypes.object.isRequired,
  counts: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});
export default connect(mapStateToProps)(ContractorItem);
