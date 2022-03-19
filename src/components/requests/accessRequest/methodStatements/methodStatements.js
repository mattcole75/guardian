import React from 'react';
import { useForm } from 'react-hook-form';

const MethodStatements = (props) => {

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

    return (
        <div>
            <h6 className="h6 text-start">Method Statements:</h6>
            {/* <div className="list-group mb-3 text-start">
                <label htmlFor="ppe" className="form-label">Personal protective equipment</label>
                <select className="form-select" id="ppe" required>
                    <option value="">Choose...</option>
                    <option>Five Point PPE (Minumum)</option>
                </select>
            </div> */}
            <div className="text-start mb-3" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-success">Add method statement</button>
            </div>
            <div className="list-group mb-3 text-start">
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi-exclamation-triangle access-icon access-icon-proceed"></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75"><strong>Task 1: </strong>Task brief</p>
                            <p className="mb-0 opacity-75"><strong>PPE: </strong>Five Point PPE</p>
                            <p className="mb-0 opacity-75"><strong>Equipment: </strong>none</p>
                            <p className="mb-0 opacity-75"><strong>Track Vehicles: </strong>None</p>
                        </div>
                        <small className="opacity-70 text-nowrap access-icon-proceed">approved</small>
                    </div>
                </a>
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi-exclamation-triangle access-icon access-icon-pending"></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75"><strong>Task 2: </strong>Confirm line is clear</p>
                            <p className="mb-0 opacity-75"><strong>PPE: </strong>Five Point PPE</p>
                            <p className="mb-0 opacity-75"><strong>Equipment: </strong>None</p>
                            <p className="mb-0 opacity-75"><strong>Track Vehicles: </strong>None</p>
                        </div>
                        <small className="opacity-70 text-nowrap access-icon-pending">pending</small>
                    </div>
                </a>
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi-exclamation-triangle access-icon access-icon-decline"></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75"><strong>Task 3: </strong>Test OHL is dead</p>
                            <p className="mb-0 opacity-75"><strong>PPE: </strong>Five Point PPE</p>
                            <p className="mb-0 opacity-75"><strong>Equipment: </strong>2 Items</p>
                            <p className="mb-0 opacity-75"><strong>Track Vehicles: </strong>None</p>
                        </div>
                        <small className="opacity-70 text-nowrap access-icon-decline">not acceptable</small>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default MethodStatements;