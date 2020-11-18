import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUser } from "../../../actions/authActions";
import M from "materialize-css/dist/js/materialize.min.js";
import axios from "axios";

const Profile = ({ user, updateUser }) => {
  const [loading, setLoading] = useState(null);
  const [avatar, setAvatar] = useState({ raw: "", preview: "" });
  const [userData, setUserData] = useState({
    name: "",
    userAvatar: "",
    email: "",
    username: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
    // eslint-disable-next-line
  }, []);
  console.log(avatar);
  const handleImgChange = (e) => {
    const image = e.target.files[0]; // accessing file
    if (image) {
      setAvatar({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    } // storing file in state, to preview and to upload

    console.log(avatar);
  };

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (userData.name === "" || userData.email === "") {
      M.toast({ html: "Name and Email Must be filled out" });
    } else if (avatar.raw != "") {
      setLoading(true);
        const formData = new FormData();
        formData.append("file", avatar.raw);
        console.log(formData);
        console.log(loading)
        axios
          .post("api/users/avatarUpload", formData)
          .then((res) => {
            setUserData({ ...userData, userAvatar: res.data.Key });
            M.toast({ html: "Profile Updated" });
            console.log(userData.userAvatar);
            console.log(loading)
            
          })
          .catch((err) => console.log(err));
          setLoading(false)
      }
      setLoading(true);
          updateUser(user, userData);
          console.log(loading)
setAvatar({ raw: "", preview: "" })
setLoading(false)
    }
//     

  
  console.log(userData);
  return (
    <div className="container">
      <span style={{ margin: "100px" }} className="green-text">
        Update your Profile
      </span>
      <div className="form-container"></div>
      {/* User Avatar Display*/}
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col s4 offset-s4 center-align" style={{display:"flex",justifyContent:'center'}}>
          <img
            className="materialboxed  responsive-img"
            alt="userAvatar"
            style={{ alignSelf:"center",borderRadius: "50%" }}
            width="225"
            src={avatar.preview === "" ? `https://bucketeer-129dc88f-2950-47ee-afbc-f78f0fce725d.s3.amazonaws.com/${userData.userAvatar}`:  avatar.preview }
          ></img>
        </div>{" "}
      </div>
      {/* User Avatar change*/}
      <div className="row">
        <div className="col s4 offset-s4">
          <div className="file-field input-field">
            <div className="btn-floating green">
              <span>
                <i className="material-icons">add_a_photo</i>
              </span>
              <input name="userAvatar" type="file" onChange={handleImgChange} />
            </div>
            <div className="file-path-wrapper hide">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
      </div>

      {/* User Name */}
      <div className="row" >
      <span htmlFor="name">Your Name</span><br/>
        <input
          className="validate input-field col s4 offset-s4"
          type="text"
          name="name"
          value={userData.name}
          onChange={onChange}
          required

          // data-length="10"
        />

      </div>
      {/* User Email */}
      <div className="row input-field col s4 offset-s4">
      <span htmlFor="name">Email</span><br/>
        <input
          className="validate input-field col s4 offset-s4"
          type="email"
          name="email"
          value={userData.email}
          onChange={onChange}
          required
        />
      </div>
      {/* User Phone */}
      <div className="row">
      <span htmlFor="name">Phone (10 digit)</span><br/>
        <input
          className="validate input-field col s4 offset-s4"
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={onChange}
          pattern="[0-9]{10}"
        />
      </div>
      {/* User username*/}
      <div className="row">
      <span htmlFor="name">Username</span><br/>
        <input
          className="validate input-field col s4 offset-s4"
          type="text"
          name="username"
          value={userData.username}
          onChange={onChange}
        />
      </div>
      {!loading && (
        <a
          href="#!"
          onClick={onSubmit}
          className="waves-effect green waves-light btn-large"
        >
          Update Info
        </a>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUser })(Profile);
