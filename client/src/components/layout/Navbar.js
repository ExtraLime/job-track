import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../../actions/authActions";

const Navbar = ({ title, icon, logout, isAuthenticated, user }) => {
  const onLogout = () => {
    logout();
  };
  const adminLinks = (
    <Fragment>
      <li style={{ display:"float",marginRight: "15px" }}><span className="text-right"> {user && user.name} 
        <i className="material-icons left">person</i>Hello</span>
      </li>
      
      <li>
        <i className="material-icons left">people</i>Users
      </li>
      <li>
        <i className="material-icons left">network</i>Contractors
      </li>

      <li>
        <a onClick={onLogout} href="#!">
          <i className="material-icons left">logout</i>Logout
        </a>
      </li>
    </Fragment>
  );
  const userLinks = (
    <Fragment>
       <li style={{ display:"inline",marginRight: "15px" }}> <a href="">     {" "}
        <i className="material-icons left">person</i> Hello {user && user.name}{" "}
        </a></li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="material-icons left">logout</i>Logout
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper green">
          <a href="/" className="brand-logo left">
            {title} <i className="material-icons right">work</i>
          </a>
          <ul id="nav-mobile" className="right">
            {isAuthenticated && user && user.role === "admin"
              ? adminLinks
              : isAuthenticated
              ? userLinks
              : guestLinks}
          </ul>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Job-Tracker",
  icon: "'material-icons'>work</i>",
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(Navbar);
