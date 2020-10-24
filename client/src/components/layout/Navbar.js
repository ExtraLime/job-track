import React, { Fragment } from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from '../../actions/authActions'



const Navbar = ({ title, icon, logout, isAuthenticated, user }) => {


  const onLogout = () => {
      logout();
  }
  const adminLinks = (
    <Fragment>
      <li style={{marginRight:"15px"}}> <i className='material-icons left'>person</i>Hello {user && user.name}</li><span>  </span>
  <li><i className='material-icons left'>people</i>Users</li>
      <li><i className='material-icons left'>network</i>Contractors</li>

      <li>
        <a onClick={onLogout} href="#!">
          <i className="material-icons left">logout</i>Logout
        </a>
      </li>
    </Fragment>
  );
  const userLinks = (
    <Fragment>
      <li> <i className='material-icons'>person</i> Hello {user && user.name} </li>
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
    
    // <div className="nav-wrapper">
    //   <h1>
    //     <i className={icon} /> {title}
    //   </h1>
    //   <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    // </div>
    <div className="navbar-fixed">
      <nav>
      <div className="nav-wrapper green">
        <a href="/" className="brand-logo left">{title} <i className='material-icons right'>work</i></a>
        <ul id="nav-mobile" className="right">
        {isAuthenticated && user && user.role === 'admin' ? adminLinks : isAuthenticated ? userLinks:guestLinks}
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
    user : state.auth.user,
    
})
export default connect(mapStateToProps, { logout })(Navbar);
