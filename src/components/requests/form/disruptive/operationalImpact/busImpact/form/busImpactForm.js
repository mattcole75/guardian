import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const BusImpactForm = (props) => {

    const { request, index, editable, save, toggle, setIndex } = props;

    const { register, handleSubmit } = useForm({ 
        mode: 'onChange', 
        defaultValues: ((request == null || request.busServiceDisruptionItems == null) ? null : request.busServiceDisruptionItems[index])
    });

    // const roles = useSelector(state => state.auth.roles);

    // const [locations, setLocations] = useState([]);

    const [busCoordinatorRequired, setBusCoordinatorRequired] = useState((index !== null) ? request.busServiceDisruptionItems[index].busCoordinatorRequired : false);
    const [standbyBusesRequired, setStandbyBusesRequired] = useState((index !== null) ? request.busServiceDisruptionItems[index].standbyBusesRequired : false);
    const [alternativeBusStopsInUse, setAlternativeBusStopsInUse] = useState((index !== null) ? request.busServiceDisruptionItems[index].alternativeBusStopsInUse : false);

    const toggleBusCoordinatorRequired = () => {
        setBusCoordinatorRequired(prevState => !prevState);
    }
    const toggleStandbyBusesRequired = () => {
        setStandbyBusesRequired(prevState => !prevState);
    }
    const toggleAlternativeBusStopsInUse = () => {
        setAlternativeBusStopsInUse(prevState => !prevState);
    }

    const onSave = useCallback((data) => {

        let updatedBusServiceDisruptionItems = [];

        // add new tram service disruption item to existing access request
        if(request && index === null) {
            if(request.busServiceDisruptionItems && request.busServiceDisruptionItems.length > 0)
            updatedBusServiceDisruptionItems = [ ...request.busServiceDisruptionItems ];

            updatedBusServiceDisruptionItems.push(data);
            save({ busServiceDisruptionItems: updatedBusServiceDisruptionItems });
        }
        
        // update existing tram service disruption item
        if (request && index !== null) {
            updatedBusServiceDisruptionItems = [ ...request.busServiceDisruptionItems ];
            updatedBusServiceDisruptionItems[index] = data;
            save({ busServiceDisruptionItems: updatedBusServiceDisruptionItems });
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
                <h1 className='h3 mb-3 fw-normal text-start'>Bus Service Disruption</h1>

                {/* Bus replacement section */}
                <div className='border rounded p-1 mb-3 bg-light'>  
                    <div className='input-group'>

                    

                        
                        <div className='w-100'>

                            <div className='form-floating mb-3'>
                                <input 
                                    type='text'
                                    className='form-control'
                                    id='busReplacementServiceTitle'
                                    autoComplete='off'
                                    placeholder='Bus Replacement Title'
                                    minLength={3}
                                    maxLength={30}
                                    required
                                    disabled={!editable}
                                    {...register('busReplacementServiceTitle', { required: true, minLength: 3, maxLength: 30 })} />
                                <label htmlFor='busReplacementServiceTitle' className='form-label'>Bus Replacement Title</label>
                            </div>

                            <div className='form-floating'>
                                <textarea className='form-control' id='busReplacementServiceDescription'  
                                    rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the bus service replacement' 
                                    disabled={!editable} required={false}
                                    {...register('busReplacementServiceDescription', { minLength: 5, required: false })}
                                />
                                <label htmlFor='busReplacementServiceDescription' className='form-label'>Bus Replacement Description</label>
                            </div>

                        </div>
                            
                    </div>
                </div>

                {/* Bus Coordinator section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='busCoordinatorRequired'
                                        disabled={!editable}
                                        {...register('busCoordinatorRequired', { onChange: toggleBusCoordinatorRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Bus coordinator(s) will be required
                                    <small className='d-block text-muted'>Indicate if one or more bus coordinators will be required.</small>
                                </span>
                            </label>
                        </div>
                        { busCoordinatorRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='busCoordinationDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe bus coordination requirements' 
                                            disabled={!editable} required={false}
                                            {...register('busCoordinationDescription', { minLength: 5, required: false })}
                                        />
                                        <label htmlFor='busCoordinationDescription' className='form-label'>Bus Coordination Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Standby bus section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='standbyBusesRequired'
                                        disabled={!editable}
                                        {...register('standbyBusesRequired', { onChange: toggleStandbyBusesRequired })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Standby buses will be required
                                    <small className='d-block text-muted'>Indicate if standby buses will be required.</small>
                                </span>
                            </label>
                        </div>
                        { standbyBusesRequired
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='standbyBusesDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the standby bus requirements' 
                                            disabled={!editable} required={false}
                                            {...register('standbyBusesDescription', { minLength: 5, required: false })}
                                        />
                                        <label htmlFor='standbyBusesDescription' className='form-label'>Standby Buses Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* Alternative bus stops in use section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='alternateBusStops'
                                        disabled={!editable}
                                        {...register('alternateBusStops', { onChange: toggleAlternativeBusStopsInUse })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Alternative bus stops will be in use
                                    <small className='d-block text-muted'>Indicate if alternative bus stops will be in use.</small>
                                </span>
                            </label>
                        </div>
                        { alternativeBusStopsInUse
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='alternativeBusStopDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the alternative bus stops' 
                                            disabled={!editable} required={false}
                                            {...register('alternativeBusStopDescription', { minLength: 5, required: false })}
                                        />
                                        <label htmlFor='alternativeBusStopDescription' className='form-label'>Alternative Bus Stop Description</label>
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

export default BusImpactForm;