import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const ExternalImpactForm = (props) => {

    const { request, index, editable, save, toggle, setIndex } = props;

    const { register, handleSubmit } = useForm({ 
        mode: 'onChange', 
        defaultValues: ((request == null || request.externalDisruptionItems == null) ? null : request.externalDisruptionItems[index])
    });

    // const roles = useSelector(state => state.auth.roles);

    // const [locations, setLocations] = useState([]);

    const [externalDisruptedEventsRequired, setExternalDisruptedEventsRequired] = useState((index !== null) ? request.externalDisruptionItems[index].externalDisruptedEventsRequired : false);
    const [externalDisruptedSecurityRequired, setExternalDisruptedSecurityRequired] = useState((index !== null) ? request.externalDisruptionItems[index].externalDisruptedSecurityRequired : false);
    const [externalDisruptionRoadworksRequired, setExternalDisruptionRoadworksRequired] = useState((index !== null) ? request.externalDisruptionItems[index].externalDisruptionRoadworksRequired : false);
    const [externalDisruptionWorksitesRequired, setExternalDisruptionWorksitesRequired] = useState((index !== null) ? request.externalDisruptionItems[index].externalDisruptionWorksitesRequired : false);

    const toggleExternalDisruptedEventsRequired = () => {
        setExternalDisruptedEventsRequired(prevState => !prevState);
    }
    const toggleExternalDisruptedSecurityRequired = () => {
        setExternalDisruptedSecurityRequired(prevState => !prevState);
    }
    const toggleExternalDisruptedRoadworksRequired = () => {
        setExternalDisruptionRoadworksRequired(prevState => !prevState);
    }
    const toggleExternalDisruptedWorksitesRequired = () => {
        setExternalDisruptionWorksitesRequired(prevState => !prevState);
    }

    const onSave = useCallback((data) => {

        let updatedExternalDisruptionItems = [];

        // add new tram service disruption item to existing access request
        if(request && index === null) {
            if(request.externalDisruptionItems && request.externalDisruptionItems.length > 0)
            updatedExternalDisruptionItems = [ ...request.externalDisruptionItems ];

            updatedExternalDisruptionItems.push(data);
            save({ externalDisruptionItems: updatedExternalDisruptionItems });
        }
        
        // update existing tram service disruption item
        if (request && index !== null) {
            updatedExternalDisruptionItems = [ ...request.externalDisruptionItems ];
            updatedExternalDisruptionItems[index] = data;
            save({ externalDisruptionItems: updatedExternalDisruptionItems });
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
                <h1 className='h3 mb-3 fw-normal text-start'>External Disruption</h1>

                {/* external disruption title and description */}
                <div className='border rounded p-1 mb-3 bg-light'>  
                    <div className='input-group'>

                        <div className='w-100'>
                            <div className='form-floating mb-3'>
                                <input 
                                    type='text'
                                    className='form-control'
                                    id='externalDisruptionTitle'
                                    autoComplete='off'
                                    placeholder='External Disruption Title'
                                    minLength={3}
                                    maxLength={30}
                                    required
                                    disabled={!editable}
                                    {...register('externalDisruptionTitle', { required: true, minLength: 3, maxLength: 30 })} />
                                <label htmlFor='externalDisruptionTitle' className='form-label'>External Disruption Title</label>
                            </div>

                            <div className='form-floating'>
                                <textarea className='form-control' id='externalDisruptionDescription'  
                                    rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the resource disruption' 
                                    disabled={!editable} required
                                    {...register('externalDisruptionDescription', { minLength: 5, required: true })}
                                />
                                <label htmlFor='externalDisruptionDescription' className='form-label'>External Disruption Description</label>
                            </div>
                        </div>
                            
                    </div>
                </div>

                {/* special events section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='externalDisruptedEventsRequired'
                                        disabled={!editable}
                                        {...register('externalDisruptedEventsRequired', { onChange: toggleExternalDisruptedEventsRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Special events should be considered
                                    <small className='d-block text-muted'>Indicate if special events will impact on this access request.</small>
                                </span>
                            </label>
                        </div>
                        { externalDisruptedEventsRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating mb-1'>
                                        <select className='form-select' id='externalDisruptionEventType' required disabled={!editable}
                                            {...register('externalDisruptionEventType', { required: true })}>
                                            <option value=''>Choose...</option>
                                            <option>Consert</option>
                                            <option>Festival</option>
                                            <option>Political</option>
                                            <option>Protest</option>
                                            <option>Sporting</option>
                                            <option>Other</option>
                                        </select>
                                        <label htmlFor='externalDisruptionEventType'>Event Type</label>
                                    </div>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='externalDisruptionEventDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the external event' 
                                            disabled={!editable} required
                                            {...register('externalDisruptionEventDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='externalDisruptionEventDescription' className='form-label'>Event Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* security section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='externalDisruptedSecurityRequired'
                                        disabled={!editable}
                                        {...register('externalDisruptedSecurityRequired', { onChange: toggleExternalDisruptedSecurityRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Security Services will be required
                                    <small className='d-block text-muted'>Indicate if security services will be required.</small>
                                </span>
                            </label>
                        </div>
                        { externalDisruptedSecurityRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='externalDisruptedSecurityDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the security requirements' 
                                            disabled={!editable} required={false}
                                            {...register('externalDisruptedSecurityDescription', { minLength: 5, required: false })}
                                        />
                                        <label htmlFor='externalDisruptedSecurityDescription' className='form-label'>Security Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Roadworks section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='externalDisruptionRoadworksRequired'
                                        disabled={!editable}
                                        {...register('externalDisruptionRoadworksRequired', { onChange: toggleExternalDisruptedRoadworksRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Local roadworks need to be considered
                                    <small className='d-block text-muted'>Indicate if local roadworks need to be considered.</small>
                                </span>
                            </label>
                        </div>
                        { externalDisruptionRoadworksRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='externalDisruptionRoadworksDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe any local roadworks' 
                                            disabled={!editable} required={true}
                                            {...register('externalDisruptionRoadworksDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='externalDisruptionRoadworksDescription' className='form-label'>Local Roadworks Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Worksites section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='externalDisruptionWorksitesRequired'
                                        disabled={!editable}
                                        {...register('externalDisruptionWorksitesRequired', { onChange: toggleExternalDisruptedWorksitesRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Local worksites need to be considered
                                    <small className='d-block text-muted'>Indicate if local worksites need to be considered.</small>
                                </span>
                            </label>
                        </div>
                        { externalDisruptionWorksitesRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='externalDisruptionWorksitesDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe any local worksites' 
                                            disabled={!editable} required={true}
                                            {...register('externalDisruptionWorksitesDescription', { minLength: 5, required: true })}
                                        />
                                        <label htmlFor='externalDisruptionWorksitesDescription' className='form-label'>Local Worksites Description</label>
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

export default ExternalImpactForm;