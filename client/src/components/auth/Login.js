import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login, loadUser, clearErrors } from '../../actions/authActions'
import { setAlert, removeAlert } from '../../actions/alertsActions'

const Login = ({history,login, loadUser, clearErrors, error, isAuthenticated}) => {
    useEffect(() => {
        if(!isAuthenticated){
          loadUser(history)
        }  console.log("not") 
  
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
        if( email === '' || password === ''){
            setAlert("Please fill in all fields", 'danger')
        } else {
            login({email, password}, history)
        }
        console.log("Login submit");
      };
      return (
        <div className="form-container">
          <h1>
            Account <span className="text-primary">Login</span>
            <form onSubmit={onSubmit} >
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
              />
            </form>
          </h1>
        </div>
      );
    };

    const mapStateToProps = (state) => ({
      
      isAuthenticated: state.auth.isAuthenticated
      
      });



export default connect(mapStateToProps,{ login, loadUser }) (Login)