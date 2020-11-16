import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { register, loadUser, clearErrors } from "../../actions/authActions";
import { setAlert } from "../../actions/alertsActions";

const Register = (props) => {
let refreshes = 1;

useEffect(()=>{
  if(refreshes>0){
    window.location.reload()
    refreshes --
  }
  // eslint-disable-next-line
},[])


  useEffect(() => {
    if (props.isAuthenticated) {
      console.log(props.history)
      props.loadUser(props.history);
    }
    if (props.error === "User already exists. Please login.") {
      props.setAlert(props.error, "danger");
      props.clearErrors();
    }

    // eslint-disable-next-line
  }, [props.error, props.isAuthenticated, props.history]);
  console.log(props.history)
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    password2: "",
    role: "owner",
    connections: [],
  });
  const { name, email, role, password, password2, connections } = user;

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
        role,
        connections,
      });
    }
  };
  return (
    <div className="container">

          <select>
            <option value="" disabled selected>Choose your option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <label>Materialize Select</label>
       
    
 
    </div>
    // <div className="container">
    //   <h4>
    //     Job-Tracker <span className="text-secondary center">Registration</span>
    //   </h4>
    //   <form onSubmit={onSubmit} className="form-container">
    //     <div className="row">
    //       <div className="input-field col s5 offset-s4">
    //         <select
    //           name="role"
    //           value={role}
    //           className="input-field col s4 offset-s4"
    //           onChange={(e) =>
    //             setUser({ ...user, [e.target.name]: e.target.value })
    //           }
    //         >
    //           <option selected value="" disabled>
    //             Choose Account Type
    //           </option>
    //           <option value="owner">User </option>
    //           <option value="contractor">Contractor </option>
    //         </select>
    //         <label htmlFor="role">Choose Account Type</label>
    //       </div>
    //     </div>

    //     <div className="inrow">
    //       <div className="row input-field">
    //         <label htmlFor="name">Name</label>
    //         <input
    //           className="validate input-field"
    //           type="text"
    //           name="name"
    //           value={name}
    //           onChange={onChange}
    //           required

    //           // data-length="10"
    //         />
    //       </div>
    //     </div>
    //     <div className="inrow">
    //       <div className="row input-field">
    //         <label htmlFor="email">Email</label>
    //         <input
    //           className="validate input-field col s12"
    //           type="email"
    //           name="email"
    //           value={email}
    //           onChange={onChange}
    //           required
    //           // data-length="10"
    //         />
    //       </div>
    //     </div>
    //     <div className="inrow">
    //       <div className="row input-field">
    //         <label htmlFor="password">Password</label>
    //         <input
    //           className="validate input-field col s12"
    //           type="password"
    //           name="password"
    //           value={password}
    //           onChange={onChange}
    //           required
    //           minLength="8"
    //           // data-length="10"
    //         />
    //       </div>
    //     </div>
    //     <div className="inrow">
    //       <div className="row input-field">
    //         <label htmlFor="password2">Confirm Password</label>
    //         <input
    //           className="validate input-field col s12"
    //           type="password"
    //           name="password2"
    //           value={password2}
    //           onChange={onChange}
    //           required
    //           minLength="8"
    //           // data-length="10"
    //         />
    //       </div>
    //     </div>

    //     <button
    //       type="submit"
    //       value="Register"
    //       name="action"
    //       className="waves-effect waves-light btn-large green"
    //     >
    //       Register
    //     </button>
    //   </form>
    //   <span style={{ margin: "20px" }}>
    //     Already Registered? <Link to="/login"> Login Here</Link>
    //   </span>
    // </div>
  );
};

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
