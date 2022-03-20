import React from 'react';

const locationLimitItem = (props) => (

    <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={props.toggle}>
        <i className="bi-wrench access-icon access-icon-pending"></i>
        <div className="d-flex gap-2 w-100 justify-content-between" role="button">
            <div>
                <p className="mb-0 opacity-75"><strong>From: </strong>{props.item.from}</p>
                <p className="mb-0 opacity-75"><strong>To: </strong>{props.item.to}</p>
                <p className="mb-0 opacity-75"><strong>Date/Time: </strong>{props.item.date}</p>
                <p className="mb-0 opacity-75"><strong>Type: </strong>{props.item.type}</p>
                <p className="mb-0 opacity-75"><strong>Duration: </strong>{props.item.duration}</p>
            </div>
            <small className="opacity-70 text-nowrap access-icon-pending">pending</small>
        </div>
    </div>
);

export default locationLimitItem;