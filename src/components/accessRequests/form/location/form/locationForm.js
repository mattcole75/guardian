import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
import network_locations from '../../../../../configuration/lists/locations.json';
import network_hospitals from '../../../../../configuration/lists/hospitals.json';
import List from './list/list';

// import moment from 'moment';
// import { determinStartDate, determinEndDate } from '../../../../../shared/utility';



const LocationForm = (props) => {

    const { location, index, recordLocked, save, close } = props;

    const { register, reset, getValues, handleSubmit, formState: { errors } } = useForm({ 
        mode: 'onBlur', 
    });
    
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if(location) {
            reset(location);
            setLocations(location.locationList);
        }
    }, [reset, location]);

    // const { roles, displayName } = useSelector(state => state.auth);

    

    // const [electricalIsolationRequired, setElectricalIsolationRequired] = useState((index !== null) ? accessRequest.locationItems[index].electricalIsolationRequired : false);
    // const [signallingResourceRequired, setSignallingResourceRequired] = useState((index !== null) ? accessRequest.locationItems[index].signallingResourceRequired : false);
    // const [testTramsRequired, setTestTramsRequired] = useState((index !== null) ? accessRequest.locationItems[index].testTramsRequired : false);

    // const toogleElectricalIsolationRequired = () => {
    //     setElectricalIsolationRequired(prevState => !prevState);
    // }
    // const toggleSignallingResourceRequired = () => {
    //     setSignallingResourceRequired(prevState => !prevState);
    // }
    // const toggleTestTramsRequired = () => {
    //     setTestTramsRequired(prevState => !prevState);
    // }

    // const createComplianceLog = useCallback((locationItems) => {
        //  // loop through the updated array and determin the start date and end date
        //  if(accessRequest.isDisruptive) {
        //     if(moment(determinStartDate(locationItems)).diff(moment(accessRequest.created), 'week') < 12) {
        //         return { user: displayName, logged: moment().format(), event: 'Not compliant to 12 week notice requirement' };
        //     } else {
        //         return { user: displayName, logged: moment().format(), event: 'Compliant to disruptive 12 week notice requirement' };
        //     }
        // } else {
        //     if(moment(determinStartDate(locationItems)).diff(moment(accessRequest.created), 'week') < 6) {
        //         return { user: displayName, logged: moment().format(), event: 'Not compliant to 6 week notice requirement' };
        //     } else {
        //         return { user: displayName, logged: moment().format(), event: 'Compliant to 6 week notice requirement' };
        //     }
        // }
    // }, [displayName, accessRequest.created, accessRequest.isDisruptive]);

    // const onSave = useCallback((data) => {

        // let updatedLocationItems;
        // let updatedEventLogItems = [ ...accessRequest.eventLog ];

        // if(accessRequest && index === null) { // add new location to existing access request
        //     // check if there are existing locations
        //     if(accessRequest.locationItems) {
        //         updatedLocationItems = [ ...accessRequest.locationItems ];
        //     } else {
        //         updatedLocationItems = [];
        //     }
        //     // add the current location  to the updated array
        //     updatedLocationItems.push({
        //             ...data,
        //             // locations: locations,
        //             locationStatus: 'Pending'
        //     });
        //     updatedEventLogItems.push(createComplianceLog(updatedLocationItems));
        //     // loop through the updated array and determin the start date and end date
        //     //commit to db
        //     save({
        //         summary: {
        //             accessFirstDay: moment(determinStartDate(updatedLocationItems)).format('YYYY-MM-DD'),
        //             accessLastDay: moment(determinEndDate(updatedLocationItems)).format('YYYY-MM-DD')
        //         },
        //         locationItems: updatedLocationItems,
        //         eventLog: updatedEventLogItems
        //     }, 'SAVE_LOCATION');

        // } else if (accessRequest && index !== null) { // update existing location
        //     //create a copy of the locations
        //     let updatedLocationItems = [ ...accessRequest.locationItems ];
        //     updatedLocationItems[index] = {
        //         ...data,
        //         // locations: locations,
        //         locationStatus: 'Pending'
        //     };
        //     // loop through the updated array and determin the start date and end date
        //     updatedEventLogItems.push(createComplianceLog(updatedLocationItems));
        //     // commit to db
        //     save({
        //         summary: {
        //             accessFirstDay: moment(determinStartDate(updatedLocationItems)).format('YYYY-MM-DD'),
        //             accessLastDay: moment(determinEndDate(updatedLocationItems)).format('YYYY-MM-DD')
        //         },
        //         locationItems: updatedLocationItems,
        //         eventLog: updatedEventLogItems
        //     }, 'SAVE_LOCATION');

        // } else { // post new access request item starting with location // this will never be required
        //     save({ locationItems: [ {
        //             ...data,
        //             // locations: locations,
        //             locationStatus: 'Pending'
        //         } ] }, 'SAVE_LOCATION');
        // }
        // toggle();

    // }, [createComplianceLog, index, accessRequest, save, toggle]);

    // const onConfirm = useCallback((data) => {
        // let updatedLocationItems = [ ...accessRequest.locationItems ];
        // let updatedEventLogItems = [ ...accessRequest.eventLog ];

        // updatedLocationItems[index] = {
        //     ...data, 
        //     // locations: locations,
        //     locationStatus: 'Confirmed'
        // };

        // updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'Location for (' + { ...data.location } + ') is confirmed' });

        // save({ locationItems: updatedLocationItems, eventLog: updatedEventLogItems }, 'SAVE_LOCATION');
        // toggle();
    // }, [accessRequest.locationItems, accessRequest.eventLog, index, displayName, save, toggle]);

    // const onUnavailable = useCallback((data) => {
        // let updatedLocationItems = [ ...accessRequest.locationItems ];
        // let updatedEventLogItems = [ ...accessRequest.eventLog ];

        //     updatedLocationItems[index] = {
        //         ...data, 
        //         // locations: locations,
        //         locationStatus: 'Unavailable'
        //     };

        //     updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'Location for (' + { ...data.location } + ') is not available' });

        //     save({ locationItems: updatedLocationItems, eventLog: updatedEventLogItems }, 'SAVE_LOCATION');
        //     toggle();
    // }, [accessRequest.locationItems, accessRequest.eventLog, index, displayName, save, toggle]);

    // const onDelete = useCallback(() => {
        // let updatedLocationItems = [ ...accessRequest.locationItems ];
        // let updatedEventLogItems = [ ...accessRequest.eventLog ];
        // // delete element from array
        // updatedLocationItems.splice(index, 1);
        //  // loop through the updated array and determin the start date and end date
        //  updatedEventLogItems.push(createComplianceLog(updatedLocationItems));

        // save({ locationItems: updatedLocationItems, eventLog: updatedEventLogItems }, 'SAVE_LOCATION');
        // toggle();

    // }, [createComplianceLog, index, accessRequest.eventLog, accessRequest.locationItems, save, toggle]);

    const onSetLocation = (action, index, location) => {
        const updatedLocations = [ ...locations ];

        switch (action) {
            case 'ADD':
                updatedLocations.push(location);
                setLocations(updatedLocations);
                break;
            case 'DELETE':
                updatedLocations.splice(index, 1);
                setLocations(updatedLocations);
                break;
            case 'UP':
                updatedLocations.splice((index - 1), 0, updatedLocations.splice(index, 1)[0]);
                setLocations(updatedLocations);
                break;
            case 'DOWN':
                updatedLocations.splice((index + 1), 0, updatedLocations.splice(index, 1)[0]);
                setLocations(updatedLocations);
                break;
            default:
                return;
        }

    }

    const onSubmit = useCallback(() => {
        if(index == null)
            save('ADD', null, { ...getValues(), locationList: [ ...locations ] });
        else
            save('UPDATE', index, { ...getValues(), locationList: [...locations ] });
    }, [getValues, index, locations, save]);

    const onDelete = useCallback(() => {
        save('DELETE', index, null);
    }, [index, save]);

    const onClose = useCallback(() => {
        close();
    }, [close]);

    return (
        <form className='form-location my-1 shadow' onSubmit={ handleSubmit(onSubmit) }>
            <div className='p-1'>
                <h1 className='h3 mb-2 fw-normal text-start'>Location</h1>

                { /* Location Section */ }
                <div className='row g-2'>
                    <div className='form-floating mb-2'>
                        <select className='form-select' id='locations' required disabled={ recordLocked }
                            { ...register('locations', { onChange: (e) => {onSetLocation('ADD', null, e.target.value) } }) }>
                            <option value=''>Choose...</option>
                            {
                                network_locations.map(item => {
                                    return (<option key={ item.code } value={ item.location }>{ item.location }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='locations'>Locations</label>
                    </div>
                </div>

                <List locations={ locations } save={ onSetLocation } />

                {/* <div className='row g-2'> */}

                    {/* <div className='form-floating col-sm-6 mb-2'>
                        <select className='form-select' id='startLocation' required disabled={recordLocked}
                            { ...register('startLocation', { required: 'A start location must be selected' }) }>
                            <option value=''>Choose...</option>
                            {
                                network_locations.map(item => {
                                    return (<option key={ item.code } value={ item.location }>{ item.location }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='startLocation'>Start Location</label>
                        { errors.startLocation && <p className='form-error mt-1 text-start'>{ errors.startLocation.message }</p> }
                    </div> */}

                    {/* <div className='form-floating  col-sm-6 mb-2'>
                        <select className='form-select' id='endLocation' required disabled={recordLocked}
                            {...register('endLocation', { required: 'A location must be selected' })}>
                            <option value=''>Choose...</option>
                            {
                                network_locations.map(item => {
                                    return (<option key={ item.code } value={ item.location }>{ item.location }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='endLocation'>End Location</label>
                        { errors.endLocation && <p className='form-error mt-1 text-start'>{ errors.endLocation.message }</p> }
                    </div> */}
                {/* </div> */}

                {/* Access Type Section */}
                {/* <div className='form-floating mb-3 '>
                    <select className='form-select' id='accessType' required disabled={recordLocked}
                        {...register('accessType', { required: 'A value must be selected' })}>
                        <option value=''>Choose...</option>
                        <option>Under Blue Permit</option>
                        <option>Under Pink Permit</option>
                        <option>Under Lookout/Site Wardon Protection</option>
                    </select>
                    <label htmlFor='accessType'>Access Type</label>
                </div>
                { errors.accessType && <p className='form-error mt-1 text-start'>{errors.accessType.message}</p> } */}
                
                {/* Dates & times Section */}
                <div className='row g-2'>
                    <div className='form-floating  col-sm-6 mb-2'>
                        <input type='date' className='form-control' id='startDate' placeholder='Date' min={ new Date().toISOString().split('T')[0] } required
                            disabled={ recordLocked } 
                            { ...register('startDate', { required: 'You must provide a start date' }) } />
                        <label htmlFor='startDate' className='form-label'>Start Date</label>
                        { errors.startDate && <p className='form-error mt-1 text-start'>{ errors.startDate.message }</p> }
                    </div>

                    <div className='form-floating col-sm-6 mb-2'>
                        <input type='time' className='form-control' id='startTime' placeholder='Date' required
                            disabled={ recordLocked } 
                            { ...register('startTime', { required: 'You must provide a start time' }) } />
                        <label htmlFor='startTime' className='form-label'>Start Time</label>
                        { errors.startTime && <p className='form-error mt-1 text-start'>{ errors.startTime.message }</p> }
                    </div>
                </div>
                <div className='row g-2'>
                    <div className='form-floating  col-sm-6'>
                        <input type='date' className='form-control' id='endDate' placeholder='Date' min={ new Date().toISOString().split('T')[0] } required
                            disabled={ recordLocked }
                            { ...register('endDate', { required: 'You must provide an end date' }) } />
                        <label htmlFor='endDate' className='form-label'>End Date</label>
                        { errors.endDate && <p className='form-error mt-1 text-start'>{errors.endDate.message}</p> }
                    </div>
                    <div className='form-floating col-sm-6 mb-2'>
                        <input type='time' className='form-control' id='endTime' placeholder='Date' required
                            disabled={ recordLocked } 
                            { ...register('endTime', { required: 'You must provide an end time' }) } />
                        <label htmlFor='endTime' className='form-label'>End Time</label>
                        { errors.endTime && <p className='form-error mt-1 text-start'>{errors.endTime.message}</p> }    
                    </div>
                </div>
                {/* shifts */}
                <div className='form-floating mb-2'>
                    <input type='number' className='form-control' id='shifts' autoComplete='off' placeholder='Shift Count' min={0} max={101} required
                        disabled={ recordLocked }
                        { ...register('shifts', { required: 'You must provide a number of shifts you intend to use',
                            min: {
                                value: 1,
                                message: "The minimum shift count is 1"
                            },
                            max: {
                                value: 100,
                                message: 'The maximum shiftcount is 100'
                            }
                        }) }
                    />
                    <label htmlFor='shifts' className='form-label'>How many shifts will you be using</label>
                    { errors.shifts && <p className='form-error mt-1 text-start'>{errors.shifts.message}</p> }
                </div>
                {/* co-locate */}
                {/* <div className='form-floating mb-3 mt-1'>
                    <select className='form-select' id='colocate' required
                        disabled={recordLocked}
                        {...register('colocate', { required: 'A value must be selected' })}>
                        <option value=''>Choose...</option>
                        <option>Worksite can be co-located</option>
                        <option>Worksite cannot be co-located</option>
                        <option>Unsure at this stage</option>
                    </select>
                    <label htmlFor='colocate'>Co-locate Worksite</label>
                </div>
                { errors.colocate && <p className='form-error mt-1 text-start'>{errors.colocate.message}</p> } */}

                {/* Electrical Isolation Section */}
                 {/* <div className='border rounded p-1 mb-3 bg-light'>
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
                                        {...register('electricalIsolationType', { required: 'A value must be selected' })}>
                                        <option value=''>Choose...</option>
                                        <option>De-energise</option>
                                        <option>Standard Isolation (sub to sub) (Default)</option>
                                        <option>Special Isolation</option>
                                    </select>
                                    <label htmlFor='electricalIsolationType'>Electrical Isolation</label>
                                </div>
                                { errors.electricalIsolationType && <p className='form-error mt-1 text-start'>{errors.electricalIsolationType.message}</p> }
                        
                                <div className='form-floating'>
                                        <textarea className='form-control' id='electricalIsolationRequirements'  
                                            rows='5' minLength={5} style={{height:'auto'}} placeholder='Electrical Isolation Requirements' 
                                            disabled={recordLocked} required={electricalIsolationRequired}
                                            {...register('electricalIsolationRequirements', {
                                                required: "You must provide a description of your requirements",
                                                minLength: {
                                                    value: 5,
                                                    message: "The requirement must have at least 5 characters"
                                                },
                                                maxLength: {
                                                    value: 250,
                                                    message: 'The requirement must have less than 250 characters'
                                                }
                                            })}
                                    />
                                    <label htmlFor='electricalIsolationRequirements' className='form-label'>Electrical Isolation Requirements</label>
                                </div>
                                { errors.electricalIsolationRequirements && <p className='form-error mt-1 text-start'>{errors.electricalIsolationRequirements.message}</p> }
                            </div>
                        :   null
                    }
                </div> */}
                
                {/* Signalling Resource Section */}
                {/* <div className='border rounded p-1 mb-3 bg-light'>
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
                        ?   <div>
                                <div className='form-floating mt-1'>
                                    <textarea className='form-control' id='signallingResourceRequirements' rows='5' 
                                        style={{height:'auto'}} placeholder='Signalling Requirements' minLength={5}
                                        disabled={recordLocked} required={signallingResourceRequired}
                                        {...register('signallingResourceRequirements', {
                                            required: "You must provide a description of your requirements",
                                            minLength: {
                                                value: 5,
                                                message: "The requirement must have at least 5 characters"
                                            },
                                            maxLength: {
                                                value: 250,
                                                message: 'The requirement must have less than 250 characters'
                                            }
                                        })}
                                    />
                                    <label htmlFor='signallingResourceRequirements' className='form-label'>Signalling Requirements</label>
                                </div>
                                { errors.signallingResourceRequirements && <p className='form-error mt-1 text-start'>{errors.signallingResourceRequirements.message}</p> }
                            </div>
                        :   null
                    }
                </div> */}

                {/* Test Tram Section */}
                {/* <div className='border rounded p-1 mb-3 bg-light'>
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
                    </div> */}
                    {/* { testTramsRequired
                        ?   <div>
                                <div className='form-floating mt-1'>
                                    <textarea className='form-control' id='testTramRequirements' rows='5'
                                        style={{height:'auto'}} placeholder='Test Tram Requirements' 
                                        minLength={5} disabled={recordLocked} required={testTramsRequired}
                                        {...register('testTramRequirements', {
                                            required: "You must provide a description of your requirements",
                                                minLength: {
                                                    value: 5,
                                                    message: "The requirement must have at least 5 characters"
                                                },
                                                maxLength: {
                                                    value: 250,
                                                    message: 'The requirement must have less than 250 characters'
                                                }
                                        })}
                                    />
                                    <label htmlFor='testTramRequirements' className='form-label'>Test Tram Requirements</label>
                                </div>
                                { errors.testTramRequirements && <p className='form-error mt-1 text-start'>{errors.testTramRequirements.message}</p> }
                            </div>
                        :   null
                </div>
                    } */}
                
                <div className='form-floating mb-3'>
                    <select className='form-select' id='nearestHospital' disabled={recordLocked} required
                        {...register('nearestHospital', { required: 'A value must be selected' })}>
                        <option value=''>Choose...</option>
                        {
                            network_hospitals.map(item => {
                                return (<option key={item.hospital} value={item.hospital}>{item.hospital}</option>)
                            })
                        }
                    </select>
                    <label htmlFor='nearestHospital'>Nearest hospital</label>
                    { errors.nearestHospital && <p className='form-error mt-1 text-start'>{errors.nearestHospital.message}</p> }
                </div>
                
                
                {!recordLocked
                    ?   <div className='form-floating mb-3'>
                            <button className='w-100 btn btn-lg btn-primary' type='submit'>Ok</button>
                        </div>
                    :   null
                }
                <div className='form-floating mb-5'>
                    <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={ onClose }>Close</button>
                </div>

                { location && !recordLocked
                    ?   <div className='form-floating mb-3'>
                            <button className='w-100 btn btn-lg btn-danger' type='button' onClick={ onDelete }>Delete</button>
                        </div>
                    :   null

                }
                
                {/* {accessRequest && !recordLocked && accessRequest.requestor.name === displayName
                    ?   <div className='form-floating mb-3'>
                            <button className='w-100 btn btn-lg btn-danger' type='button' onClick={handleSubmit()}>Delete</button>
                        </div>
                    :   null
                } */}
                {/* {accessRequest && roles.includes('planner') && accessRequest.requestor.name !== displayName
                    ?   <div>
                            <div className='form-floating mb-3'>
                                <button className='w-100 btn btn-lg btn-success' type='button' onClick={handleSubmit()}>Confirm</button>
                            </div>
                            <div className='form-floating'>
                                <button className='w-100 btn btn-lg btn-danger' type='button' onClick={handleSubmit()}>Unavailable</button>
                            </div>
                        </div>
                    : null
                } */}
            </div>
        </form>
    )
}

export default LocationForm;