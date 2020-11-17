import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUser } from "../../actions/authActions";
import M from "materialize-css/dist/js/materialize.min.js";




const Profile = ({ user, updateUser }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    userAvatar: "",
    email: "",
    username: "",
    phone:''
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
      setLoading(true);
      e.preventDefault();
      if (userData.name === ''|| userData.email === ''){
        M.toast({ html: "Name and Email Must be filled out" });
      }else{
          updateUser(user,userData);
          M.toast({ html: "Profile Updated" });

      }
      setLoading(false)
  }
  console.log(userData);
  return (
    <div className="container" >
      <span style={{ margin: "100px" }} className="green-text">
        Update your Profile
      </span>
      <div className="form-container" ></div>
{/* User Avatar */}
      <div className="row" style={{ justifyContent:'center' }}>
          <div className="col s4 offset-s4">
        <img
          className="materialboxed center-align"
          alt='userAvatar'
          style={{ borderRadius: "50%" }}
          width="225"
          src={userData.userAvatar}
        ></img>
        <i className="material-icons">photo</i>
      </div></div>
{/* User Name */}
      <div className="row">
        <input
          className="validate input-field col s4 offset-s4"
          type="text"
          name="name"
          value={userData.name}
          onChange={onChange}
          required

          // data-length="10"
        />
        <label htmlFor="name">Name</label>
      </div>
{/* User Email */}
      <div className="row">
        <input
          className="validate input-field col s4 offset-s4"
          type="email"
          name="email"
          value={userData.email}
          onChange={onChange}
          required

          // data-length="10"
        />
        <label htmlFor="name">Email</label>
      </div>
      {/* User Phone */}
      <div className="row">
        <input
          className="validate input-field col s4 offset-s4"
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={onChange}
          pattern="[0-9]{10}"
        />
        <label htmlFor="phone">Phone</label>
      </div>

      <div className="row">
        <input
          className="validate input-field col s4 offset-s4"
          type="text"
          name="username"
          value={userData.username}
          onChange={onChange}
          required

          // data-length="10"
        />
        <label className='active' htmlFor="username">Choose a User Name</label>
      </div>
      {!loading &&             <a
              href="#!"
              onClick={onSubmit}
              className="waves-effect green waves-light btn-large"
            >
              Update Info
            </a>}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUser })(Profile);
