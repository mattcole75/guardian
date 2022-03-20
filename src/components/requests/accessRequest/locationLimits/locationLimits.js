import React from 'react';
import LocationLimitItem from './locationLimitItem';

const LocationDetails = (props) => {

    const item = {
        from: 'VIC',
        to: 'QRD',
        date: '05/07/2022',
        type: 'Maintenance (no issolation)',
        duration: '3h'
    };

    return (
        <div>
            <h6 className="h6 text-start">Location limits:</h6>
            <div className="text-start mb-3" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={props.toggle}>Add limit item</button>
            </div>
            <div className="list-group mb-3 text-start">
                <LocationLimitItem item={item} toggle={props.toggle} />
                <LocationLimitItem item={item} toggle={props.toggle} />
                <LocationLimitItem item={item} toggle={props.toggle} />
            </div>
        </div>
    );
}

export default LocationDetails;