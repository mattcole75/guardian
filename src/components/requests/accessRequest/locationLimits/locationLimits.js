import React from 'react';
import { useForm } from 'react-hook-form';

const LocationDetails = (props) => {

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

    return (
        <div>
            <h6 className="h6 text-start">Location limits:</h6>
            <div className="text-start mb-3" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success">Add limit item</button>
            </div>

            <div className="list-group mb-3 text-start">
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi-wrench access-icon access-icon-proceed"></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75"><strong>From: </strong>VIC</p>
                            <p className="mb-0 opacity-75"><strong>To: </strong>QRS</p>
                            <p className="mb-0 opacity-75"><strong>Date/Time: </strong>20/06/2022 01:00</p>
                            <p className="mb-0 opacity-75"><strong>Type: </strong>Occupation (issolation)</p>
                            <p className="mb-0 opacity-75"><strong>Duration: </strong>3h</p>
                        </div>
                        <small className="opacity-70 text-nowrap access-icon-proceed">approved</small>
                    </div>
                </a>
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi-wrench access-icon access-icon-pending"></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75"><strong>From: </strong>VIC</p>
                            <p className="mb-0 opacity-75"><strong>To: </strong>QRS</p>
                            <p className="mb-0 opacity-75"><strong>Date/Time: </strong>21/06/2022 01:00</p>
                            <p className="mb-0 opacity-75"><strong>Type: </strong>Posession (issolation)</p>
                            <p className="mb-0 opacity-75"><strong>Duration: </strong>3h</p>
                        </div>
                        <small className="opacity-70 text-nowrap access-icon-pending">pending</small>
                    </div>
                </a>
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi-wrench access-icon access-icon-decline"></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75"><strong>From: </strong>VIC</p>
                            <p className="mb-0 opacity-75"><strong>To: </strong>QRS</p>
                            <p className="mb-0 opacity-75"><strong>Date/Time: </strong>22/06/2022 01:00</p>
                            <p className="mb-0 opacity-75"><strong>Type: </strong>Maintenance</p>
                            <p className="mb-0 opacity-75"><strong>Duration: </strong>1h</p>
                        </div>
                        <small className="opacity-70 text-nowrap access-icon-decline">declined</small>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default LocationDetails;