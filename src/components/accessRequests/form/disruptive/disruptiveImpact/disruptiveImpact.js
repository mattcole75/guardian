import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const DisruptiveImapct = (props) => {

    const { disruptive, save, roles } = props;
    

    // const { disruptiveAccessSummary, disruptiveStatus } = request;
    
    const isPlanner = roles.includes('planner');

    let isLocked = false;
    // if(disruptiveStatus === 'Submitted' || disruptiveStatus === 'Approved'){
    //     isLocked = true;
    // }

    const { register, getValues } = useForm({ 
        mode: 'onChange',
        defaultValues: {
            tramServiceDisrupted: disruptive && disruptive.impact && disruptive.impact.includes('tramServiceDisrupted') ? true : false,
            tramTimetableDisrupted: disruptive && disruptive.impact && disruptive.impact.includes('tramTimetableDisrupted') ? true : false,
            tramPeakServiceDisrupted: disruptive && disruptive.impact && disruptive.impact.includes('tramPeakServiceDisrupted') ? true : false,
            tramDepotStablingDisrupted: disruptive && disruptive.impact && disruptive.impact.includes('tramDepotStablingDisrupted') ? true : false,
            busReplacementRequired: disruptive && disruptive.impact && disruptive.impact.includes('busReplacementRequired') ? true : false,
            BusPeakServiceRequired: disruptive && disruptive.impact && disruptive.impact.includes('BusPeakServiceRequired') ? true : false,
            busCoordinatorRequired: disruptive && disruptive.impact && disruptive.impact.includes('busCoordinatorRequired') ? true : false,
            standbyBusesRequired: disruptive && disruptive.impact && disruptive.impact.includes('standbyBusesRequired') ? true : false,
            nonStandardBusStopsInUse: disruptive && disruptive.impact && disruptive.impact.includes('nonStandardBusStopsInUse') ? true : false,
            maintenanceDisrupted: disruptive && disruptive.impact && disruptive.impact.includes('maintenanceDisrupted') ? true : false,
            cleaningDisrupted: disruptive && disruptive.impact && disruptive.impact.includes('cleaningDisrupted') ? true : false,
            taxiTripsRequired: disruptive && disruptive.impact && disruptive.impact.includes('taxiTripsRequired') ? true : false,
            csrPresenceRequired: disruptive && disruptive.impact && disruptive.impact.includes('.csrPresenceRequired') ? true : false,
            welfareFacilitiesRequired: disruptive && disruptive.impact && disruptive.impact.includes('welfareFacilitiesRequired') ? true : false,
            pointsOperatorRequired: disruptive && disruptive.impact && disruptive.impact.includes('pointsOperatorRequired') ? true : false,
            handSignallerRequired: disruptive && disruptive.impact && disruptive.impact.includes('handSignallerRequired') ? true : false,
            specialEvents: disruptive && disruptive.impact && disruptive.impact.includes('specialEvents') ? true : false,
            security: disruptive && disruptive.impact && disruptive.impact.includes('security') ? true : false,
            localRoadWorks: disruptive && disruptive.impact && disruptive.impact.includes('localRoadWorks') ? true : false,
            localWorkSite: disruptive && disruptive.impact && disruptive.impact.includes('localWorkSite') ? true : false,
            additionalSignage: disruptive && disruptive.impact && disruptive.impact.includes('additionalSignage') ? true : false,
            customerComms: disruptive && disruptive.impact && disruptive.impact.includes('customerComms') ? true : false,
            driverBrief: disruptive && disruptive.impact && disruptive.impact.includes('driverBrief') ? true : false,
            csrBrief: disruptive && disruptive.impact && disruptive.impact.includes('csrBrief') ? true : false,
            engineeringBrief: disruptive && disruptive.impact && disruptive.impact.includes('engineeringBrief') ? true : false,
            internalCalls: disruptive && disruptive.impact && disruptive.impact.includes('internalCalls') ? true : false
        }
    });
        
    // });

     const onUpdate = debounce(() => {
        // save({ disruptiveAccessSummary: getValues() });
    }, 1000);

    return (
        <form className='p-3' disabled={true}>
            <fieldset disabled={ (!isPlanner && !isLocked) || isLocked }>

                <div className='text-sm-start'>
                    <h3 className='h5 text-muted'>Disruptive Access Summary</h3>
                </div>
                <div className='form-floating p-2 text-start'>
                    {/* Trams */}
                    <p className='h6 mb-0'>Tram Service Disruption disruptive.impact</p>
                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='tramServiceDisrupted'
                            { ...register('tramServiceDisrupted', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='tramServiceDisrupted'>
                            Tram Service Patterns will be disrupted
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='tramTimetableDisrupted'
                            { ...register('tramTimetableDisrupted', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='tramTimetableDisrupted'>
                            Tram Timetable Alterations will be required
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='tramPeakServiceDisrupted'
                            { ...register('tramPeakServiceDisrupted', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='tramPeakServiceDisrupted'>
                            Peak Tram Service will be disrupted
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='tramDepotStablingDisrupted'
                            { ...register('tramDepotStablingDisrupted', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='tramDepotStablingDisrupted'>
                            Out of Depot Stabling will be required
                        </label>
                    </div>

                    {/* Buses */}
                    <p className='h6 mt-2 mb-0'>Bus Replacement Requirements</p>
                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='busReplacementRequired'
                            { ...register('busReplacementRequired', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='busReplacementRequired'>
                            Rail Replacement Bus Service will be required
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='BusPeakServiceRequired'
                            { ...register('BusPeakServiceRequired', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='BusPeakServiceRequired'>
                            Peak Bus Service will be required
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='busCoordinatorRequired'
                            { ...register('busCoordinatorRequired', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='busCoordinatorRequired'>
                            Bus Coordination will be required
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='standbyBusesRequired'
                            { ...register('standbyBusesRequired', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='standbyBusesRequired'>
                            Standby buses will be required
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='nonStandardBusStopsInUse'
                            { ...register('nonStandardBusStopsInUse', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='nonStandardBusStopsInUse'>
                            Non-standard Bus Stops will be in use
                        </label>
                    </div>

                    {/* Maintenance */}
                    <p className='h6 mt-2 mb-0'>Maintenance disruptive.impact</p>                                    
                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='maintenanceDisrupted'
                            { ...register('maintenanceDisrupted', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='maintenanceDisrupted'>
                            Maintenance activities will be disrupted
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='cleaningDisrupted'
                            { ...register('cleaningDisrupted', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='cleaningDisrupted'>
                            Cleaning Activities will be disrupted
                        </label>
                    </div>

                    {/* Additional Resource */}
                    <p className='h6 mt-2 mb-0'>Resource disruptive.impact</p> 
                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='taxiTripsRequired'
                            { ...register('taxiTripsRequired', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='taxiTripsRequired'>
                            Car/Taxi trips will be required for staff 
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='csrPresenceRequired'
                            { ...register('csrPresenceRequired', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='csrPresenceRequired'>
                            CSR's will be required to be present on Stops
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='welfareFacilitiesRequired'
                            { ...register('welfareFacilitiesRequired', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='welfareFacilitiesRequired'>
                            Welfare Facilities will be required
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='pointsOperatorRequired'
                            { ...register('pointsOperatorRequired', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='pointsOperatorRequired'>
                            Points Operator(s) will be requires
                        </label>
                    </div>

                    <div className='form-check form-switch primary text-start'>
                        <input 
                            className='form-check-input'
                            type='checkbox'
                            role='switch'
                            id='handSignallerRequired'
                            { ...register('handSignallerRequired', { onChange: onUpdate })}
                        />
                        <label className='form-check-label' htmlFor='handSignallerRequired'>
                            Hand signaller(s) will be requires
                        </label>
                    </div>

                    {/* External Factors Resource */}
                    <p className='h6 mt-2 mb-0'>External Factors</p> 
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

export default DisruptiveImapct;