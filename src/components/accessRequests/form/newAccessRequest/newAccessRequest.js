import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { userCreateAccessRequest } from '../../../../store/actions/index';
import Backdrop from '../../../ui/backdrop/backdrop';
import Spinner from '../../../ui/spinner/spinner';

const NewAccessRequest = () => {

    const dispatch = useDispatch();

    const { idToken, localId, displayName, phoneNumber, email, organisation } = useSelector(state => state.auth);
    const {loading, error, identifier }= useSelector(state => state.accessRequest);

    const onCreateAccessRequest = useCallback((idToken, localId, data, identifier) => dispatch(userCreateAccessRequest(idToken, localId, data, identifier)), [dispatch]);

    const [redirect, setRedirect] = useState(null);
    const [associatedWithProject, setAssociatedWithProject] = useState(false);
    const [applyValidationCss, setApplyValidationCss] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

    useEffect(() => {
        if(errors.title || errors.description || errors.siteContactName || errors.siteContactNumber || errors.projectTitle || errors.projectOrganisation)
            setApplyValidationCss(true);
        
    }, [errors]);

    useEffect(() => {
        if(identifier === 'CREATE_ACCESS_REQUEST')
        setRedirect(<Navigate to='/accessrequests' />);
    }, [identifier]);

    const toggleAssociatedWithProject = () => {
        setAssociatedWithProject(prevState => !prevState);
    }

    const onSave = useCallback((data) => {
        onCreateAccessRequest(idToken, localId, {
            summary: {
                ...data
            }, 
            requestor: {
                localId: localId,
                name: displayName,
                phoneNumber: phoneNumber,
                email: email,
                organisation: organisation
            },
            eventLog: [{
                user: displayName,
                logged: moment().format(),
                event: 'Access Request Created'
            }]
            }, 'CREATE_ACCESS_REQUEST');
    }, [displayName, email, idToken, localId, onCreateAccessRequest, organisation, phoneNumber ]);

    const onCancel = () => {
        setRedirect(<Navigate to='/accessrequests' />);
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

            <div className='text-sm-center'>
                    <i className='bi-calendar2-plus form-auth-icon'></i>
                    <h3 className='h3 mb-3 fw-normal'>New Access Request</h3>
                </div>
            <div className='mb-3'>
                {/* Summary section */}
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='title' autoComplete='off' placeholder='Request title' required 
                        { ...register('title', {
                            required: "You must specify a title",
                            minLength: {
                                value: 5,
                                message: "The Title must have at least 5 characters"
                            },
                            maxLength: {
                                value: 50,
                                message: 'The Title must have less than 50 characters'
                            }
                        }) }
                    />
                    <label htmlFor='title' className='form-label'>Title</label>
                </div>
                { errors.title && <p className='form-error mt-1 text-start'>{errors.title.message}</p> }

                <div className='form-floating mb-3'>
                    <textarea className='form-control' id='description'  rows='5' style={{height:'auto'}} placeholder='Request description' required 
                        { ...register('description', {
                            required: "You must provide a description",
                            minLength: {
                                value: 5,
                                message: "The Description must have at least 5 characters"
                            },
                            maxLength: {
                                value: 250,
                                message: 'The Description must have less than 250 characters'
                            }
                        }) }
                    />
                    <label htmlFor='description' className='form-label'>Description</label>
                </div>
                { errors.description && <p className='form-error mt-1 text-start'>{errors.description.message}</p> }
                
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='siteContactName' autoComplete='off' placeholder='Competent person' required 
                        { ...register('siteContactName', {
                            required: "You must provide the name of the Site Contact",
                            minLength: {
                                value: 5,
                                message: "The Site Contact Name must have at least 5 characters"
                            },
                            maxLength: {
                                value: 250,
                                message: 'The Site Contact Name must have less than 50 characters'
                            }
                        }) }
                    />
                    <label htmlFor='siteContactName' className='form-label'>Site Contact</label>
                </div>
                { errors.siteContactName && <p className='form-error mt-1 text-start'>{errors.siteContactName.message}</p> }

                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='siteContactNumber' autoComplete='off' placeholder='Site contact number' required 
                        {...register('siteContactNumber', { 
                            required: 'You must provide a Site Contact telephone number', 
                            pattern: {
                                value: /^\+?(?:\d\s?){10,12}$/, 
                                message: "The Site Contact telephone number's format is incorrect"
                            } 
                        })}
                    />
                    <label htmlFor='siteContactNumber' className='form-label'>Site Contact Phone Number</label>
                </div>
                { errors.siteContactNumber && <p className='form-error mt-1 text-start'>{errors.siteContactNumber.message}</p> }

                {/* disruptive */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='isDisruptive'
                                    {...register('isDisruptive')}
                                />
                            </div>
                            <span className='text-start'>
                                Is this Access Request going to disrupt the network?
                                <small className='d-block text-muted'>Indicate if this access request is going to cause disruption to Operational and/or Maintenance activities.</small>
                            </span>
                        </label>
                    </div>
                </div>

                {/* Project section */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='associatedWithProject'
                                    {...register('associatedWithProject', { onChange:  toggleAssociatedWithProject })}
                                />
                            </div>
                            <span className='text-start'>
                                Is this Access Request associated with a project?
                                <small className='d-block text-muted'>Indicate if this access request is associated with a project or programme</small>
                            </span>
                        </label>
                    </div>
                    { associatedWithProject
                        ?   <div className='mt-1'>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control' id='projectTitle' autoComplete='off' placeholder='Project title' required 
                                        {...register('projectTitle', {
                                            required: "You must provide a project title",
                                            minLength: {
                                                value: 5,
                                                message: "The Project Title must have at least 5 characters"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: 'The Project Title must have less than 50 characters'
                                            }
                                        }) }
                                    />
                                    <label htmlFor='projectTitle' className='form-label'>Project Title</label>
                                </div>
                                { errors.projectTitle && <p className='form-error mt-1 text-start'>{errors.projectTitle.message}</p> }

                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control' id='projectOrganisation' autoComplete='off' placeholder='Project organisation' required
                                        {...register('projectOrganisation', {
                                            required: "You must provide the name of the Project Organisation",
                                            minLength: {
                                                value: 5,
                                                message: "The Organisation Name must have at least 5 characters"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: 'The Organisation Name must have less than 50 characters'
                                            }
                                        }) }
                                    />
                                    <label htmlFor='projectOrganisation' className='form-label'>Project Organisation</label>
                                </div>
                                { errors.projectOrganisation && <p className='form-error mt-1 text-start'>{errors.projectOrganisation.message}</p> }

                                <div className='form-floating'>
                                    <select className='form-select' id='projectRAMs' required
                                        {...register('projectRAMs', { required: 'A value must be selected' })}>
                                        <option value=''>Choose...</option>
                                        <option>Approved by KAM</option>
                                        <option>Submitted to KAM</option>
                                        <option>In Progress not Submitted to KAM</option>
                                    </select>
                                    <label htmlFor='projectRAMs'>Project Risk & Method Statement Status</label>
                                </div>
                                { errors.projectRAMs && <p className='form-error mt-1 text-start'>{errors.projectRAMs.message}</p> }
                            </div>
                        :   null
                    }
                </div>
            </div>

            <div>
                <div className='form-floating mb-3'>
                    <button className='w-100 btn btn-lg btn-primary' type='submit'>Save</button>
                </div>
                <div className='form-floating'>
                    <button className='w-100 btn btn-lg btn-danger' type='button' onClick={ onCancel }>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default NewAccessRequest;