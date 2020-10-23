import React, { Fragment } from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from '../../actions/authActions'



const Navbar = ({ title, icon, logout, isAuthenticated, user }) => {


  const onLogout = () => {
      logout();
  }

  const authLinks = (
    <Fragment>
      <li> <i className='material-icons'>person</i> Hello {user && user.name} </li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="material-icons">logout
          </i>Logout
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
    
    // <div className="nav-wrapper">
    //   <h1>
    //     <i className={icon} /> {title}
    //   </h1>
    //   <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    // </div>
    <div className="navbar-fixed">
      <nav>
      <div className="nav-wrapper green">
        <a href="#" className="brand-logo left">{title} <i className='material-icons'>work</i></a>
        <ul id="nav-mobile" className="right">
        {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Job-Tracker",
  icon: "'material-icons'>work</i>",
};

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    user : state.auth.user
})
export default connect(mapStateToProps, { logout })(Navbar);
