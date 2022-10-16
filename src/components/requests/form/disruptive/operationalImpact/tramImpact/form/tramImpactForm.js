import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import routes from '../../../../../../../data/routes';

const TramImpactForm = (props) => {

    const { request, index, editable, save, toggle, setIndex } = props;

    const { register, handleSubmit } = useForm({ 
        mode: 'onChange', 
        defaultValues: ((request == null || request.tramServiceDisruptionItems == null) ? null : request.tramServiceDisruptionItems[index])
    });

    // const roles = useSelector(state => state.auth.roles);

    // const [locations, setLocations] = useState([]);

    const [tramTimetableChange, setTramTimetableChange] = useState((index !== null) ? request.tramServiceDisruptionItems[index].tramTimetableDisruption : false);
    const [tramPeakService, setTramPeakService] = useState((index !== null) ? request.tramServiceDisruptionItems[index].tramPeakServiceDisruption : false);
    const [tramStabling, setTramStabling] = useState((index !== null) ? request.tramServiceDisruptionItems[index].tramStablingDisruption : false);

    // const [tramServicePatternDisruption, setTramServicePatternDisruption] = useState((index !== null) ? request.locationLimitItems[index].electricalIsolationRequired : false);
    // const [signallingResourceRequired, setSignallingResourceRequired] = useState((index !== null) ? request.locationLimitItems[index].signallingResourceRequired : false);
    // const [testTramsRequired, setTestTramsRequired] = useState((index !== null) ? request.locationLimitItems[index].testTramsRequired : false);

    const toggleTramTimetableChange = () => {
        setTramTimetableChange(prevState => !prevState);
    }
    const toggleTramPeakService = () => {
        setTramPeakService(prevState => !prevState);
    }
    const toggleTramStablingDisruption = () => {
        setTramStabling(prevState => !prevState);
    }

    const onSave = useCallback((data) => {

        let updatedTramServiceDisruptionItems = [];

        // add new tram service disruption item to existing access request
        if(request && index === null) {
            if(request.tramServiceDisruptionItems && request.tramServiceDisruptionItems.length > 0)
                updatedTramServiceDisruptionItems = [ ...request.tramServiceDisruptionItems ];

            updatedTramServiceDisruptionItems.push(data);
            save({ tramServiceDisruptionItems: updatedTramServiceDisruptionItems });
        }
        
        // update existing tram service disruption item
        if (request && index !== null) {
            updatedTramServiceDisruptionItems = [ ...request.tramServiceDisruptionItems ];
            updatedTramServiceDisruptionItems[index] = data;
            save({ tramServiceDisruptionItems: updatedTramServiceDisruptionItems });
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
                <h1 className='h3 mb-3 fw-normal text-start'>Tram Service Disruption</h1>

                {/* tram service pattern section */}
                <div className='border rounded p-1 mb-3 bg-light'>  
                    <div className='input-group'>

                        <div className='w-100'>
                            <div className='form-floating mb-1'>
                                <select className='form-select' id='serviceRouteDisrupted' required disabled={!editable}
                                    {...register('serviceRouteDisrupted', { required: true })}>
                                    <option value=''>Choose...</option>
                                    {
                                        routes.map(item => {
                                            return (<option key={item.name} value={item.name}>{item.name}</option>)
                                        })
                                    }
                                </select>
                                <label htmlFor='serviceDisruptedRoute'>Service Route Disrupted</label>
                            </div>
                            <div className='form-floating'>
                                <textarea className='form-control' id='serviceRouteDisruptionDescription'  
                                    rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the service route disruption' 
                                    disabled={!editable} required={false}
                                    {...register('serviceRouteDisruptionDescription', { minLength: 5, required: false })}
                                />
                                <label htmlFor='serviceRouteDisruptionDescription' className='form-label'>Route Disruption Description</label>
                            </div>
                        </div>
                            
                    </div>
                </div>

                {/* timetable change section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='tramTimetableDisruption'
                                        disabled={!editable}
                                        {...register('tramTimetableDisruption', { onChange: toggleTramTimetableChange })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Tram timetable will need changing
                                    <small className='d-block text-muted'>Indicate if the tram timetable will need to be changed.</small>
                                </span>
                            </label>
                        </div>
                        { tramTimetableChange
                            ?   <div className='w-100'>
                                    <div className='form-floating mb-1'>
                                        <select className='form-select' id='timetableDisruptionAffect' required disabled={!editable}
                                            {...register('timetableDisruptionAffect', { required: true })}>
                                            <option value=''>Choose...</option>
                                            <option>Minor Changes</option>
                                            <option>Major Changes</option>
                                        </select>
                                        <label htmlFor='timetableDisruptionAffect'>Timetable Affect</label>
                                    </div>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='timetableDisruptionDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the timetable disruption' 
                                            disabled={!editable} required={false}
                                            {...register('timetableDisruptionDescription', { minLength: 5, required: false })}
                                        />
                                        <label htmlFor='timetableDisruptionDescription' className='form-label'>Timetable Disruption Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* tram peak services section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='tramPeakServiceDisruption'
                                        disabled={!editable}
                                        {...register('tramPeakServiceDisruption', { onChange: toggleTramPeakService })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Tram peak services will be disrupted
                                    <small className='d-block text-muted'>Indicate if the tram peak services will be disrupted.</small>
                                </span>
                            </label>
                        </div>
                        { tramPeakService
                            ?   <div className='w-100'>
                                    <div className='form-floating mb-1'>
                                        <select className='form-select' id='peakServiceDisruptionAffect' required disabled={!editable}
                                            {...register('peakServiceDisruptionAffect', { required: true })}>
                                            <option value=''>Choose...</option>
                                            <option>Minor Disruption</option>
                                            <option>Major Disruption</option>
                                        </select>
                                        <label htmlFor='peakServiceDisruptionAffect'>Peak Service Affect</label>
                                    </div>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='peakServiceDisruptionDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the peak service disruption' 
                                            disabled={!editable} required={false}
                                            {...register('peakServiceDisruptionDescription', { minLength: 5, required: false })}
                                        />
                                        <label htmlFor='peakServiceDisruptionDescription' className='form-label'>Peak Service Disruption Description</label>
                                    </div>
                                </div>
                            :   null
                        }
                    </div>
                </div>

                {/* out of depot stabling */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='input-group'>
                        <div className='list-group w-100 mb-1'>
                            <label className='list-group-item d-flex gap-2'>
                                <div className='form-check form-switch'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='tramStablingDisruption'
                                        disabled={!editable}
                                        {...register('tramStablingDisruption', { onChange: toggleTramStablingDisruption })}
                                    />
                                </div>
                                <span className='text-start'>
                                    Tram stabling will be disrupted
                                    <small className='d-block text-muted'>Indicate if the tram stabling will be disrupted.</small>
                                </span>
                            </label>
                        </div>
                        { tramStabling
                            ?   <div className='w-100'>
                                    <div className='form-floating'>
                                        <textarea className='form-control' id='tramStablingDisruptionDescription'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the tram stabling arangements' 
                                            disabled={!editable} required={false}
                                            {...register('tramStablingDisruptionDescription', { minLength: 5, required: false })}
                                        />
                                        <label htmlFor='tramStablingDisruptionDescription' className='form-label'>Tram Stabling Description</label>
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

export default TramImpactForm;