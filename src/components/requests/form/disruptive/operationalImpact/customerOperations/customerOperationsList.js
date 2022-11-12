import React from 'react';
import CustomerOperationListItem from './listItem/customerOperationListItem';

const CustomerOperationsList = (props) => {

    const { save, roles, request } = props;

    const { customerOperationDisruptionItems, disruptionSubmittedStatus } = request;

    const isPlanner = roles.includes('planner');

    let isLocked = false;
    if(disruptionSubmittedStatus === 'Submitted' || disruptionSubmittedStatus === 'Approved'){
        isLocked = true;
    }
    
    const addCustomerOperationItem = () => {
        // local mutable array
        let updatedCustomerOperationItem = [];
        // copy exisint items if they exist
        if(customerOperationDisruptionItems != null) {
            updatedCustomerOperationItem = [...customerOperationDisruptionItems];
        }
        // add new item
        updatedCustomerOperationItem.push({
            stopDisrupted: '',
            numberOfStaff: '2',
            wellfareRequired: false
        });
        // update state with new item
        save({ customerOperationDisruptionItems: updatedCustomerOperationItem });
    }

    const deleteCustomerOperationItem = (index) => {
        // create local copy
        const  updatedCustomerOperationItem = [ ...customerOperationDisruptionItems ];
        // remove array element by index
        updatedCustomerOperationItem.splice(index, 1);
        // update state
        save({ customerOperationDisruptionItems: updatedCustomerOperationItem });
    }

    const updateCustomerOperationItem = (data, index) => {
        // create local copy
        let updatedCustomerOperationItems = [...customerOperationDisruptionItems];
        // update element at index
        updatedCustomerOperationItems[index] = data;
        //update state
        save({ customerOperationDisruptionItems: updatedCustomerOperationItems });
    }
    
    return (
        <div>
            <div className='row g-2 p-1'>
                <div className='form-floating w-75'>
                    <h3 className='h5 text-muted'>Customer Operations</h3>
                </div>
                
                { (isPlanner === true && isLocked === false)
                    ?   <div className='form-floating w-25'>
                            <div className='btn-group float-end' role="group" aria-label='Basic example'>
                                <button type='button' className='btn btn-sm btn-primary' onClick={ addCustomerOperationItem }>Add</button>
                            </div>
                        </div>
                    : null
                }
            </div>
           
            { customerOperationDisruptionItems
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
                                    customerOperationDisruptionItems.map((item, index) => {
                                        return(<CustomerOperationListItem
                                                    key={(item.stopDisrupted + String(index))}
                                                    index={index}
                                                    item={item}
                                                    isPlanner={isPlanner}
                                                    isLocked={isLocked}
                                                    deleteCustomerOperationItem={deleteCustomerOperationItem}
                                                    updateCustomerOperationItem={updateCustomerOperationItem}
                                                />);
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                : <div className='alert alert-warning text-sm-center' role='alert'>You have no customer operation disruptions</div>
            }
            
        </div>
    );
}

export default CustomerOperationsList;