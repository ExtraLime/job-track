import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { login, loadUser, clearErrors } from "../../actions/authActions";
import { setAlert, removeAlert } from "../../actions/alertsActions";

const Login = ({
  history,
  login,
  loadUser,
  clearErrors,
  error,
  isAuthenticated,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      loadUser(history);
    }
    console.log("not");

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({ email, password });
      loadUser(history);
    }
    console.log("Login submit");
  };
  return (
    <div className="container">
      <h1>
        Account <span className="text-secondary center">Login</span>
      </h1>
      <form onSubmit={onSubmit} className="col s12">
        <div className="col s12 m4 l2"></div>
        <div className="row input-field">
          <label htmlFor="email">Email Address</label>
          <input
            className="input-field col s6"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            data-length="10"
          />
        </div>
        <div className="row input-field">
          <label htmlFor="password">Password</label>
          <input
            className="input-field col s6"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            data-length="10"
          />
        </div>
        
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, loadUser })(Login);
