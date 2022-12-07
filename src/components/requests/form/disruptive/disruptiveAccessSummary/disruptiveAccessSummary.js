import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const DisruptiveAccessSummary = (props) => {

    const { request, save, roles } = props;

    const { disruptiveAccessSummary, disruptiveStatus } = request;
    
    const isPlanner = roles.includes('planner');

    let isLocked = false;
    if(disruptiveStatus === 'Submitted' || disruptiveStatus === 'Approved'){
        isLocked = true;
    }

    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: request && disruptiveAccessSummary
        
    });

     const onUpdate = debounce(() => {
        save({ disruptiveAccessSummary: getValues() });
    }, 1000);

    return (
        <form className='p-3' disabled={true}>
            <fieldset disabled={ (!isPlanner && !isLocked) || isLocked }>

                <div className='text-sm-start'>
                    <h3 className='h5 text-muted'>Disruptive Access Summary</h3>
                </div>
                <div className='form-floating p-2 text-start'>
                    {/* Trams */}
                    <p className='h6 mb-0'>Tram Consideration</p>
                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='tramPatternDisrupt'
                            { ...register('tramPatternDisrupt', { onChange: onUpdate })}
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
                            { ...register('alterTimetable', { onChange: onUpdate })}
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
                            { ...register('tramPeakServiceDisrupt', { onChange: onUpdate })}
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
                            { ...register('noDepotStable', { onChange: onUpdate })}
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
                            { ...register('busPatternDisrupt', { onChange: onUpdate })}
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
                            { ...register('peakBusService', { onChange: onUpdate })}
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
                            { ...register('busServiceCoordinate', { onChange: onUpdate })}
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
                            { ...register('standbyBuses', { onChange: onUpdate })}
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
                            { ...register('nonStandardBusStops', { onChange: onUpdate })}
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
                            { ...register('maintenanceDisruption', { onChange: onUpdate })}
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
                            { ...register('cleaningDisruption', { onChange: onUpdate })}
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
                            { ...register('taxiTrips', { onChange: onUpdate })}
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
                            { ...register('csrPresent', { onChange: onUpdate })}
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
                            { ...register('welfareFacilities', { onChange: onUpdate })}
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
                            { ...register('pointsOperator', { onChange: onUpdate })}
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
                            { ...register('handSignaller', { onChange: onUpdate })}
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
                            { ...register('specialEvents', { onChange: onUpdate })}
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
                            { ...register('security', { onChange: onUpdate })}
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
                            { ...register('localRoadWorks', { onChange: onUpdate })}
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
                            { ...register('localWorkSite', { onChange: onUpdate })}
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
                            { ...register('additionalSignage', { onChange: onUpdate })}
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
                            { ...register('customerComms', { onChange: onUpdate })}
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
                            { ...register('driverBrief', { onChange: onUpdate })}
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
                            { ...register('csrBrief', { onChange: onUpdate })}
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
                            { ...register('engineeringBrief', { onChange: onUpdate })}
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
                            { ...register('internalCalls', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='internalCalls'>
                            Regular Internal Call will be required
                        </label>
                    </div>
                </div>
            </fieldset>
        </form>
    );
}

export default DisruptiveAccessSummary;