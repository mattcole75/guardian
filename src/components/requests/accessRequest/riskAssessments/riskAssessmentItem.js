import React from 'react';

const riskAssessmentItem = (props) => {

    const { index, item, select, toggle } = props;
    const onSelect = () => {
        select(index);
        toggle();
    }

    return(
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={onSelect}>
            <i className="bi-exclamation-triangle access-icon access-icon-pending"></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div>
                    <p className="mb-0 opacity-75"><strong>Hazard: </strong>{item.riskHazardTitle}</p>
                    <p className="mb-0 opacity-75"><strong>Risk score: </strong>{item.impact * item.likelihood}</p>
                    <p className="mb-0 opacity-75"><strong>Mitigated risk score: </strong>{item.impact * item.mitigatedLikelihood}</p>
                    <p className="mb-0 opacity-75"><strong>Nearest hospital: </strong>{item.riskNearestHospital}</p>
                </div>
                <small className="opacity-70 text-nowrap access-icon-pending">{item.riskAssessmentStatus}</small>
            </div>
        </div>
    );
}

export default riskAssessmentItem;