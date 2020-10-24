import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'


import { connect } from "react-redux";
import { register, loadUser, clearErrors } from "../../actions/authActions";
import { setAlert } from "../../actions/alertsActions";

const Register = (props) => {
  useEffect(() => {
    if (props.isAuthenticated) {
      props.loadUser(props.history);
    }
    if (props.error === "User already exists. Please login.") {
      props.setAlert(props.error, "danger");
      props.clearErrors();
    }
    // eslint-disable-next-line
  }, [props.error, props.isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      props.setAlert("Please fill in all fields", "danger");
    } else if (password !== password2) {
      props.setAlert("Passwords must match", "danger");
    } else {
      props.register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <div className="container">
      <h4>
        Job-Tracker <span className="text-secondary center">Registration</span>
      </h4>
      <form onSubmit={onSubmit} className="form-container">
        <div className="inrow">
          <div className="row input-field">
            <label htmlFor="name">Name</label>
            <input
              className="validate input-field col s12"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required

              // data-length="10"
            />
          </div>
        </div>
        <div className="inrow">
          <div className="row input-field">
            <label htmlFor="email">Email</label>
            <input
              className="validate input-field col s12"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              // data-length="10"
            />
          </div>
        </div>
        <div className="inrow">
          <div className="row input-field">
            <label htmlFor="password">Password</label>
            <input
              className="validate input-field col s12"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="8"
              // data-length="10"
            />
          </div>
        </div>
        <div className="inrow">
          <div className="row input-field">
            <label htmlFor="password2">Confirm Password</label>
            <input
              className="validate input-field col s12"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="8"
              // data-length="10"
            />
          </div>
        </div>

        <button
          type="submit"
          value="Register"
          name="action"
          className="waves-effect waves-light btn-large green"
        >
          Register
        </button>
      </form>
      <span style={{margin:"20px"}}>Already Registered? <Link to='/login'> Login Here</Link></span>
    </div>
  );
};

const styles = {};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, {
  clearErrors,
  setAlert,
  register,
  loadUser,
})(Register);
