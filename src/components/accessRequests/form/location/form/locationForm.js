import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import network_locations from '../../../../../configuration/lists/locations.json';
import network_hospitals from '../../../../../configuration/lists/hospitals.json';
import List from './list/list';


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
                
                <div className='form-floating mb-2'>
                    <input type='text' className='form-control' id='location_details' autoComplete='off' placeholder='Location Details' minLength={0} maxLength={61} disabled={recordLocked}
                        { ...register('location_details' ) }
                    />
                    <label htmlFor='location_details' className='form-label'>Location Details</label>
                </div>

        
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
                                message: 'The maximum shift count is 100'
                            }
                        }) }
                    />
                    <label htmlFor='shifts' className='form-label'>How many shifts will you be using?</label>
                    { errors.shifts && <p className='form-error mt-1 text-start'>{errors.shifts.message}</p> }
                </div>
                
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
                    <label htmlFor='nearestHospital'>Nearest hospital?</label>
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
                
            </div>
        </form>
    )
}

export default LocationForm;