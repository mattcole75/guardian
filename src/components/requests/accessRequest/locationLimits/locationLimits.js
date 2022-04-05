import React from 'react';
import { useSelector } from 'react-redux';
import LocationLimitItem from './locationLimitItem';

const LocationLimits = (props) => {

    const { toggle, select, editable } = props;
    const request = useSelector(state => state.requests.request);
    
    return (
        <div>
            <h6 className="h6 text-start">Location limits:</h6>
            {editable
                ?  <div className="text-start mb-3" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={toggle}>Add limit item</button>
                </div>
                : null
            }
           
            <div className="list-group mb-3 text-start">
                {
                    request && request.locationLimitItems.map((item, index) => {
                        return(<LocationLimitItem key={index} index={index} item={item} editable={editable} toggle={toggle} select={select} />);
                    })
                }
            </div>
        </div>
    );
}

export default LocationLimits;