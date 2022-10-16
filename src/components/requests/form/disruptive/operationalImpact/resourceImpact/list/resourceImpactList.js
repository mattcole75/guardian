import React from 'react';
import ResourceImpactListItem from './listItem/resourceImpactListItem';

const ResourceImpactList = (props) => {

    const { request, toggle, select, editable } = props;
    
    return (
        <div>
            {editable
                ?   <div className='row g-2 mt-3 mb-3 p-1'>
                        <div className='form-floating w-75'>
                            <h3 className='h5 text-muted'>Resource Impact</h3>
                        </div>
                        
                        <div className='form-floating w-25'>
                            <div className='btn-group float-end' role="group" aria-label='Basic example'>
                                <button type='button' className='btn btn-sm btn-primary' onClick={toggle}>Add</button>
                            </div>
                        </div> 
                    </div>  
                : null
            }
           
            { request && request.resourceDisruptionItems
                ?   <div>
                        <table className='w-100 table table-sm table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                            <thead className='border-bottom'>
                                <tr>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Title</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Taxi</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>CSR</div></th>
                                    <th className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>Welfare</div></th>
                                    <th className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>Points Operators</div></th>
                                    <th className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>Hand Signallers</div></th>
                                    <th className='ps-3 pe-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    request.resourceDisruptionItems.map((item, index) => {
                                        return(<ResourceImpactListItem key={index} index={index} item={item} editable={editable} toggle={toggle} select={select} />);
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                : <div className='alert alert-warning text-sm-center' role='alert'>You have no resource disruptions</div>
            }
            
        </div>
    );
}

export default ResourceImpactList;