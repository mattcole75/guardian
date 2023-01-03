import React from 'react';
import CustomerOperationListItem from './listItem/customerOperationListItem';

const OperationImpactList = (props) => {

    const { id, save, roles, operationImpactItems, status } = props;

    // const { customerOperationDisruptionItems, disruptiveStatus } = request;

    const isPlanner = roles.includes('planner');

    let isLocked = false;
    if(status === 'Submitted' || status === 'Approved'){
        isLocked = true;
    }
    
    const addOperationImpactItem = () => {
        // local mutable array
        let updatedOperationImpactItems = [];
        // copy exisint items if they exist
        if(operationImpactItems != null) {
            updatedOperationImpactItems = [...operationImpactItems];
        }
        // add new item
        updatedOperationImpactItems.push({
            stopDisrupted: '',
            numberOfStaff: '2',
            wellfareRequired: false,
            securityRequired: false
        });
        // update state with new item
        save(id, { operationImpactItems: updatedOperationImpactItems });
    }

    const deleteOperationImpactItem = (index) => {
        // create local copy
        const  updatedOperationImpactItems = [ ...operationImpactItems ];
        // remove array element by index
        updatedOperationImpactItems.splice(index, 1);
        // update state
        save(id, { operationImpactItems: updatedOperationImpactItems });
    }

    const updateOperationImpactItem = (data, index) => {
        // create local copy
        let updatedOperationImpactItems = [...operationImpactItems];
        // update element at index
        updatedOperationImpactItems[index] = data;
        //update state
        save(id, { operationImpactItems: updatedOperationImpactItems });
    }
    
    return (
        <div>
            <div className='row g-2 p-1'>
                <div className='form-floating w-75'>
                    <h3 className='h5 text-muted text-start'>Customer Operations</h3>
                </div>
                
                { (isPlanner && !isLocked)
                    ?   <div className='form-floating w-25'>
                            <div className='btn-group float-end' role="group" aria-label='Basic example'>
                                <button type='button' className='btn btn-sm btn-primary' onClick={ addOperationImpactItem }>Add</button>
                            </div>
                        </div>
                    : null
                }
            </div>
           
            { operationImpactItems
                ?   <div className='table-responsive'>
                        <table className='w-100 table table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                            <thead className='border-bottom'>
                                <tr>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Stop</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Staff</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Wellfare</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Security</div></th>
                                    <th className='ps-3 pe-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    operationImpactItems.map((item, index) => {
                                        return(<CustomerOperationListItem
                                                    key={ (item.stopDisrupted + String(index)) }
                                                    index={ index }
                                                    item={ item }
                                                    isPlanner={ isPlanner }
                                                    isLocked={ isLocked }
                                                    deleteCustomerOperationItem={ deleteOperationImpactItem }
                                                    updateCustomerOperationItem={ updateOperationImpactItem }
                                                />);
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>You have no customer operation disruptions</div>
            }   
        </div>
    );
}

export default OperationImpactList;