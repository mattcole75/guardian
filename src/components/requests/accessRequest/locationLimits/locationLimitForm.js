import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import locationList from '../../../../data/locations';
import LocationListItem from './locationListItem';

const LocationLimitForm = (props) => {

    const { request, index, editable, save, toggle } = props;

    const { register, handleSubmit, formState, getValues } = useForm({ 
        mode: 'onChange', 
        defaultValues: (request == null ? null : request.locationLimitItems[index])
    });

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if(index === null){ 
           setLocations([]);
        } else {
            
            setLocations(request.locationLimitItems[index].locations);
        }
            
    }, [index, request])

    const addToLocations = () => {
        let locs = [];

        if(index && request.locationLimitItems[index].locations){
            locs = request.locationLimitItems[index].locations;
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

        if(request && index === null) {
            let updatedLocationLimitItems = request.locationLimitItems;
            updatedLocationLimitItems.push(
                {
                    ...data, 
                    locations: locations,
                    locationLimitStatus: 'pending'
                });
            save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');

        } else if (request && index !== null) {
            let updatedLocationLimitItems = request.locationLimitItems;
            updatedLocationLimitItems[index] = {
                ...data, 
                locations: locations,
                locationLimitStatus: 'pending'
            };
            save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');

        } else {
            save({locationLimitItems: [{
                    ...data, 
                    locations: locations,
                    locationLimitStatus: 'pending'
                }]}, 'SAVE_LOCATION_LIMIT');
        }
        toggle();

    }, [index, locations, request, save, toggle]);

    const onApprove = useCallback((data) => {
        
        let updatedLocationLimitItems = request.locationLimitItems;
            updatedLocationLimitItems[index] = {
                ...data, 
                locations: locations,
                locationLimitStatus: 'approved'
            };
            save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');
            toggle();
    }, [index, request, locations, save, toggle]);

    const onDecline = useCallback((data) => {
        
        let updatedLocationLimitItems = request.locationLimitItems;
            updatedLocationLimitItems[index] = {
                ...data, 
                locations: locations,
                locationLimitStatus: 'declined'
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
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Location limit</h1>
                {editable
                    ? <div className="input-group mb-3">
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
                    : null
                }
                

                <div className="list-group mb-3 text-start">
                    <label className="form-label">Selected locations</label>
                    {
                        locations && locations.map((item, index) => {
                            return(<LocationListItem key={index} index={index} item={item} editable={editable} remove={removeFromLocations}/>);
                        })
                    }
                </div>

                <div className="form-floating mb-3">
                    <input type="date" className="form-control" id="locationLimitDate" placeholder="Date" required
                        disabled={!editable} 
                        {...register("locationLimitDate", { required: true })} />
                    <label htmlFor="locationLimitDate" className="form-label">Date</label>
                </div>
                <div className="form-floating mb-3">
                <input type="time" className="form-control" id="locationLimitTime" placeholder="Time" required 
                        disabled={!editable}
                        {...register("locationLimitTime", { required: true })} />
                    <label htmlFor="locationLimitTime" className="form-label">Time</label>
                </div>

                <div className="form-floating mb-3">
                    <select className="form-select" id="locationLimitType" required
                        disabled={!editable}
                        {...register("locationLimitType", { required: true })}>
                        <option value="">Choose...</option>
                        <option>Occupation</option>
                        <option>Posession</option>
                        <option>Maintenance</option>
                    </select>
                    <label htmlFor="locationLimitType">Access Type</label>
                </div>
                
                <div className="form-floating mb-3">
                    <select className="form-select" id="locationIssolation" required
                        disabled={!editable}
                        {...register("locationIssolation", { required: true })}>
                        <option value="">Choose...</option>
                        <option>No issolation (live OLE)</option>
                        <option>De-energise</option>
                        <option>Standard issolation (sub to sub)</option>
                        <option>Special issolation</option>
                    </select>
                    <label htmlFor="locationIssolation">Electrical issolation</label>
                </div>
                
                <div className="list-group mx-0 mb-3">
                    <label className="list-group-item d-flex gap-2">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="signallingResource" 
                                disabled={!editable}
                                {...register("signallingResource")} />
                        </div>
                        <span className="text-start">
                            Signalling resource required
                            <small className="d-block text-muted">Indicate if this request will require signalling resource (e.g. Axle Counter Reset)</small>
                        </span>
                    </label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="locationLimitDuration" placeholder="Duration" required 
                        disabled={!editable}
                        {...register("locationLimitDuration", { required: true })} />
                    <label htmlFor="locationLimitDuration" className="form-label">Duration</label>
                </div>

                <div className="form-floating mb-3">
                     <select className="form-select" id="durationType" required
                        disabled={!editable}
                        {...register("durationType", { required: true })} >
                            <option value="">Choose...</option>
                            <option value="Min">Minutes</option>
                            <option value="Hr">Hours</option>
                            <option value="D">Days</option>
                            <option value="Wks">Weeks</option>
                    </select>
                    <label htmlFor="durationType">Duration type</label>
                </div>
                
                <div className="form-floating mb-3">
                    <select className="form-select" id="nearestHospital" required
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
                    ? <div className="form-floating mb-3">
                        <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save changes</button>
                    </div>
                    : <div className="form-floating mb-3">
                        <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onApprove)}>Approve</button>
                    </div>
                }
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={toggle}>Close</button>
                </div>
                {editable
                    ? <div className="form-floating">
                        <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(onDelete)}>Delete</button>
                    </div>
                    : <div className="form-floating">
                        <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(onDecline)}>Decline</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default LocationLimitForm;