import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, loading, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated
})
export default connect(mapStateToProps)(PrivateRoute);