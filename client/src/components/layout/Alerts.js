import React, { useContext } from "react";
import { connect } from 'react-redux'

const Alerts = (props) => {
  
  return (
    props.alerts &&
    props.alerts.map((alert) => (
        <div className="alertRow">
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle">{alert.msg}</i>
      </div></div>
    ))
  );
};
const mapStateToProps = (state) => ({
error: state.auth.error,
alerts: state.alerts

})

export default connect(mapStateToProps)(Alerts);