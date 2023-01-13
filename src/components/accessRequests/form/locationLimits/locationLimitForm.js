import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import locationList from '../../../../data/locations';
import LocationListItem from './locationListItem';
import moment from 'moment';
import { determinStartDate, determinEndDate } from '../../../../shared/utility';


const LocationLimitForm = (props) => {

    const { accessRequest, index, recordLocked, save, toggle } = props;

    const { register, handleSubmit, formState } = useForm({ 
        mode: 'onChange', 
        defaultValues: ((accessRequest == null || accessRequest.locationLimitItems == null) ? null : accessRequest.locationLimitItems[index])
    });

    const auth = useSelector(state => state.auth);
    const { roles, displayName} = auth;

    const [locations, setLocations] = useState([]);
    const [electricalIsolationRequired, setElectricalIsolationRequired] = useState((index !== null) ? accessRequest.locationLimitItems[index].electricalIsolationRequired : false);
    const [signallingResourceRequired, setSignallingResourceRequired] = useState((index !== null) ? accessRequest.locationLimitItems[index].signallingResourceRequired : false);
    const [testTramsRequired, setTestTramsRequired] = useState((index !== null) ? accessRequest.locationLimitItems[index].testTramsRequired : false);

    const toogleElectricalIsolationRequired = () => {
        setElectricalIsolationRequired(prevState => !prevState);
    }
    const toggleSignallingResourceRequired = () => {
        setSignallingResourceRequired(prevState => !prevState);
    }
    const toggleTestTramsRequired = () => {
        setTestTramsRequired(prevState => !prevState);
    }

    useEffect(() => {
        if(index === null){ 
           setLocations([]);
        } else
            setLocations([ ...accessRequest.locationLimitItems[index].locations ]);
            
    }, [index, accessRequest]);

    const addToLocations = useCallback((location) => {

            if(location !== '') {
            let locs = [];

            if(index && accessRequest.locationLimitItems[index].locations) {
                locs = [ ...accessRequest.locationLimitItems[index].locations ];
            } else {
                locs = locations;
            }

            locs.push(location);
            setLocations([...new Set(locs)]);
        }

    },[index, locations, accessRequest.locationLimitItems]);

    const removeFromLocations = (index) => {
        let locs = locations;
        locations.splice(index, 1);
        setLocations([...locs]);
    };

    const createComplianceLog = useCallback((locationLimitItems) => {
         // loop through the updated array and determin the start date and end date
         if(accessRequest.isDisruptive) {
            if(moment(determinStartDate(locationLimitItems)).diff(moment(accessRequest.created), 'week') < 12) {
                return { user: displayName, logged: moment().format(), event: 'Not compliant to 12 week notice requirement' };
            } else {
                return { user: displayName, logged: moment().format(), event: 'Compliant to disruptive 12 week notice requirement' };
            }
        } else {
            if(moment(determinStartDate(locationLimitItems)).diff(moment(accessRequest.created), 'week') < 6) {
                return { user: displayName, logged: moment().format(), event: 'Not compliant to 6 week notice requirement' };
            } else {
                return { user: displayName, logged: moment().format(), event: 'Compliant to 6 week notice requirement' };
            }
        }
    }, [displayName, accessRequest.created, accessRequest.isDisruptive]);

    const onSave = useCallback((data) => {

        let updatedLocationLimitItems;
        let updatedEventLogItems = [ ...accessRequest.eventLog ];

        if(accessRequest && index === null) { // add new location limit to existing access request
            // check if there are existing location limits
            if(accessRequest.locationLimitItems) {
                updatedLocationLimitItems = [ ...accessRequest.locationLimitItems ];
            } else {
                updatedLocationLimitItems = [];
            }
            // add the current location limit to the updated array
            updatedLocationLimitItems.push({
                    ...data,
                    locations: locations,
                    locationLimitStatus: 'Pending'
            });
            // loop through the updated array and determin the start date and end date
            updatedEventLogItems.push(createComplianceLog(updatedLocationLimitItems));
            //commit to db
            save({
                summary: {
                    accessFirstDay: moment(determinStartDate(updatedLocationLimitItems)).format('YYYY-MM-DD'),
                    accessLastDay: moment(determinEndDate(updatedLocationLimitItems)).format('YYYY-MM-DD')
                },
                locationLimitItems: updatedLocationLimitItems,
                eventLog: updatedEventLogItems
            }, 'SAVE_LOCATION_LIMIT');

        } else if (accessRequest && index !== null) { // update existing location limit
            //create a copy of the location limits
            let updatedLocationLimitItems = [ ...accessRequest.locationLimitItems ];
            updatedLocationLimitItems[index] = {
                ...data,
                locations: locations,
                locationLimitStatus: 'Pending'
            };
            // loop through the updated array and determin the start date and end date
            updatedEventLogItems.push(createComplianceLog(updatedLocationLimitItems));
            // commit to db
            save({
                summary: {
                    accessFirstDay: moment(determinStartDate(updatedLocationLimitItems)).format('YYYY-MM-DD'),
                    accessLastDay: moment(determinEndDate(updatedLocationLimitItems)).format('YYYY-MM-DD')
                },
                locationLimitItems: updatedLocationLimitItems,
                eventLog: updatedEventLogItems
            }, 'SAVE_LOCATION_LIMIT');

        } else { // post new access request item starting with location limit // this will never be required
            save({ locationLimitItems: [ {
                    ...data,
                    locations: locations,
                    locationLimitStatus: 'Pending'
                } ] }, 'SAVE_LOCATION_LIMIT');
        }
        toggle();

    }, [createComplianceLog, index, locations, accessRequest, save, toggle]);

    const onConfirm = useCallback((data) => {
        let updatedLocationLimitItems = [ ...accessRequest.locationLimitItems ];
        let updatedEventLogItems = [ ...accessRequest.eventLog ];

        updatedLocationLimitItems[index] = {
            ...data, 
            locations: locations,
            locationLimitStatus: 'Confirmed'
        };

        updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'Location Limits for (' + locations.join(', ') + ') is confirmed' });

        save({ locationLimitItems: updatedLocationLimitItems, eventLog: updatedEventLogItems }, 'SAVE_LOCATION_LIMIT');
        toggle();
    }, [accessRequest.locationLimitItems, accessRequest.eventLog, index, locations, displayName, save, toggle]);

    const onUnavailable = useCallback((data) => {
        let updatedLocationLimitItems = [ ...accessRequest.locationLimitItems ];
        let updatedEventLogItems = [ ...accessRequest.eventLog ];

            updatedLocationLimitItems[index] = {
                ...data, 
                locations: locations,
                locationLimitStatus: 'Unavailable'
            };

            updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'Location Limits for (' + locations.join(', ') + ') is not available' });

            save({ locationLimitItems: updatedLocationLimitItems, eventLog: updatedEventLogItems }, 'SAVE_LOCATION_LIMIT');
            toggle();
    }, [accessRequest.locationLimitItems, accessRequest.eventLog, index, locations, displayName, save, toggle]);

    const onDelete = useCallback(() => {
        let updatedLocationLimitItems = [ ...accessRequest.locationLimitItems ];
        let updatedEventLogItems = [ ...accessRequest.eventLog ];
        // delete element from array
        updatedLocationLimitItems.splice(index, 1);
         // loop through the updated array and determin the start date and end date
         updatedEventLogItems.push(createComplianceLog(updatedLocationLimitItems));

        save({ locationLimitItems: updatedLocationLimitItems, eventLog: updatedEventLogItems }, 'SAVE_LOCATION_LIMIT');
        toggle();

    }, [createComplianceLog, index, accessRequest.eventLog, accessRequest.locationLimitItems, save, toggle]);

    return (
        <div className='form-location my-1 shadow'>
            <form className='p-1'>
                <h1 className='h3 mb-3 fw-normal text-start'>Location Limit</h1>

                {/* Location Section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    {!recordLocked
                        ?   <div className='input-group mb-1'>
                                <div className='form-floating w-100'>
                                    <select className='form-select' id='locationSelect' required disabled={recordLocked}
                                        {...register('locationSelect', { onChange: (event) => addToLocations(event.target.value), required: true })}>
                                        <option value=''>Choose...</option>
                                        {
                                            locationList.map(item => {
                                                return (<option key={item.code} value={item.name}>{item.name}</option>)
                                            })
                                        }
                                    </select>
                                    <label htmlFor='locationSelect'>Locations</label>
                                </div>
                            </div>
                        :   null
                    }
                    
                    <div className='list-group text-start'>
                        <div className='list-group w-auto'>
                            {
                                locations && locations.map((item, index) => {
                                    return(<LocationListItem key={index} index={index} item={item} recordLocked={recordLocked} remove={removeFromLocations}/>);
                                })
                            }
                        </div>
                    </div>
                </div>

                {/* Access Type Section */}
                <div className='form-floating mb-3 '>
                    <select className='form-select' id='locationLimitAccessType' required disabled={recordLocked}
                        {...register('locationLimitAccessType', { required: true })}>
                        <option value=''>Choose...</option>
                        <option>Possession</option>
                        <option>Possession and Isolation</option>
                        <option>Semi Protected Worksite</option>
                        <option>Blockade</option>
                    </select>
                    <label htmlFor='locationLimitAccessType'>Access Type</label>
                </div>
                
                {/* Dates & times Section */}
                <div className='border rounded p-1 mb-3 bg-light'>

                    <div className='row g-2 bg-light'>
                        <div className='form-floating  col-sm-6'>
                            <input type='date' className='form-control' id='locationLimitStartDate' placeholder='Date' required
                                disabled={recordLocked} 
                                {...register('locationLimitStartDate', { required: true })} />
                            <label htmlFor='locationLimitStartDate' className='form-label'>Start Date</label>
                        </div>
                        <div className='form-floating col-sm-6 mb-1'>
                            <input type='time' className='form-control' id='locationLimitStartTime' placeholder='Date' required
                                disabled={recordLocked} 
                                {...register('locationLimitStartTime', { required: true })} />
                            <label htmlFor='locationLimitStartTime' className='form-label'>Start Time</label>
                        </div>
                    </div>

                    <div className='row g-2 bg-light'>
                        <div className='form-floating  col-sm-6'>
                            <input type='date' className='form-control' id='locationLimitEndDate' placeholder='Date' required
                                disabled={recordLocked} 
                                {...register('locationLimitEndDate', { required: true })} />
                            <label htmlFor='locationLimitEndDate' className='form-label'>End Date</label>
                        </div>
                        <div className='form-floating col-sm-6'>
                            <input type='time' className='form-control' id='locationLimitEndTime' placeholder='Date' required
                                disabled={recordLocked} 
                                {...register('locationLimitEndTime', { required: true })} />
                            <label htmlFor='locationLimitEndTime' className='form-label'>End Time</label>
                        </div>
                    </div>

                </div>

                {/* co-locate */}
                <div className='form-floating mb-1 mt-1'>
                    <select className='form-select' id='colocate' required
                        disabled={recordLocked}
                        {...register('colocate', { required: true })}>
                        <option value=''>Choose...</option>
                        <option>Worksite can be co-located</option>
                        <option>Worksite cannot be co-located</option>
                        <option>Unsure at this stage</option>
                    </select>
                    <label htmlFor='colocate'>Co-locate Worksite</label>
                </div>

                {/* Electrical Isolation Section */}
                 <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='electricalIsolationRequired' 
                                    disabled={recordLocked}
                                    { ...register('electricalIsolationRequired', { onChange:  toogleElectricalIsolationRequired })}
                                />
                            </div>
                            <span className='text-start'>
                                Electrical Resource Required
                                <small className='d-block text-muted'>Indicate if this Access Request will require an electrical resource</small>
                            </span>
                        </label>
                    </div>
                    { electricalIsolationRequired
                        ?   <div>
                                <div className='form-floating mb-1 mt-1'>
                                    <select className='form-select' id='electricalIsolationType' required={electricalIsolationRequired}
                                        disabled={recordLocked}
                                        {...register('electricalIsolationType', { required: electricalIsolationRequired })}>
                                        <option value=''>Choose...</option>
                                        <option>De-energise</option>
                                        <option>Standard Isolation (sub to sub)</option>
                                        <option>Special Isolation</option>
                                    </select>
                                    <label htmlFor='electricalIsolationType'>Electrical Isolation</label>
                                </div> 
                        
                                <div className='form-floating'>
                                        <textarea className='form-control' id='electricalIsolationRequirements'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Electrical Isolation Requirements' 
                                            disabled={recordLocked} required={electricalIsolationRequired}
                                            {...register('electricalIsolationRequirements', { minLength: 5, required: electricalIsolationRequired })}
                                    />
                                    <label htmlFor='electricalIsolationRequirements' className='form-label'>Electrical Isolation Requirements</label>
                                </div>
                            </div>
                        :   null
                    }
                </div>
                
                {/* Signalling Resource Section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='signallingResourceRequired' 
                                    disabled={recordLocked}
                                    {...register('signallingResourceRequired', { onChange:  toggleSignallingResourceRequired })}
                                />
                            </div>
                            <span className='text-start'>
                                Signalling Resource Required
                                <small className='d-block text-muted'>Indicate if this request will require signalling resource (e.g. Axle Counter Reset)</small>
                            </span>
                        </label>
                    </div>
                    { signallingResourceRequired
                        ?   <div className='form-floating mt-1'>
                                <textarea className='form-control' id='signallingResourceRequirements' rows='5' 
                                    style={{height:'auto'}} placeholder='Electrical Isolation Requirements' minLength={5}
                                    disabled={recordLocked} required={signallingResourceRequired}
                                    {...register('signallingResourceRequirements', { minLength: 5, required: signallingResourceRequired })}
                                />
                                <label htmlFor='signallingResourceRequirements' className='form-label'>Signalling Requirements</label>
                            </div>
                        :   null
                    }
                </div>

                {/* Test Tram Section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='testTramsRequired' 
                                    disabled={recordLocked}
                                    {...register('testTramsRequired', { onChange:  toggleTestTramsRequired })}
                                />
                            </div>
                            <span className='text-start'>
                                Test Trams Required
                                <small className='d-block text-muted'>Indicate if this request will require test trams for testing.</small>
                            </span>
                        </label>
                    </div>
                    { testTramsRequired
                        ?   <div className='form-floating mt-1'>
                                <textarea className='form-control' id='testTramRequirements' rows='5'
                                    style={{height:'auto'}} placeholder='Electrical Isolation Requirements' 
                                    minLength={5} disabled={recordLocked} required={testTramsRequired}
                                    {...register('testTramRequirements', { minLength: 5, required: testTramsRequired })}
                                />
                                <label htmlFor='testTramRequirements' className='form-label'>Test Tram Requirements</label>
                            </div>
                        :   null
                    }
                </div>
                
                <div className='form-floating mb-3'>
                    <select className='form-select' id='nearestHospital' disabled={recordLocked} required
                        {...register('nearestHospital', { required: true })}>
                        <option value=''>Choose...</option>
                        <option>Royal Oldham Hospital, Rochdale Rd, OL1 2JH</option>
                        <option>North Manchester General Hospital, Delaunuys Rd, Crumpsall, M8 5RB</option>
                        <option>Manchester Royal Infirmary, Grafton Street, M13 9WL</option>
                        <option>Salford Royal, Stott Lane, Salford, M6 8HD</option>
                        <option>Wythenshawe Hospital, Southmoor Road, M23 9LT</option>
                        <option>Royal Oldham Hospital, Rochdale Road, Oldham, OL1 2JH</option>
                        <option>Tameside Hospital, Fountain Street, Ashton Under Lyne, OL6 9RW</option>
                        <option>Stepping Hill Hospital, Poplar Grove, Hazel Grove, Stockport, SK2 7JE</option>
                        <option>Fairfield General Hospital, Rochdale Old Road, Bury, BL9 7TD</option>
                        <option>Royal Bolton Hospital, Minerva Road, Farnworth, Bolton, BL4 0JR</option>
                    </select>
                    <label htmlFor='nearestHospital'>Nearest hospital</label>
                </div>
                
                {!recordLocked
                    ?   <div className='form-floating mb-3'>
                            <button className='w-100 btn btn-lg btn-primary' type='button' onClick={handleSubmit(onSave)}>Save Changes</button>
                        </div>
                    :   null
                }
                <div className='form-floating mb-5'>
                    <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={toggle}>Close</button>
                </div>
                {accessRequest && !recordLocked
                    ?   <div className='form-floating mb-3'>
                            <button className='w-100 btn btn-lg btn-danger' type='button' onClick={handleSubmit(onDelete)}>Delete</button>
                        </div>
                    :   null
                }
                {accessRequest && roles.includes('planner') && accessRequest.requestor.requestorName !== displayName
                    ?   <div>
                            <div className='form-floating mb-3'>
                                <button className='w-100 btn btn-lg btn-success' type='button' disabled={!formState.isValid} onClick={handleSubmit(onConfirm)}>Confirm</button>
                            </div>
                            <div className='form-floating'>
                                <button className='w-100 btn btn-lg btn-danger' type='button' onClick={handleSubmit(onUnavailable)}>Unavailable</button>
                            </div>
                        </div>
                    : null
                }
            </form>
        </div>
    )
}

export default LocationLimitForm;