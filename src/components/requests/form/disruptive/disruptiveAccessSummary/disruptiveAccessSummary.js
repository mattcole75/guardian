import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const DisruptiveAccessSummary = (props) => {

    const { request, save, editable } = props;

    const { register, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: request && request.disruptiveAccessSummary
        
    });

    const onSave = useCallback((data) => {
        save( { disruptiveAccessSummary: data }, 'SAVE_REQUEST');
    }, [save]);

    return (
        <div className='p-3'>
            <div className='text-sm-start'>
                <h3 className='h5 text-muted'>Disruptive Access Summary</h3>
            </div>
            <div className='form-floating mb-3 p-2 text-start'>
                {/* Trams */}
                <p className='h6 mb-0'>Tram Consideration</p>
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='tramPatternDisrupt'
                        disabled={!editable}
                        { ...register('tramPatternDisrupt', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='tramPatternDisrupt'>
                        Tram Service Patterns will be disrupted
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='alterTimetable'
                        disabled={!editable}
                        { ...register('alterTimetable', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='alterTimetable'>
                        Timetable Alterations will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='tramPeakServiceDisrupt'
                        disabled={!editable}
                        { ...register('tramPeakServiceDisrupt', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='tramPeakServiceDisrupt'>
                        Peak Tram Service will be disrupted
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='noDepotStable'
                        disabled={!editable}
                        { ...register('noDepotStable', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='noDepotStable'>
                        Out of Depot Stabling will be required
                    </label>
                </div>

                {/* Buses */}
                <p className='h6 mt-2 mb-0'>Bus Consideration</p>
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='busPatternDisrupt'
                        disabled={!editable}
                        { ...register('busPatternDisrupt', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='busPatternDisrupt'>
                        Bus Service Patterns will be disrupted
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='peakBusService'
                        disabled={!editable}
                        { ...register('peakBusService', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='peakBusService'>
                        Peak Bus Service will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='busServiceCoordinate'
                        disabled={!editable}
                        { ...register('busServiceCoordinate', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='busServiceCoordinate'>
                        Bus Coordination will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='standbyBuses'
                        disabled={!editable}
                        { ...register('standbyBuses', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='standbyBuses'>
                        Standby buses will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='nonStandardBusStops'
                        disabled={!editable}
                        { ...register('nonStandardBusStops', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='nonStandardBusStops'>
                        Non-standard Bus Stops will be in use
                    </label>
                </div>

                {/* Maintenance */}
                <p className='h6 mt-2 mb-0'>Maintenance Consideration</p>                                    
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='maintenanceDisruption'
                        disabled={!editable}
                        { ...register('maintenanceDisruption', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='maintenanceDisruption'>
                        Maintenance activities will be disrupted
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='cleaningDisruption'
                        disabled={!editable}
                        { ...register('cleaningDisruption', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='cleaningDisruption'>
                        Cleaning Activities will be disrupted
                    </label>
                </div>

                {/* Additional Resource */}
                <p className='h6 mt-2 mb-0'>Additional Resource Consideration</p> 
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='taxiTrips'
                        disabled={!editable}
                        { ...register('taxiTrips', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='taxiTrips'>
                        Car/Taxi trips will be required - 
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='csrPresent'
                        disabled={!editable}
                        { ...register('csrPresent', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='csrPresent'>
                        CSR's will be required to be present on Stops
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='welfareFacilities'
                        disabled={!editable}
                        { ...register('welfareFacilities', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='welfareFacilities'>
                        Welfare Facilities will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='pointsOperator'
                        disabled={!editable}
                        { ...register('pointsOperator', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='pointsOperator'>
                        Points Operator(s) will be requires
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='handSignaller'
                        disabled={!editable}
                        { ...register('handSignaller', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='handSignaller'>
                        Hand signaller(s) will be requires
                    </label>
                </div>

                {/* External Factors Resource */}
                <p className='h6 mt-2 mb-0'>External Factors Consideration</p> 
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='specialEvents'
                        disabled={!editable}
                        { ...register('specialEvents', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='specialEvents'>
                        Special events need to be considered
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='security'
                        disabled={!editable}
                        { ...register('security', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='security'>
                        Security will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='localRoadWorks'
                        disabled={!editable}
                        { ...register('localRoadWorks', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='localRoadWorks'>
                        Local unrelated roadworks need to be considered
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='localWorkSite'
                        disabled={!editable}
                        { ...register('localWorkSite', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='localWorkSite'>
                        Local unrelated worksites need to be considered
                    </label>
                </div>

                {/* COMMS */}
                <p className='h6 mt-2 mb-0'>Communication Consideration</p> 
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='additionalSignage'
                        disabled={!editable}
                        { ...register('additionalSignage', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='additionalSignage'>
                        Additional Signage will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='customerComms'
                        disabled={!editable}
                        { ...register('customerComms', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='customerComms'>
                        Customer Comms will need to be considered
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='driverBrief'
                        disabled={!editable}
                        { ...register('driverBrief', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='driverBrief'>
                        A driver briefing will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='csrBrief'
                        disabled={!editable}
                        { ...register('csrBrief', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='csrBrief'>
                        A CSR briefing will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='engineeringBrief'
                        disabled={!editable}
                        { ...register('engineeringBrief', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='engineeringBrief'>
                        An Engineering briefing will be required
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='internalCalls'
                        disabled={!editable}
                        { ...register('internalCalls', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='internalCalls'>
                        Regular Internal Call will be required
                    </label>
                </div>
            </div>
            {editable 
                ? <div>
                    <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={handleSubmit(onSave)}>Save Disruption Summary</button>
                </div>
                : null
            }
        </div>
    );
}

export default DisruptiveAccessSummary;