import React from "react";
import { useHistory } from 'react-router-dom'

const Applications = () => {

    const history = useHistory();

    return (
        <div className="container">
            <div className="p-3 form-floating">
                <div className="btn-group float-start" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={() => history.push('/access')}>New Access Request</button>
                </div>
                {/* <div className=""> 
                    <button type="button" className="btn btn-outline-success">New Access Request</button>
                    <button type="button" className="btn btn-outline-danger">New Disruptive Request</button>
                </div> */}
            </div>
        </div>
    )
}

export default Applications;