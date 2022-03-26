import React from 'react';

const riskAssessmentItem = (props) => {

    const select = () => {
        props.select(props.index);
        props.toggle();
    }

    return(
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={select}>
            <i className="bi-exclamation-triangle access-icon access-icon-pending"></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div>
                    <p className="mb-0 opacity-75"><strong>Hazard: </strong>{props.item.riskHazardTitle}</p>
                    <p className="mb-0 opacity-75"><strong>Risk score: </strong>{props.item.riskScore}</p>
                    <p className="mb-0 opacity-75"><strong>Mitigated risk score: </strong>{props.item.riskMitigatedScore}</p>
                    <p className="mb-0 opacity-75"><strong>Nearest hospital: </strong>{props.item.riskNearestHospital}</p>
                </div>
                <small className="opacity-70 text-nowrap access-icon-pending">{props.item.riskAssessmentStatus}</small>
            </div>
        </div>
    );
}

export default riskAssessmentItem;