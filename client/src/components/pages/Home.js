import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions';

const Home = ({user, logout}) => {
    const onLogout = () => {
        logout();
    }
    return (
        <>
        HI {user.name}
        <Link to='/login'>go to Login </Link>
        <Link to='/register'>Register </Link>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt">
            <span className="hide-sm">Logout</span>
          </i>
        </a>

        </>
    )
}
const mapStateToProps = (state) => ({
user: state.auth.user
})

export default connect(mapStateToProps,{logout})(Home)