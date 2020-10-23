import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { register, loadUser, clearErrors } from "../../actions/authActions";
import { setAlert } from "../../actions/alertsActions";

const Register = (props) => {
  useEffect(() => {
    if (props.isAuthenticated) {
      props.loadUser(props.history);
    }
    // eslint-disable-next-line
  }, [props.isAuthenticated, props.history]);

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
      setAlert("Please fill in all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords must match", "danger");
    } else {
      props.register({
        name,
        email,
        password,
      });
      
    }props.loadUser();
  };
  return (
    <div className="container">
      <h1>
        Account <span className="text-secondary center">Register</span>
      </h1>
      <form onSubmit={onSubmit} className="col s12">
        <div className="row input-field">
          <label htmlFor="name">Name</label>
          <input
            className="input-field col s6"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            data-length="10"
          />
        </div>
        <div className="row input-field">
          <label htmlFor="email">Email</label>
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
            minLength="8"
            data-length="10"
          />
        </div>
        <div className="row input-field">
          <label htmlFor="password2">Confirm Password</label>
          <input
            className="input-field col s6"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="8"
            data-length="10"
          />
        </div>

        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, loadUser })(Register);
