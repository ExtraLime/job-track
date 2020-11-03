import React from "react";
import Moment from 'react-moment'
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize.min.js'



const ContractorItem = ({contractor}) => {
    
  return (
    <li key={contractor.id}className="collection-item">
      <div>
        <span className="black-text">
          <span className="black-text">{contractor.name} </span> <br/>
          <span className="black-text">Total jobs with you: "get number" </span><br/>
            Contact: {contractor.email}
           
          {/* <Moment format="MMMM Do YYYY, h:mm:ss a">{contractor.date}</Moment> */}
        </span>
        <a disabled href="#!" onClick={console.log("i was clicked")} className="secondary-content">
            <i className="material-icons grey-text">person</i>
        </a>
      </div>
    </li>
  );
};


const mapStateToProps = state => ({
  role: state.auth.role
})
export default connect(mapStateToProps)(ContractorItem);
