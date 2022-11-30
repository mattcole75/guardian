import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const AdditionalCommunications = (props) => {

    const { save, roles, request, recordLocked } = props;

    const { communicationDisruptionItems, disruptionSubmittedStatus } = request;
    
    const isPlanner = roles.includes('planner');

    let isLocked = false;
    if(disruptionSubmittedStatus === 'Submitted' || disruptionSubmittedStatus === 'Approved' || recordLocked){
        isLocked = true;
    }

    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: communicationDisruptionItems ? communicationDisruptionItems : null
    });

    const onUpdate = debounce(() => {
        save({ communicationDisruptionItems: getValues() });
    }, 1000);

    return (
        <div>
            <h3 className='h5 mb-3 mt-3 text-muted'>Communications</h3>
             
            <div className='table-responsive'>
                <table className='w-100 table table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                    <thead className='border-bottom'>
                        <tr>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Signage</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Customer</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Driver</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>CSR</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Eng</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-bottom'>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='additionalSignage'
                                        disabled={(isPlanner === false && isLocked === false) || isLocked}
                                        { ...register('additionalSignage', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='additionalCustomer'
                                        disabled={(isPlanner === false && isLocked === false) || isLocked}
                                        { ...register('additionalCustomer', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>
    
                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='additionalDriver'
                                       disabled={(isPlanner === false && isLocked === false) || isLocked}
                                        { ...register('additionalDriver', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='additionalCSR'
                                       disabled={(isPlanner === false && isLocked === false) || isLocked}
                                        { ...register('additionalCSR', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='additionalEngineering'
                                       disabled={(isPlanner === false && isLocked === false) || isLocked}
                                        { ...register('additionalEngineering', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default AdditionalCommunications;