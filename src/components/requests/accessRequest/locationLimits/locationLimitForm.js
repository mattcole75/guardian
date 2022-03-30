import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import locationList from '../../../../data/locations';
import LocationListItem from './locationListItem';

const LocationLimitForm = (props) => {

    const { register, handleSubmit, formState, getValues } = useForm({ 
        mode: 'onChange', 
        defaultValues: props.request.locationLimitItems[props.index]
    });

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if(props.index === null){ 
           setLocations([]);
        } else {
            
            setLocations(props.request.locationLimitItems[props.index].locations);
        }
            
    }, [props.index, props.request])

    const addToLocations = () => {
        let locs = [];

        if(props.index && props.request.locationLimitItems[props.index].locations){
            locs = props.request.locationLimitItems[props.index].locations;
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

    const save = useCallback((data) => {

        if(props.request && props.index === null) {
            let updatedLocationLimitItems = props.request.locationLimitItems;
            updatedLocationLimitItems.push(
                {
                    ...data, 
                    locations: locations,
                    locationLimitStatus: 'pending'
                });
            props.save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');

        } else if (props.request && props.index !== null) {
            let updatedLocationLimitItems = props.request.locationLimitItems;
            updatedLocationLimitItems[props.index] = {
                ...data, 
                locations: locations,
                locationLimitStatus: 'pending'
            };
            props.save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');

        } else {
            props.save({locationLimitItems: [{
                    ...data, 
                    locations: locations,
                    locationLimitStatus: 'pending'
                }]}, 'SAVE_LOCATION_LIMIT');
        }
        props.toggle();

    }, [locations, props]);

    const remove = useCallback(() => {

        props.request.locationLimitItems.splice(props.index, 1);
        let updatedLocationLimitItems = props.request.locationLimitItems;
        props.save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');
        props.toggle();

    }, [props]);

    return (
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Location limit</h1>

                <div className="input-group mb-3">
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

                <div className="list-group mb-3 text-start">
                    <label className="form-label">Selected locations</label>
                    {
                        locations && locations.map((item, index) => {
                            return(<LocationListItem key={index} index={index} item={item} remove={removeFromLocations}/>);
                        })
                    }
                </div>

                <div className="form-floating mb-3">
                    <input type="date" className="form-control" id="locationLimitDate" placeholder="Date" required 
                        {...register("locationLimitDate", { required: true })} />
                    <label htmlFor="locationLimitDate" className="form-label">Date</label>
                </div>
                <div className="form-floating mb-3">
                <input type="time" className="form-control" id="locationLimitTime" placeholder="Time" required 
                        {...register("locationLimitTime", { required: true })} />
                    <label htmlFor="locationLimitTime" className="form-label">Time</label>
                </div>

                <div className="form-floating mb-3">
                    <select className="form-select" id="locationLimitType" required
                        {...register("locationLimitType", { required: true })}>
                        <option value="">Choose...</option>
                        <option>Occupation (no issolation)</option>
                        <option>Occupation (issolation)</option>
                        <option>Posession (no issolation)</option>
                        <option>Posession (issolation)</option>
                        <option>Maintenance (no issolation)</option>
                        <option>Maintenance (issolation)</option>
                    </select>
                    <label htmlFor="locationLimitType">Access Type</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="locationLimitDuration" placeholder="Duration" required 
                        {...register("locationLimitDuration", { required: true })} />
                    <label htmlFor="locationLimitDuration" className="form-label">Duration</label>
                </div>

                <div className="form-floating mb-3">
                     <select className="form-select" id="durationType" required
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
                    <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(save)}>Save changes</button>
                </div>
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={props.toggle}>Close</button>
                </div>
                <div className="form-floating">
                    <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(remove)}>Delete</button>
                </div>
                
            </form>
        </div>
    )
}

export default LocationLimitForm;