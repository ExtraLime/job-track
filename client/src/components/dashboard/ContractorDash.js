import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import Jobs from '../jobs/Jobs'

const ContractorDash = () => {
    return (
        <div className='container'>
            Contractor
            <Fragment>
                <Jobs />
            </Fragment>
        </div>
    )
}

export default ContractorDash