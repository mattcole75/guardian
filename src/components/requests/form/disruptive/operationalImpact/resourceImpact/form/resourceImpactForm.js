import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const ResourceImpactForm = (props) => {

    const { request, index, editable, save, toggle, setIndex } = props;

    const { register, handleSubmit } = useForm({ 
        mode: 'onChange', 
        defaultValues: ((request == null || request.resourceDisruptionItems == null) ? null : request.resourceDisruptionItems[index])
    });

    // const roles = useSelector(state => state.auth.roles);

    // const [locations, setLocations] = useState([]);

    const [resourceDisruptionTransportationRequired, setResourceDisruptionTransportationRequired] = useState((index !== null) ? request.resourceDisruptionItems[index].resourceDisruptedCarTaxiRequired : false);
    const [resourceDisruptionCSRsRequired, setResourceDisruptionCSRsRequired] = useState((index !== null) ? request.resourceDisruptionItems[index].resourceDisruptionCSRsRequired : false);
    const [resourceDisruptionWellfareRequired, setResourceDisruptionWellfareRequired] = useState((index !== null) ? request.resourceDisruptionItems[index].resourceDisruptionWellfareRequired : false);
    const [resourceDisruptionPointsOperatorRequired, setResourceDisruptionPointsOperatorRequired] = useState((index !== null) ? request.resourceDisruptionItems[index].resourceDisruptionPointsOperatorRequired : false);
    const [resourceDisruptionHandSignallerRequired, setResourceDisruptionHandSignallerRequired] = useState((index !== null) ? request.resourceDisruptionItems[index].signallingResourceRequired : false);
    // const [testTramsRequired, setTestTramsRequired] = useState((index !== null) ? request.locationLimitItems[index].testTramsRequired : false);

    const toggleResourceDisruptedTransportationRequired = () => {
        setResourceDisruptionTransportationRequired(prevState => !prevState);
    }
    const toggleResourceDisruptedCSRsRequired = () => {
        setResourceDisruptionCSRsRequired(prevState => !prevState);
    }
    const toggleResourceDisruptedWellfareRequired = () => {
        setResourceDisruptionWellfareRequired(prevState => !prevState);
    }
    const toggleResourceDisruptedPointsOperatorRequired = () => {
        setResourceDisruptionPointsOperatorRequired(prevState => !prevState);
    }
    const toggleResourceDisruptedHandSignallerRequired = () => {
        setResourceDisruptionHandSignallerRequired(prevState => !prevState);
    }

    const onSave = useCallback((data) => {

        let updatedResourceDisruptionItems = [];

        // add new tram service disruption item to existing access request
        if(request && index === null) {
            if(request.resourceDisruptionItems && request.resourceDisruptionItems.length > 0)
            updatedResourceDisruptionItems = [ ...request.resourceDisruptionItems ];

            updatedResourceDisruptionItems.push(data);
            save({ resourceDisruptionItems: updatedResourceDisruptionItems });
        }
        
        // update existing tram service disruption item
        if (request && index !== null) {
            updatedResourceDisruptionItems = [ ...request.resourceDisruptionItems ];
            updatedResourceDisruptionItems[index] = data;
            save({ resourceDisruptionItems: updatedResourceDisruptionItems });
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
                <h1 className='h3 mb-3 fw-normal text-start'>Resource Disruption</h1>

                {/* resource disruption title and description */}
                <div className='border rounded p-1 mb-3 bg-light'>  
                    <div className='input-group'>

                        <div className='w-100'>
                            <div className='form-floating mb-3'>
                                <input 
                                    type='text'
                                    className='form-control'
                                    id='resourceDisruptionTitle'
                                    autoComplete='off'
                                    placeholder='Resource Disruption Title'
                                    minLength={3}
                                    maxLength={30}
                                    required
                                    disabled={!editable}
                                    {...register('resourceDisruptionTitle', { required: true, minLength: 3, maxLength: 30 })} />
                                <label htmlFor='resourceDisruptionTitle' className='form-label'>Resource Disruption Title</label>
                            </div>

                            <div className='form-floating'>
                                <textarea className='form-control' id='resourceDisruptionDescription'  
                                    rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the resource disruption' 
                                    disabled={!editable} required
                                    {...register('resourceDisruptionDescription', { minLength: 5, required: true })}
                                />
                                <label htmlFor='resourceDisruptionDescription' className='form-label'>Resource Disruption Description</label>
                            </div>
                        </div>
                            
                    </div>
                </div>

                {/* resource transportation section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='resourceDisruptedCarTaxiRequired'
                                        disabled={!editable}
                                        {...register('resourceDisruptedCarTaxiRequired', { onChange: toggleResourceDisruptedTransportationRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Resource transportation will be required
                                    <small className='d-block text-muted'>Indicate if people need to be transported around the network.</small>
                                </span>
                            </label>
                        </div>
                        { resourceDisruptionTransportationRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating mb-1'>
                                        <select className='form-select' id='resourceDisruptionTransportationType' required disabled={!editable}
                                            {...register('resourceDisruptionTransportationType', { required: true })}>
                                            <option value=''>Choose...</option>
                                            <option>Car Rides</option>
                                            <option>Taxi Rides</option>
                                            <option>Tram Rides</option>
                                            <option>Other</option>
                                        </select>
                                        <label htmlFor='resourceDisruptionTransportationType'>Ride Type</label>
                                    </div>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='resourceDisruptionTransportationDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe how resource will be transported' 
                                            disabled={!editable} required
                                            {...register('resourceDisruptionTransportationDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='resourceDisruptionTransportationDescription' className='form-label'>Resource Transport Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* csr'ssection */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='resourceDisruptedCSRsRequired'
                                        disabled={!editable}
                                        {...register('resourceDisruptedCSRsRequired', { onChange: toggleResourceDisruptedCSRsRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Customer Service Representatives will be required
                                    <small className='d-block text-muted'>Indicate if Customer Service Representatives (CSR's will be required on location.).</small>
                                </span>
                            </label>
                        </div>
                        { resourceDisruptionCSRsRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='resourceDisruptedCSRsDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the CSR requirements' 
                                            disabled={!editable} required={false}
                                            {...register('resourceDisruptedCSRsDescription', { minLength: 5, required: false })}
                                        />
                                        <label htmlFor='resourceDisruptedCSRsDescription' className='form-label'>CSR Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Wellfare section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='resourceDisruptionWellfareRequired'
                                        disabled={!editable}
                                        {...register('resourceDisruptionWellfareRequired', { onChange: toggleResourceDisruptedWellfareRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Resource wellfare facilities will be required
                                    <small className='d-block text-muted'>Indicate if wellfare facilities will be required.</small>
                                </span>
                            </label>
                        </div>
                        { resourceDisruptionWellfareRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='resourceDisruptionWellfareDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the staff wellfare facilities' 
                                            disabled={!editable} required={true}
                                            {...register('resourceDisruptionWellfareDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='resourceDisruptionWellfareDescription' className='form-label'>Wellfare Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Point Machine Operator Section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='resourceDisruptionPointsOperatorRequired'
                                        disabled={!editable}
                                        {...register('resourceDisruptionPointsOperatorRequired', { onChange: toggleResourceDisruptedPointsOperatorRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Point Machine Operator(s) will be required
                                    <small className='d-block text-muted'>Indicate if Point Machine Operator(s) are required.</small>
                                </span>
                            </label>
                        </div>
                        { resourceDisruptionPointsOperatorRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='resourceDisruptionPointsOperatorDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the staff wellfare facilities' 
                                            disabled={!editable} required={true}
                                            {...register('resourceDisruptionPointsOperatorDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='resourceDisruptionPointsOperatorDescription' className='form-label'>Points Operator(s) Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Hand Signallers Section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='resourceDisruptionHandSignallerRequired'
                                        disabled={!editable}
                                        {...register('resourceDisruptionHandSignallerRequired', { onChange: toggleResourceDisruptedHandSignallerRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Hand Signallers will be required
                                    <small className='d-block text-muted'>Indicate if Hand Signallers are required.</small>
                                </span>
                            </label>
                        </div>
                        { resourceDisruptionHandSignallerRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='resourceDisruptionHandSignallerDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the staff wellfare facilities' 
                                            disabled={!editable} required={true}
                                            {...register('resourceDisruptionHandSignallerDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='resourceDisruptionHandSignallerDescription' className='form-label'>Hand Signaller Description</label>
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

export default ResourceImpactForm;