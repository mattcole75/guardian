import React from 'react';
import { useForm } from 'react-hook-form';

const RiskAssessments = (props) => {

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

    return (
        <div>
            <h6 className="h6 text-start">Risk Assessments:</h6>
            {/* <div className="list-group mb-3 text-start">
                <label htmlFor="hospital" className="form-label">Nearest Hospital</label>
                <select className="form-select" id="hospital" required>
                    <option value="">Choose...</option>
                    <option>Manchester Royal Infirmary</option>
                    <option>North Manchester General Hospital</option>
                    <option>Manchester Royal Infirmary</option>
                    <option>Wythenshawe Hospital</option>
                    <option>Withington Community Hospital</option>
                </select>
            </div> */}
            <div className="text-start mb-3" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success">Add risk item</button>
            </div>
            <div className="list-group mb-3 text-start">
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi-exclamation-triangle access-icon access-icon-proceed"></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75"><strong>Hazard: </strong>Electric shock from OHL</p>
                            <p className="mb-0 opacity-75"><strong>Risk score: </strong>8</p>
                            <p className="mb-0 opacity-75"><strong>Mitigated risk score: </strong>4</p>
                            <p className="mb-0 opacity-75"><strong>Nearest hospital: </strong>Manchester Royal Infirmary</p>
                        </div>
                        <small className="opacity-70 text-nowrap access-icon-proceed">acceptable</small>
                    </div>
                </a>
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi-exclamation-triangle access-icon access-icon-pending"></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75"><strong>Hazard: </strong>Struck by a tram</p>
                            <p className="mb-0 opacity-75"><strong>Risk score: </strong>8</p>
                            <p className="mb-0 opacity-75"><strong>Mitigated risk score: </strong>4</p>
                            <p className="mb-0 opacity-75"><strong>Nearest hospital: </strong>Manchester Royal Infirmary</p>
                        </div>
                        <small className="opacity-70 text-nowrap access-icon-pending">pending</small>
                    </div>
                </a>
                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi-exclamation-triangle access-icon access-icon-decline"></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <p className="mb-0 opacity-75"><strong>Hazard: </strong>Slips, Trips and falls</p>
                            <p className="mb-0 opacity-75"><strong>Risk score: </strong>12</p>
                            <p className="mb-0 opacity-75"><strong>Mitigated risk score: </strong>8</p>
                            <p className="mb-0 opacity-75"><strong>Nearest hospital: </strong>Manchester Royal Infirmary</p>
                        </div>
                        <small className="opacity-70 text-nowrap access-icon-decline">not acceptable</small>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default RiskAssessments;