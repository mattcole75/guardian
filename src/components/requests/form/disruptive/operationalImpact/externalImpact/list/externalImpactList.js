import React from 'react';
import ExternalImpactListItem from './listItem/externalImpactListItem';

const ExternalImpactList = (props) => {

    const { request, toggle, select, editable } = props;
    
    return (
        <div>
            {editable
                ?   <div className='row g-2 mt-3 mb-3 p-1'>
                        <div className='form-floating w-75'>
                            <h3 className='h5 text-muted'>External Impact</h3>
                        </div>
                        
                        <div className='form-floating w-25'>
                            <div className='btn-group float-end' role="group" aria-label='Basic example'>
                                <button type='button' className='btn btn-sm btn-primary' onClick={toggle}>Add</button>
                            </div>
                        </div> 
                    </div>  
                : null
            }
           
            { request && request.externalDisruptionItems
                ?   <div>
                        <table className='w-100 table table-sm table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                            <thead className='border-bottom'>
                                <tr>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Title</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Events</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Security</div></th>
                                    <th className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>Roadworks</div></th>
                                    <th className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>Worksites</div></th>
                                    <th className='ps-3 pe-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    request.externalDisruptionItems.map((item, index) => {
                                        return(<ExternalImpactListItem key={index} index={index} item={item} editable={editable} toggle={toggle} select={select} />);
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                : <div className='alert alert-warning text-sm-center' role='alert'>You have no external disruptions</div>
            }
            
        </div>
    );
}

export default ExternalImpactList;