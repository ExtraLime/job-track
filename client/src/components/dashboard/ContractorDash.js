import React, {useEffect} from 'react'

import Jobs from '../jobs/Jobs'

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

const ContractorDash = () => {
    useEffect(() => M.AutoInit()); //eslint-disable-next-line);
    return (
        <div className="container">
        <div className="row ">
          <div className="col s8">
            <Jobs />
          </div>
        </div>
      </div>
    )
}

export default ContractorDash