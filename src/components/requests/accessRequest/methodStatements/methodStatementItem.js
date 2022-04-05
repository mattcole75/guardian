import React from 'react';

const methodStatementItem = (props) => {

    const { index, item, select, toggle } = props;

    const action = () => {
        select(index);
        toggle();
    }

    return (
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={action}>
            <i className="bi-card-checklist access-icon access-icon-pending"></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div>
                    <p className="mb-0 opacity-75"><strong>Task: </strong>{item.methodStatementTitle}</p>
                    <p className="mb-0 opacity-75"><strong>PPE: </strong>{item.methodStatementPPE}</p>
                    <p className="mb-0 opacity-75"><strong>Equipment: </strong>{item.methodStatementEquipment}</p>
                    <p className="mb-0 opacity-75"><strong>Track Vehicles: </strong>{item.methodStatementTrackVehicles}</p>
                </div>
                <small className="opacity-70 text-nowrap access-icon-pending">{item.methodStatementStatus}</small>
            </div>
        </div>
    );
}

export default methodStatementItem;