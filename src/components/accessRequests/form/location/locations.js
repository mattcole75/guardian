import React from 'react';
import List from './list/list';

const Locations = (props) => {

    const { locations, add, toggle, select, recordLocked } = props;
    
    return (
        <div>
            <div className='text-start'>
                <h4 className='h4 fw-normal'>Access Requirements</h4>
            </div>
            <div className='row g-2'>
                <div className='form-floating  col-sm-6'>
                    { locations
                        ? locations.length > 1
                            ?   <p className='text-start text-muted'>There are { locations.length } locations selected</p>
                            :   locations.length === 1
                                ?   <p className='text-start text-muted'>There is 1 location defined</p>
                                :   <p className='text-start text-muted'>There must be at least 1 location defined</p>
                        :   <p className='text-start text-muted'>There must be at least 1 location defined</p>

                    }
                </div>
                <div className='form-floating col-sm-6 mb-1'>
                    {!recordLocked
                        ?   <div className='text-end mb-3' role='group' aria-label='Basic example'>
                                <button type='button' className='btn btn-primary' onClick={ add }>Add Location</button>
                            </div>
                        :   null
                    }
                </div>
            </div>
            <List locations={ locations } toggle={ toggle } select={ select } />
        </div>
    );
}

export default Locations;