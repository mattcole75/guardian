import React from 'react';

const locationLimitItem = (props) => {

    const select = () => {
        props.select(props.index);
        props.toggle();
    }

    return(
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={select}>
            <i className="bi-wrench access-icon access-icon-pending"></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div>
                    <p className="mb-0 opacity-75"><strong>From: </strong>{props.item.locationLimitFrom}</p>
                    <p className="mb-0 opacity-75"><strong>To: </strong>{props.item.locationLimitTo}</p>
                    <p className="mb-0 opacity-75"><strong>Date/Time: </strong>{props.item.locationLimitDate}</p>
                    <p className="mb-0 opacity-75"><strong>Type: </strong>{props.item.locationLimitType}</p>
                    <p className="mb-0 opacity-75"><strong>Duration: </strong>{props.item.locationLimitDuration}</p>
                </div>
                <small className="opacity-70 text-nowrap access-icon-pending">{props.item.locationLimitStatus}</small>
            </div>
        </div>
    );
}

export default locationLimitItem;