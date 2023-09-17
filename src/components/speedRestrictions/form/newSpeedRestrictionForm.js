import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { createSpeedRestriction } from '../../../store/actions/index';

import Backdrop from '../../ui/backdrop/backdrop';
import Modal from '../../ui/modal/modal';
import Spinner from '../../ui/spinner/spinner';
import locations from '../../../data/locations';
import lines from '../../../data/lines';
import MapView from '../../ui/maps/mapView';
import MapEdit from '../../ui/maps/mapEdit';

const NewSpeedRestrictionForm = () => {

    const dispatch = useDispatch();

    const { idToken, localId, displayName } = useSelector(state => state.auth);
    const {loading, error, identifier }= useSelector(state => state.speedRestriction);

    const onCreateSpeedRestriction = useCallback((idToken, localId, data, identifier) => dispatch(createSpeedRestriction(idToken, localId, data, identifier)),[dispatch]);

    const [line, setLine] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [applyValidationCss, setApplyValidationCss] = useState(false);
    const [mapLocation, setMapLocation] = useState(null);
    const [ editingMap, setEditingMap ] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange',
        defaultValues: {line: '', location: ''}
    });

    // useEffect(() => {
    //     if(errors.title || errors.description || errors.siteContactName || errors.siteContactNumber || errors.projectTitle || errors.projectOrganisation)
    //         setApplyValidationCss(true);
        
    // }, [errors]);

    useEffect(() => {
        if(identifier === 'CREATE_SPEED_RESTRICTION')
            setRedirect(<Navigate to='/speedrestrictions' />);
    }, [identifier]);

    useEffect(() => {
        if(errors.startDate || errors.startTime || errors.line || errors.location || errors.direction || errors.lineSpeed || errors.speedRestriction || errors.reason)
            setApplyValidationCss(true);
    }, [errors]);

    const onSave = useCallback((data) => {
        onCreateSpeedRestriction(idToken, localId, { ...data, type: 'Temporary', status: 'New', originator: displayName, map: JSON.stringify(mapLocation) }, 'CREATE_SPEED_RESTRICTION');
    }, [displayName, idToken, localId, mapLocation, onCreateSpeedRestriction]);

    const onCancel = () => {
        setRedirect(<Navigate to='/speedrestrictions' />);
    }

    // editing map toggle
    const toggleMapEditing = () => {
        setEditingMap(prevState => !prevState);
    };

    // modal edit map
    let modal = null;
    if(editingMap) {
        modal = <Modal
            show={ editingMap }
            modalClosed={ toggleMapEditing }
            content={
                <MapEdit
                    name={ 'new' }
                    locationType={ 'Area' }
                    mapLocation={ mapLocation ? mapLocation : null }
                    save={ setMapLocation }
                    close={ toggleMapEditing }
                />
            } />
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;
    
    return (
        <form className={ applyValidationCss ? 'form-request my-5 shadow was-validated' : 'form-request my-5 shadow' } onSubmit={ handleSubmit(onSave) }>
            {redirect}
            <Backdrop show={ loading } />
                { spinner }
            
            { error &&
                <div className='alert alert-danger' role='alert'>
                    { error }
                </div>
            }
            { modal }

            <div className='text-sm-center'>
                <i className='bi-speedometer2 form-auth-icon'></i>
                <h3 className='h3 mb-3 fw-normal'>New Speed Restriction</h3>
            </div>
            
            {/* Date and Time */}

            <div className='row g-2 bg-light mb-1'>
                <div className='form-floating  col-sm-6'>
                    <input type='date' className='form-control' id='startDate' placeholder='Date' required
                        { ...register('startDate', { required: 'You must provide a start date' }) } />
                    <label htmlFor='startDate' className='form-label'>Start Date</label>
                </div>
                <div className='form-floating col-sm-6'>
                    <input type='time' className='form-control' id='startTime' placeholder='Date' required
                        { ...register('startTime', { required: 'You must provide a start time' }) } />
                    <label htmlFor='startTime' className='form-label'>Start Time</label>
                </div>
            </div>
            { errors.startDate && <p className='form-error mt-1 text-start'>{ errors.startDate.message }</p> }
            { errors.startTime && <p className='form-error mt-1 text-start'>{ errors.startTime.message }</p> }

            <div className='row g-2 bg-light mb-1'>
                    <div className='form-floating col-sm-6'>
                        <select className='form-select' id='line' required
                            {...register('line', {
                                required: 'A value must be selected',
                                onChange: (event => { setLine(event.target.value) })
                            })}>
                            <option value=''>No Filter...</option>
                                {
                                    lines.map(item => {
                                        return (<option key={ item.code } value={ item.line }>{ item.line }</option>)
                                    })
                                }
                        </select>
                        <label htmlFor='line'>Line</label>
                    </div>
                    <div className='form-floating col-sm-6'>
                        <select className='form-select' id='location' required
                            {...register('location', { required: 'A value must be selected' })}>
                            <option value=''>No Filter...</option>
                                {
                                    locations.map(item => {
                                        if(line !== '') {
                                            if(item.line === line)
                                                return (<option key={ item.code } value={ item.name }>{ item.name }</option>);
                                            else
                                                return null;
                                        } else {
                                            return (<option key={ item.code } value={ item.name }>{ item.name }</option>);
                                        }
                                    })
                                }
                        </select>
                        <label htmlFor='location'>Location</label>
                    </div>
            </div>
            { errors.line && <p className='form-error mt-1 text-start'>{ errors.line.message }</p> }
            { errors.location && <p className='form-error mt-1 text-start'>{ errors.location.message }</p> }

            <div className='row g-2 bg-light mb-3'>
                <div className='form-floating col-sm-4'>
                    <select className='form-select' id='direction' required
                        {...register('direction', { required: 'A value must be selected' })}>
                        <option value=''>No Filter...</option>
                        <option value='Inbound'>Inbound</option>
                        <option value='Outbound'>Outbound</option>
                    </select>
                    <label htmlFor='direction'>Direction</label>
                </div>
                <div className='form-floating col-sm-4'>
                    <input type='number' className='form-control' id='lineSpeed' autoComplete='off' placeholder='Line Speed' required 
                        { ...register('lineSpeed', {
                            required: "You must specify a line speed",
                            min: {
                                value: 5,
                                message: 'The minimum line speed must be greater than 5'
                            },
                            max: {
                                value: 50,
                                message: 'The maximum line speed must be 50 or less'
                            }
                        }) }
                    />
                    <label htmlFor='lineSpeed' className='form-label'>Line Speed</label>
                </div>
                <div className='form-floating col-sm-4'>
                    <input type='number' className='form-control' id='speedRestriction' autoComplete='off' placeholder='Speed Restriction' required 
                        { ...register('speedRestriction', {
                            required: 'You must specify a speed restriction',
                            min: {
                                value: 1,
                                message: 'The minimum line speed must be greater than 1'
                            },
                            max: {
                                value: 49,
                                message: 'The maximum line speed must be 49 or less'
                            }
                        }) }
                    />
                    <label htmlFor='speedRestriction' className='form-label'>Speed Restriction</label>
                </div>
                
            </div>
            { errors.direction && <p className='form-error mt-1 text-start'>{ errors.direction.message }</p> }
            { errors.lineSpeed && <p className='form-error mt-1 text-start'>{ errors.lineSpeed.message }</p> }
            { errors.speedRestriction && <p className='form-error mt-1 text-start'>{ errors.speedRestriction.message }</p> }
            
            {/* map section */}
            <div className='mb-3'>
                <div className='form-floating text-end mb-1'>
                    <button className='btn btn-sm btn-primary' type='button' onClick={ toggleMapEditing }>Set Location</button>
                </div>
                <div>
                    <MapView name={ 'new' } locationType={ 'area' } mapLocation={ mapLocation ? mapLocation : null } />
                </div>
            </div>

            <div className='form-floating mb-1'>
                <textarea className='form-control' id='reason'  rows='5' style={{height:'auto'}} placeholder='Reason for speed restriction' required 
                    { ...register('reason', {
                        required: 'You must provide a reason',
                        minLength: {
                            value: 5,
                            message: 'The reason must have at least 5 characters'
                        },
                        maxLength: {
                            value: 500,
                            message: 'The reason must have less than 500 characters'
                        }
                    }) }
                />
                <label htmlFor='reason' className='form-label'>Reason</label>
            </div>
            { errors.description && <p className='form-error mt-1 text-start'>{errors.description.message}</p> }
                
            <div className='mt-2'>
                <div className='form-floating mb-1'>
                    <button className='w-100 btn btn-lg btn-primary' type='submit'>Save</button>
                </div>
                <div className='form-floating'>
                    <button className='w-100 btn btn-lg btn-danger' type='button' onClick={ onCancel }>Cancel</button>
                </div>
            </div>
        </form>
    );
}

export default NewSpeedRestrictionForm;