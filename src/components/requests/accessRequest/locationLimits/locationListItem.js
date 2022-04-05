import React from 'react';

const locationListItem = (props) => (
    <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        <i className="bi-bezier2 location-icon"></i>
        <div className="d-flex gap-2 w-100 justify-content-between" role="button">
            <p className="mb-0 opacity-75">{props.item}</p>
            <small className="opacity-70 text-nowrap access-icon-pending">{props.item.locationLimitStatus}</small>
            {props.editable
                ? <button className="btn btn-danger" type="button" onClick={() => {props.remove(props.index)}}>Remove</button>
                : null
            }
            
        </div>
    </div>
)

export default locationListItem;