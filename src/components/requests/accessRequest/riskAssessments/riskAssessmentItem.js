import React from 'react';

const riskAssessmentItem = (props) => {

    const { index, item, select, toggle } = props;
    const onSelect = () => {
        select(index);
        toggle();
    }

    let iconStyle = [' bi-exclamation-triangle access-icon'];
    let badgeStyle = ['badge rounded-pill'];

    switch (item.riskAssessmentStatus) {
        case 'pending':
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
            break;
        case 'not acceptable':
            iconStyle.push('access-icon-decline');
            badgeStyle.push('bg-danger');
            break;
        case 'acceptable':
            iconStyle.push('access-icon-approved');
            badgeStyle.push('bg-success');
            break;
        default:
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
    }

    return(
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={onSelect}>
            <i className={iconStyle.join(' ')}></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div>
                    <p className="mb-0 opacity-75"><strong>Hazard: </strong>{item.riskHazardTitle}</p>
                    <p className="mb-0 opacity-75"><strong>Risk score: </strong>{item.impact * item.likelihood}</p>
                    <p className="mb-0 opacity-75"><strong>Mitigated risk score: </strong>{item.impact * item.mitigatedLikelihood}</p>
                    <p className="mb-0 opacity-75"><strong>Nearest hospital: </strong>{item.riskNearestHospital}</p>
                </div>
                <div className="p-1">
                    <small className={badgeStyle.join(' ')}>{item.riskAssessmentStatus}</small>
                </div>
            </div>
        </div>
    );
}

export default riskAssessmentItem;