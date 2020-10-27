import React, {Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import Jobs from '../../components/jobs/Jobs'
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import ActionButton from '../layout/ActionButton'
import AddJobModal from "../jobs/AddJobModal";


const UserDash = () => {
    useEffect(() => M.AutoInit())//eslint-disable-next-line);

    return (
        <div className='container'>
            <Jobs />
            <AddJobModal />
        </div>
    )
}


export default UserDash
