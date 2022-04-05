import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import locationList from '../../../../data/locations';
import LocationListItem from './locationListItem';

const LocationLimitForm = (props) => {

    const { request, index, editable, save, toggle } = props;

    const { register, handleSubmit, formState, getValues } = useForm({ 
        mode: 'onChange', 
        defaultValues: request && request.locationLimitItems[index]
    });

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if(index === null){ 
           setLocations([]);
        } else {
            
            setLocations(request.locationLimitItems[index].locations);
        }
            
    }, [index, request.locationLimitItems])

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

    const onDelete = useCallback(() => {

        request.locationLimitItems.splice(index, 1);
        let updatedLocationLimitItems = request.locationLimitItems;
        save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');
        toggle();

    }, [index, request.locationLimitItems, save, toggle]);

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
                        <option>Occupation (no isolation)</option>
                        <option>Occupation (isolation)</option>
                        <option>Posession (no isolation)</option>
                        <option>Posession (isolation)</option>
                        <option>Maintenance (no isolation)</option>
                        <option>Maintenance (isolation)</option>
                    </select>
                    <label htmlFor="locationLimitType">Access Type</label>
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
                
                {editable
                    ? <div className="form-floating mb-3">
                        <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save changes</button>
                    </div>
                    : null
                }
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={toggle}>Close</button>
                </div>
                {editable
                    ?<div className="form-floating">
                        <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(onDelete)}>Delete</button>
                    </div>
                    : null
                }
            </form>
        </div>
    )
}

export default LocationLimitForm;