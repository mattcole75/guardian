import React from 'react';
import LocationItem from './locationItem';

const Locations = (props) => {

    const { accessRequest, toggle, select, recordLocked } = props;
    
    return (
        <div>
            <div className='row g-2'>
                
                <div className='form-floating  col-sm-6'>
                    {accessRequest && accessRequest.locationItems
                        ? accessRequest.locationItems.length > 1
                            ?   <p className='text-start text-muted'>There are { accessRequest.locationItems.length } locations selected</p>
                            :   accessRequest.locationItems.length === 1
                                ?   <p className='text-start text-muted'>There is 1 location selected</p>
                                :   <p className='text-start text-muted'>There must be at least 1 location selected</p>
                        :   <p className='text-start text-muted'>There must be at least 1 location selected</p>

                    }
                   
                </div>
                <div className='form-floating col-sm-6 mb-1'>
                    {!recordLocked
                        ?   <div className='text-end mb-3' role='group' aria-label='Basic example'>
                                <button type='button' className='btn btn-primary' onClick={toggle}>Add Location</button>
                            </div>
                        :   null
                    }
                </div>

            </div>
            
           { accessRequest && accessRequest.locationItems && accessRequest.locationItems.length > 0
                ?   <div className='list-group mb-3 text-start'>
                        {
                            (accessRequest && accessRequest.locationItems) && accessRequest.locationItems.map((item, index) => {
                                return(<LocationItem
                                    key={index}
                                    index={index}
                                    item={item}
                                    toggle={toggle}
                                    select={select}
                                />);
                            })
                        }
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>There are no locations registered</div>
           }
            
        </div>
    );
}

export default Locations;