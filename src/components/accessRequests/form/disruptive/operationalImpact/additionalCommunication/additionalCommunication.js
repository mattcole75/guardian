import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const AdditionalCommunication = (props) => {

    const { id, save, roles, additionalCommunication, status } = props;

    // const { communicationDisruptionItems, disruptiveStatus } = request;
    
    const isPlanner = roles.includes('planner');

    let isLocked = false;
    if(status === 'Submitted' || status === 'Approved'){
        isLocked = true;
    }

    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: additionalCommunication ? additionalCommunication : null
    });

    const onUpdate = debounce(() => {
        save(id, { additionalCommunication: getValues() });
    }, 1000);

    return (
        <div>
            <h3 className='h5 mb-3 mt-3 text-muted text-start'>Communications</h3>
             
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
                                         disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('additionalSignage', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='additionalCustomerComms'
                                         disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('additionalCustomerComms', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>
    
                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='additionalDriverComms'
                                        disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('additionalDriverComms', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='additionalCSRComms'
                                        disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('additionalCSRComms', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='additionalEngineeringComms'
                                        disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('additionalEngineeringComms', { onChange: onUpdate }) }
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

export default AdditionalCommunication;