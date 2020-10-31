import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import {Redirect } from 'react-router-dom'
import UserDash from '../../components/dashboard/UserDash'
import AdminDash from '../../components/dashboard/AdminDash'
import ContractorDash from '../../components/dashboard/ContractorDash'


const Dashboard = (props) => {
  useEffect(()=> {
  if (!props.isAuthenticated || props.user === null){
    return <Redirect to='/login'/>
  }
  //eslint-disable-next-line
},[])
  const adminText = <AdminDash />;

  const contractorText = <ContractorDash />;

  const userDash = <UserDash />;

  return (
    <Fragment>
      {props.user.role === "admin"
        ? adminText
        : props.user.role === "contractor"
        ? contractorText
        : userDash}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
