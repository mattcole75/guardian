import React from 'react';
import LocationLimitItem from './locationLimitItem';

const LocationLimits = (props) => {

    const { request, toggle, select, recordLocked } = props;
    
    return (
        <div>
            {!recordLocked
                ?  <div className='text-end mb-3' role='group' aria-label='Basic example'>
                    <button type='button' className='btn btn-primary' onClick={toggle}>Add Location Limit</button>
                </div>
                : null
            }
           
            <div className='list-group mb-3 text-start'>
                {
                    (request && request.locationLimitItems) && request.locationLimitItems.map((item, index) => {
                        return(<LocationLimitItem
                            key={index}
                            index={index}
                            item={item}
                            toggle={toggle}
                            select={select}
                        />);
                    })
                }
            </div>
        </div>
    );
}

export default LocationLimits;