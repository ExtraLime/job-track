import React, { Fragment, useEffect } from "react";

import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import Dashboard  from '../layout/Dashboard'

const Home = (props) => {
    useEffect(() => {
        if(!props.isAuthenticated || props.user.role === '' ){
            props.logout();
        }
    });
  return (
    <Fragment>
      <Dashboard />
      </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Home);
