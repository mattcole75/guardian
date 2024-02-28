import React from 'react';
import List from './list/list';

const WorkStages = (props) => {

    const { workStages, toggle, select, recordLocked, save } = props;
    
    return (
        <div>
            <div className='text-start'>
                <h4 className='h4 fw-normal'>c) Planned Work</h4>
            </div>

            <div className='row g-2'>
                
                <div className='form-floating  col-sm-6'>
                    { workStages
                        ? workStages.length > 1
                            ?   <p className='text-start text-muted'>There are { workStages.length } work stages</p>
                            :   workStages.length === 1
                                ?   <p className='text-start text-muted'>There is 1 work stage</p>
                                :   <p className='text-start text-muted'>There must be at least 1 work stage</p>
                        :   <p className='text-start text-muted'>There must be at least 1 work stage</p>

                    }
                   
                </div>

                <div className='form-floating col-sm-6 mb-1'>
                    {!recordLocked
                        ?   <div className='text-end mb-3' role='group' aria-label='Basic example'>
                                <button type='button' className='btn btn-primary' onClick={ toggle }>Add Work Stage</button>
                            </div>
                        :   null
                    }
                </div>

            </div>

            <List workStages={ workStages } toggle={ toggle } select={ select } save={ save } recordLocked={ recordLocked } />
        </div>
    );
}

export default WorkStages;