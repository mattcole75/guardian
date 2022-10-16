import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const CommunicationImpactForm = (props) => {

    const { request, index, editable, save, toggle, setIndex } = props;

    const { register, handleSubmit } = useForm({ 
        mode: 'onChange', 
        defaultValues: ((request == null || request.communicationDisruptionItems == null) ? null : request.communicationDisruptionItems[index])
    });

    // const roles = useSelector(state => state.auth.roles);

    // const [locations, setLocations] = useState([]);

    const [communicationDisruptedSignageRequired, setCommunicationDisruptedSignageRequired] = useState((index !== null) ? request.communicationDisruptionItems[index].communicationDisruptedSignageRequired : false);
    const [communicationDisruptedCustomerRequired, setCommunicationDisruptedCustomerRequired] = useState((index !== null) ? request.communicationDisruptionItems[index].communicationDisruptedCustomerRequired : false);
    const [communicationDisruptionDriverRequired, setCommunicationDisruptionDriverRequired] = useState((index !== null) ? request.communicationDisruptionItems[index].communicationDisruptionDriverRequired : false);
    const [communicationDisruptionCSRRequired, setCommunicationDisruptionCSRRequired] = useState((index !== null) ? request.communicationDisruptionItems[index].communicationDisruptionCSRRequired : false);
    const [communicationDisruptionEngineeringRequired, setCommunicationDisruptionEngineeringRequired] = useState((index !== null) ? request.communicationDisruptionItems[index].communicationDisruptionEngineeringRequired : false);
    const [communicationDisruptionInternalCallsRequired, setCommunicationDisruptionInternalCallsRequired] = useState((index !== null) ? request.communicationDisruptionItems[index].communicationDisruptionInternalCallsRequired : false);

    const toggleCommunicationDisruptedSignageRequired = () => {
        setCommunicationDisruptedSignageRequired(prevState => !prevState);
    }
    const toggleCommunicationDisruptedCustomerRequired = () => {
        setCommunicationDisruptedCustomerRequired(prevState => !prevState);
    }
    const toggleCommunicationDisruptedDriverRequired = () => {
        setCommunicationDisruptionDriverRequired(prevState => !prevState);
    }
    const toggleCommunicationDisruptedCSRRequired = () => {
        setCommunicationDisruptionCSRRequired(prevState => !prevState);
    }
    const toggleCommunicationDisruptedEngineeringRequired = () => {
        setCommunicationDisruptionEngineeringRequired(prevState => !prevState);
    }
    const toggleCommunicationDisruptedInternalCallsRequired = () => {
        setCommunicationDisruptionInternalCallsRequired(prevState => !prevState);
    }

    const onSave = useCallback((data) => {

        let updatedCommunicationDisruptionItems = [];

        // add new tram service disruption item to existing access request
        if(request && index === null) {
            if(request.communicationDisruptionItems && request.communicationDisruptionItems.length > 0)
            updatedCommunicationDisruptionItems = [ ...request.communicationDisruptionItems ];

            updatedCommunicationDisruptionItems.push(data);
            save({ communicationDisruptionItems: updatedCommunicationDisruptionItems });
        }
        
        // update existing tram service disruption item
        if (request && index !== null) {
            updatedCommunicationDisruptionItems = [ ...request.communicationDisruptionItems ];
            updatedCommunicationDisruptionItems[index] = data;
            save({ communicationDisruptionItems: updatedCommunicationDisruptionItems });
        }

        toggle();
        setIndex(null);

    }, [index, request, save, setIndex, toggle]);

    // const onDelete = useCallback(() => {
    //     request.locationLimitItems.splice(index, 1);
    //     let updatedLocationLimitItems = request.locationLimitItems;
    //     save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');
    //     toggle();

    // }, [index, request, save, toggle]);

    return (
        <div className='form-location my-1'>
            <form className=''>
                <h1 className='h3 mb-3 fw-normal text-start'>Additional Communications</h1>

                {/* external disruption title and description */}
                <div className='border rounded p-1 mb-3 bg-light'>  
                    <div className='input-group'>

                        <div className='w-100'>
                            <div className='form-floating mb-3'>
                                <input 
                                    type='text'
                                    className='form-control'
                                    id='additionalCommunicationTitle'
                                    autoComplete='off'
                                    placeholder='Additional Communication Title'
                                    minLength={3}
                                    maxLength={30}
                                    required
                                    disabled={!editable}
                                    {...register('additionalCommunicationTitle', { required: true, minLength: 3, maxLength: 30 })} />
                                <label htmlFor='additionalCommunicationTitle' className='form-label'>Communication Title</label>
                            </div>

                            <div className='form-floating'>
                                <textarea className='form-control' id='additionalCommunicationDescription'  
                                    rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the additional communication' 
                                    disabled={!editable} required
                                    {...register('additionalCommunicationDescription', { minLength: 5, required: true })}
                                />
                                <label htmlFor='additionalCommunicationDescription' className='form-label'>Communication Description</label>
                            </div>
                        </div>
                            
                    </div>
                </div>

                {/* signage section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='communicationDisruptedSignageRequired'
                                        disabled={!editable}
                                        {...register('communicationDisruptedSignageRequired', { onChange: toggleCommunicationDisruptedSignageRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Additional signage will be required
                                    <small className='d-block text-muted'>Indicate if additional signage will be required around the network.</small>
                                </span>
                            </label>
                        </div>
                        { communicationDisruptedSignageRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating mb-1'>
                                        <select className='form-select' id='communicationDisruptionSignageType' required disabled={!editable}
                                            {...register('communicationDisruptionSignageType', { required: true })}>
                                            <option value=''>Choose...</option>
                                            <option>Engineering Works</option>
                                            <option>Network Disruption</option>
                                            <option>Bus Replacements</option>
                                            <option>Line Closure</option>
                                            <option>Other</option>
                                        </select>
                                        <label htmlFor='communicationDisruptionSignageType'>Signage Type</label>
                                    </div>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='communicationDisruptionSignageDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the required signage' 
                                            disabled={!editable} required
                                            {...register('communicationDisruptionSignageDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='communicationDisruptionSignageDescription' className='form-label'>Signage Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* customer section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='communicationDisruptedCustomerRequired'
                                        disabled={!editable}
                                        {...register('communicationDisruptedCustomerRequired', { onChange: toggleCommunicationDisruptedCustomerRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Customer communications will be required
                                    <small className='d-block text-muted'>Indicate if customer communication need to be distributed.</small>
                                </span>
                            </label>
                        </div>
                        { communicationDisruptedCustomerRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='communicationDisruptedCustomerDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the customer communications' 
                                            disabled={!editable} required={false}
                                            {...register('communicationDisruptedCustomerDescription', { minLength: 5, required: false })}
                                        />
                                        <label htmlFor='communicationDisruptedCustomerDescription' className='form-label'>Customer Communication Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Driver section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='communicationDisruptionDriverRequired'
                                        disabled={!editable}
                                        {...register('communicationDisruptionDriverRequired', { onChange: toggleCommunicationDisruptedDriverRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Driver briefings will be required
                                    <small className='d-block text-muted'>Indicate if driver briefings need to be considered.</small>
                                </span>
                            </label>
                        </div>
                        { communicationDisruptionDriverRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='communicationDisruptionDriverDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe driver briefing' 
                                            disabled={!editable} required={true}
                                            {...register('communicationDisruptionDriverDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='communicationDisruptionDriverDescription' className='form-label'>Driver Briefing Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* CSR section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='communicationDisruptionCSRRequired'
                                        disabled={!editable}
                                        {...register('communicationDisruptionCSRRequired', { onChange: toggleCommunicationDisruptedCSRRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    CSR briefings will be required
                                    <small className='d-block text-muted'>Indicate if CSR briefings need to be considered.</small>
                                </span>
                            </label>
                        </div>
                        { communicationDisruptionCSRRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='communicationDisruptionCSRDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe CSR briefing' 
                                            disabled={!editable} required={true}
                                            {...register('communicationDisruptionCSRDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='communicationDisruptionCSRDescription' className='form-label'>CSR Briefing Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Engineering section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='communicationDisruptionEngineeringRequired'
                                        disabled={!editable}
                                        {...register('communicationDisruptionEngineeringRequired', { onChange: toggleCommunicationDisruptedEngineeringRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Engineering briefings will be required
                                    <small className='d-block text-muted'>Indicate if Engineering briefings need to be considered.</small>
                                </span>
                            </label>
                        </div>
                        { communicationDisruptionEngineeringRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='communicationDisruptionEngineeringDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe any local roadworks' 
                                            disabled={!editable} required={true}
                                            {...register('communicationDisruptionEngineeringDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='communicationDisruptionEngineeringDescription' className='form-label'>Engineering Briefing Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Internal call section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='communicationDisruptionInternalCallsRequired'
                                        disabled={!editable}
                                        {...register('communicationDisruptionInternalCallsRequired', { onChange: toggleCommunicationDisruptedInternalCallsRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Internal calls will be required
                                    <small className='d-block text-muted'>Indicate if internal calls need to be considered.</small>
                                </span>
                            </label>
                        </div>
                        { communicationDisruptionInternalCallsRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='communicationDisruptionInternalCallsDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe any local roadworks' 
                                            disabled={!editable} required={true}
                                            {...register('communicationDisruptionInternalCallsDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='communicationDisruptionInternalCallsDescription' className='form-label'>Internal Calls Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>
                
                {editable
                    ?   <div className='form-floating mb-3'>
                            <button className='w-100 btn btn-lg btn-primary' type='button' onClick={handleSubmit(onSave)}>Save Changes</button>
                        </div>
                    :   null
                }
                <div className='form-floating mb-5'>
                    <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={ toggle }>Close</button>
                </div>
                {request && editable
                    ?   <div className='form-floating'>
                        <button className='w-100 btn btn-lg btn-danger' type='button' onClick={handleSubmit(() => {})}>Delete</button>
                    </div>
                    :   null
                }
            </form>
        </div>
    )
}

export default CommunicationImpactForm;