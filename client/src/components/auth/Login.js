import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { login, loadUser, clearErrors } from "../../actions/authActions";
import { setAlert } from "../../actions/alertsActions";

const Login = ({
  history,
  login,
  loadUser,
  clearErrors,
  error,
  isAuthenticated,
  setAlert,
}) => {
  useEffect(() => {
      loadUser(history);
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
      <h4>
        Account <span className="text-secondary center">Login</span>
      </h4>

      <form onSubmit={onSubmit} className="form-container">
        <div className="inrow">
          <div className="row input-field">
            <label htmlFor="email">Email Address</label>
            <input
              className="input-field col s12"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              data-length="10"
            />
          </div>
        </div>
        <div className="inrow">
          <div className="row input-field">
            <label htmlFor="password">Password</label>
            <input
              className="input-field col s12"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              data-length="10"
            />
          </div>
        </div>

        <button
          type="submit"
          value="Login"
          name="action"
          className="waves-effect waves-light btn-large green"
        >
          Login
        </button>
      </form>
      <span style={{ margin: "20px" }}>
        New Here? <Link to="/register">Register </Link>for free
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alerts,
  error: state.auth.error,
});

export default connect(mapStateToProps, {
  clearErrors,
  login,
  loadUser,
  setAlert,
})(Login);
