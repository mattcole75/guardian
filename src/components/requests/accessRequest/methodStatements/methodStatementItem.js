import React from 'react';

const methodStatementItem = (props) => {

    const { index, item, select, toggle } = props;

    const action = () => {
        select(index);
        toggle();
    }

    let iconStyle = ['bi-card-checklist access-icon access-icon'];
    let badgeStyle = ['badge rounded-pill'];

    switch (item.methodStatementStatus) {
        case 'pending':
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
            break;
        case 'not approved':
            iconStyle.push('access-icon-decline');
            badgeStyle.push('bg-danger');
            break;
        case 'approved':
            iconStyle.push('access-icon-approved');
            badgeStyle.push('bg-success');
            break;
        default:
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
    }

    return (
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={action}>
            <i className={iconStyle.join(' ')}></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div>
                    <p className="mb-0 opacity-75"><strong>Task: </strong>{item.methodStatementTitle}</p>
                    <p className="mb-0 opacity-75"><strong>PPE: </strong>{item.methodStatementPPE}</p>
                    <p className="mb-0 opacity-75"><strong>Equipment: </strong>{item.methodStatementEquipment}</p>
                    <p className="mb-0 opacity-75"><strong>Track Vehicles: </strong>{item.methodStatementTrackVehicles}</p>
                </div>
                <div className="p-1">
                    <small className={badgeStyle.join(' ')}>{item.methodStatementStatus}</small>
                </div>
                
            </div>
        </div>
    );
}

export default methodStatementItem;