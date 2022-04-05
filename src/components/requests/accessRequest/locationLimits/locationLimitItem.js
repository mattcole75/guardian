import React from 'react';

const locationLimitItem = (props) => {

    const { select, toggle, item, index } = props;

    const onSelect = () => {
        select(index);
        toggle();
    }

    return(
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={onSelect}>
            <i className="bi-wrench access-icon access-icon-pending"></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div>
                    <p className="mb-0 opacity-75"><strong>Location(s): </strong>{item.locations.join(', ')}</p>
                    <p className="mb-0 opacity-75"><strong>Date/Time: </strong>{item.locationLimitDate}</p>
                    <p className="mb-0 opacity-75"><strong>Type: </strong>{item.locationLimitType}</p>
                    <p className="mb-0 opacity-75"><strong>Duration: </strong>{item.locationLimitDuration}{item.durationType}</p>
                </div>
                <small className="opacity-70 text-nowrap access-icon-pending">{item.locationLimitStatus}</small>
            </div>
        </div>
    );
}

export default locationLimitItem;