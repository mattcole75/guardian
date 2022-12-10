import React from 'react';
import LocationLimitItem from './locationLimitItem';

const LocationLimits = (props) => {

    const { request, toggle, select, recordLocked } = props;
    
    return (
        <div>
            <div className='row g-2'>
                
                <div className='form-floating  col-sm-6'>
                    {request && request.locationLimitItems
                        ? request.locationLimitItems.length > 1
                            ?   <p className='text-start text-muted'>There are { request.locationLimitItems.length } location limits</p>
                            :   request.locationLimitItems.length === 1
                                ?   <p className='text-start text-muted'>There is 1 location limit</p>
                                :   <p className='text-start text-muted'>There must be at least 1 location limit</p>
                        :   <p className='text-start text-muted'>There must be at least 1 location limit</p>

                    }
                   
                </div>
                <div className='form-floating col-sm-6 mb-1'>
                    {!recordLocked
                        ?   <div className='text-end mb-3' role='group' aria-label='Basic example'>
                                <button type='button' className='btn btn-primary' onClick={toggle}>Add Location Limit</button>
                            </div>
                        :   null
                    }
                </div>

            </div>
            
           
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