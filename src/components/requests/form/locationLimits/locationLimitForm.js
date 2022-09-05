import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import locationList from '../../../../data/locations';
import LocationListItem from './locationListItem';

const LocationLimitForm = (props) => {

    const { request, index, editable, save, toggle } = props;

    const { register, handleSubmit, formState, getValues } = useForm({ 
        mode: 'onChange', 
        defaultValues: ((request == null || request.locationLimitItems == null) ? null : request.locationLimitItems[index])
    });

    const roles = useSelector(state => state.auth.roles);

    const [locations, setLocations] = useState([]);
    const [electricalIsolationRequired, setElectricalIsolationRequired] = useState((index !== null) ? request.locationLimitItems[index].electricalIsolationRequired : false);
    const [signallingResourceRequired, setSignallingResourceRequired] = useState((index !== null) ? request.locationLimitItems[index].signallingResourceRequired : false);
    const [testTramsRequired, setTestTramsRequired] = useState((index !== null) ? request.locationLimitItems[index].testTramsRequired : false);

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
            setLocations([ ...request.locationLimitItems[index].locations ]);
            
    }, [index, request])

    const addToLocations = () => {
        let locs = [];

        if(index && request.locationLimitItems[index].locations) {
            locs = [ ...request.locationLimitItems[index].locations ];
        } else {
            locs = locations;
        }

        locs.push(getValues().locationSelect);
        setLocations([...locs]);
    };

    const removeFromLocations = (index) => {
        let locs = locations;
        locations.splice(index, 1);
        setLocations([...locs]);
    }

    const onSave = useCallback((data) => {

        let updatedLocationLimitItems;

        if(request && index === null) { // add new location limit to existing access request
            if(request.locationLimitItems) {
                updatedLocationLimitItems = [ ...request.locationLimitItems ];
            } else {
                updatedLocationLimitItems = [];
            }
            
            updatedLocationLimitItems.push(
                {
                    ...data,
                    locations: locations,
                    locationLimitStatus: 'Pending'
                });
            save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');

        } else if (request && index !== null) { // update existing location limit
            let updatedLocationLimitItems = [ ...request.locationLimitItems ];
            updatedLocationLimitItems[index] = {
                ...data,
                locations: locations,
                locationLimitStatus: 'Pending'
            };
            save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');

        } else { // post new access request item starting with location limit
            save({locationLimitItems: [{
                    ...data,
                    locations: locations,
                    locationLimitStatus: 'Pending'
                }]}, 'SAVE_LOCATION_LIMIT');
        }
        toggle();

    }, [index, locations, request, save, toggle]);

    const onApprove = useCallback((data) => {
        let updatedLocationLimitItems = [ ...request.locationLimitItems ];
        updatedLocationLimitItems[index] = {
            ...data, 
            locations: locations,
            locationLimitStatus: 'Confirmed'
        };
        save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');
        toggle();
    }, [index, request, locations, save, toggle]);

    const onUnavailable = useCallback((data) => {
        let updatedLocationLimitItems = [ ...request.locationLimitItems ];
            updatedLocationLimitItems[index] = {
                ...data, 
                locations: locations,
                locationLimitStatus: 'Unavailable'
            };
            save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');
            toggle();
    }, [index, request, locations, save, toggle]);

    const onDelete = useCallback(() => {

        request.locationLimitItems.splice(index, 1);
        let updatedLocationLimitItems = request.locationLimitItems;
        save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');
        toggle();

    }, [index, request, save, toggle]);

    return (
        <div className="form-authmy-5">
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Location Limit</h1>
                {/* Location Section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    {editable
                        ?   <div className="input-group mb-1">
                                <div className="form-floating w-75">
                                    <select className="form-select" id="locationSelect" required
                                        {...register("locationSelect", { required: true })}>
                                        <option value="">Choose...</option>
                                        {
                                            locationList.map(item => {
                                                return (<option key={item.code} value={item.name}>{item.name}</option>)
                                            })
                                        }
                                    </select>
                                    <label htmlFor="locationSelect">Locations</label>
                                </div>
                                <button type="button" className="btn btn-primary w-25" onClick={addToLocations}>Add</button>
                            </div>
                        
                        :   null
                    }
                    
                    <div className="list-group text-start">
                        <div className="list-group w-auto">
                            {
                                locations && locations.map((item, index) => {
                                    return(<LocationListItem key={index} index={index} item={item} editable={editable} remove={removeFromLocations}/>);
                                })
                            }
                        </div>
                    </div>
                </div>

                {/* Access Type Section */}
                <div className="form-floating mb-3 ">
                    <select className="form-select" id="locationLimitAccessType" required
                        disabled={!editable}
                        {...register("locationLimitAccessType", { required: true })}>
                        <option value="">Choose...</option>
                        <option>Access</option>
                        <option>Egress</option>
                        <option>Maintenance</option>
                        <option>Possession</option>
                    </select>
                    <label htmlFor="locationLimitAccessType">Access Type</label>
                </div>
                
                {/* Dates & times Section */}
                <div className='border rounded p-1 mb-3 bg-light'>

                    <div className='row g-2 bg-light'>
                        <div className='form-floating  col-sm-6'>
                            <input type='date' className='form-control' id='locationLimitStartDate' placeholder='Date' required
                                disabled={!editable} 
                                {...register('locationLimitStartDate', { required: true })} />
                            <label htmlFor='locationLimitStartDate' className='form-label'>Start Date</label>
                        </div>
                        <div className='form-floating col-sm-6 mb-1'>
                            <input type='time' className='form-control' id='locationLimitStartTime' placeholder='Date' required
                                disabled={!editable} 
                                {...register('locationLimitStartTime', { required: true })} />
                            <label htmlFor='locationLimitStartTime' className='form-label'>Start Time</label>
                        </div>
                    </div>

                    <div className='row g-2 bg-light'>
                        <div className='form-floating  col-sm-6'>
                            <input type='date' className='form-control' id='locationLimitEndDate' placeholder='Date' required
                                disabled={!editable} 
                                {...register('locationLimitEndDate', { required: true })} />
                            <label htmlFor='locationLimitEndDate' className='form-label'>End Date</label>
                        </div>
                        <div className='form-floating col-sm-6'>
                            <input type='time' className='form-control' id='locationLimitEndTime' placeholder='Date' required
                                disabled={!editable} 
                                {...register('locationLimitEndTime', { required: true })} />
                            <label htmlFor='locationLimitEndTime' className='form-label'>End Time</label>
                        </div>
                    </div>

                </div>

                {/* Electrical Isolation Section */}
                 <div className='border rounded p-1 mb-3 bg-light'>
                    <div className="list-group mx-0">
                        <label className="list-group-item d-flex gap-2">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="electricalIsolationRequired" 
                                    disabled={!editable}
                                    { ...register('electricalIsolationRequired', { onChange:  toogleElectricalIsolationRequired })}
                                />
                            </div>
                            <span className="text-start">
                                Electrical Isolation Required
                                <small className="d-block text-muted">Indicate if this Access Request will require an (OLE) Electrical Isolation</small>
                            </span>
                        </label>
                    </div>
                    { electricalIsolationRequired
                        ?   <div>
                                <div className="form-floating mb-1 mt-1">
                                    <select className="form-select" id="electricalIsolationType" required={electricalIsolationRequired}
                                        disabled={!editable}
                                        {...register("electricalIsolationType", { required: electricalIsolationRequired })}>
                                        <option value="">Choose...</option>
                                        <option>De-energise</option>
                                        <option>Standard Isolation (sub to sub)</option>
                                        <option>Special Isolation</option>
                                    </select>
                                    <label htmlFor="electricalIsolationType">Electrical Isolation</label>
                                </div> 
                        
                                <div className="form-floating">
                                        <textarea className="form-control" id="electricalIsolationRequirements"  rows="5" style={{height:"auto"}} placeholder="Electrical Isolation Requirements" 
                                        disabled={!editable} required={electricalIsolationRequired}
                                        {...register("electricalIsolationRequirements", { minLength: 5, required: electricalIsolationRequired })}
                                    />
                                    <label htmlFor="electricalIsolationRequirements" className="form-label">Electrical Isolation Requirements</label>
                                </div>
                            </div>
                        :   null
                    }
                </div>
                
                {/* Signalling Resource Section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className="list-group mx-0">
                        <label className="list-group-item d-flex gap-2">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="signallingResourceRequired" 
                                    disabled={!editable}
                                    {...register('signallingResourceRequired', { onChange:  toggleSignallingResourceRequired })}
                                />
                            </div>
                            <span className="text-start">
                                Signalling Resource Required
                                <small className="d-block text-muted">Indicate if this request will require signalling resource (e.g. Axle Counter Reset)</small>
                            </span>
                        </label>
                    </div>
                    { signallingResourceRequired
                        ?   <div className="form-floating mt-1">
                                <textarea className="form-control" id="signallingResourceRequirements"  rows="5" style={{height:"auto"}} placeholder="Electrical Isolation Requirements" 
                                    disabled={!editable} required={signallingResourceRequired}
                                    {...register("signallingResourceRequirements", { minLength: 5, required: signallingResourceRequired })}
                                />
                                <label htmlFor="signallingResourceRequirements" className="form-label">Signalling Requirements</label>
                            </div>
                        :   null
                    }
                </div>

                {/* Test Tram Section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className="list-group mx-0">
                        <label className="list-group-item d-flex gap-2">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="testTramsRequired" 
                                    disabled={!editable}
                                    {...register('testTramsRequired', { onChange:  toggleTestTramsRequired })}
                                />
                            </div>
                            <span className="text-start">
                                Test Trams Required
                                <small className="d-block text-muted">Indicate if this request will require test trams for testing.</small>
                            </span>
                        </label>
                    </div>
                    { testTramsRequired
                        ?   <div className="form-floating mt-1">
                                <textarea className="form-control" id="testTramRequirements"  rows="5" style={{height:"auto"}} placeholder="Electrical Isolation Requirements" 
                                    disabled={!editable} required={testTramsRequired}
                                    {...register("testTramRequirements", { minLength: 5, required: testTramsRequired })}
                                />
                                <label htmlFor="testTramRequirements" className="form-label">Test Tram Requirements</label>
                            </div>
                        :   null
                    }
                </div>
                
                <div className="form-floating mb-3">
                    <select className="form-select" id="nearestHospital" disabled={!editable} required
                        {...register("nearestHospital", { required: true })}>
                        <option value="">Choose...</option>
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
                    <label htmlFor="nearestHospital">Nearest hospital</label>
                </div>
                
                {editable
                    ?   <div className="form-floating mb-3">
                            <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save Changes</button>
                        </div>
                    :   null
                }
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={toggle}>Close</button>
                </div>
                {editable
                    ?   <div className="form-floating">
                        <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(onDelete)}>Delete</button>
                    </div>
                    :   null
                }
                {roles.includes('planner')
                    ?   <div>
                            <div className="form-floating mb-3">
                                <button className="w-100 btn btn-lg btn-success" type="button" disabled={!formState.isValid} onClick={handleSubmit(onApprove)}>Confirm</button>
                            </div>
                            <div className="form-floating">
                                <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(onUnavailable)}>Unavailable</button>
                            </div>
                        </div>
                    : null
                }
            </form>
        </div>
    )
}

export default LocationLimitForm;