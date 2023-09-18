import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';
import moment from 'moment';
import { determinStartDate, determinEndDate } from '../../../../shared/utility';

const AccessRequestSummary = (props) => {

    const { summary, locationItems, save, recordLocked } = props;

    const { register, getValues, formState: { errors, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: summary && summary.title,
            description: summary && summary.description,
            accessFirstDay:  summary && summary.accessFirstDay,
            accessLastDay: summary && summary.accessLastDay,
            siteContactName: summary && summary.siteContactName,
            siteContactNumber: summary && summary.siteContactNumber,
            isDisruptive: summary && summary.isDisruptive,
            associatedWithProject: summary && summary.associatedWithProject,
            projectTitle: summary && summary.projectTitle,
            projectOrganisation: summary && summary.projectOrganisation,
            projectRAMs: summary && summary.projectRAMs
        }
    });

    const [ associatedWithProject, setAssociatedWithProject ] = useState(summary && summary.associatedWithProject);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // determin the earliest date and the latest date in the location items array
    useEffect(() => {
        if(locationItems) {
            setStartDate(moment(determinStartDate(locationItems)).format('YYYY-MM-DD'));
            setEndDate(moment(determinEndDate(locationItems)).format('YYYY-MM-DD'));
        }
    }, [locationItems]);

    const toggleAssociatedWithProject = () => {
        setAssociatedWithProject(prevState => !prevState);
        onUpdate();
    }

    const onUpdate = debounce(() => {
        if(isValid)
            save({ summary: { ...getValues() } }, 'SAVE_ACCESS_REQUEST');
    }, 2000);

    return (
        <div>
            <div className='mb-3'>
                {/* Summary section */}
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='title' autoComplete='off' placeholder='Request title' required 
                        disabled={ recordLocked }
                        { ...register('title', {
                            required: "You must specify a title",
                            minLength: {
                                value: 5,
                                message: "The Title must have at least 5 characters"
                            },
                            maxLength: {
                                value: 50,
                                message: 'The Title must have less than 50 characters'
                            },
                            onChange: onUpdate
                        }) }
                    />
                    <label htmlFor='title' className='form-label'>Title</label>
                </div>
                { errors.title && <p className='form-error mt-1 text-start'>{errors.title.message}</p> }

                <div className='form-floating mb-3'>
                    <textarea className='form-control' id='description'  rows='5' style={{height:'auto'}} placeholder='Request description' required 
                        disabled={ recordLocked }
                        { ...register('description', {
                            required: "You must provide a description",
                            minLength: {
                                value: 5,
                                message: "The Description must have at least 5 characters"
                            },
                            maxLength: {
                                value: 250,
                                message: 'The Description must have less than 250 characters'
                            },
                            onChange: onUpdate
                        }) }
                    />
                    <label htmlFor='description' className='form-label'>Description</label>
                </div>
                { errors.description && <p className='form-error mt-1 text-start'>{errors.description.message}</p> }

                {summary != null
                    ?   <div className='row g-2 mb-3'>
                            <div className='form-floating  col-sm-6'>
                                <input type='date' className='form-control' id='accessFirstDay' placeholder='First day of access' disabled
                                    value={ startDate } 
                                />
                                <label htmlFor='accessFirstDay' className='form-label'>Access First day</label>
                            </div>
                            <div className='form-floating col-sm-6 mb-1'>
                                <input type='date' className='form-control' id='accessLastDay' placeholder='Last day of access' disabled
                                    value={ endDate } 
                                />
                                <label htmlFor='accessLastDay' className='form-label'>Access Last day</label>
                            </div>
                        </div>
                    :   null
                }

                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='siteContactName' autoComplete='off' placeholder='Competent person' required 
                        disabled={ recordLocked }
                        { ...register('siteContactName', {
                            required: "You must provide the name of the Site Contact",
                            minLength: {
                                value: 5,
                                message: "The Site Contact Name must have at least 5 characters"
                            },
                            maxLength: {
                                value: 250,
                                message: 'The Site Contact Name must have less than 250 characters'
                            },
                            onChange: onUpdate
                        }) }
                    />
                    <label htmlFor='siteContactName' className='form-label'>Site Contact</label>
                </div>
                { errors.siteContactName && <p className='form-error mt-1 text-start'>{errors.siteContactName.message}</p> }

                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='siteContactNumber' autoComplete='off' placeholder='Site contact number' required 
                        disabled={ recordLocked }
                        {...register('siteContactNumber', { 
                            required: 'You must provide a Site Contact telephone number', 
                            pattern: {
                                value: /^\+?(?:\d\s?){10,12}$/, 
                                message: "The Site Contact telephone number's format is incorrect"
                            },
                            onChange: onUpdate
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
                                    disabled={ recordLocked }
                                    {...register('isDisruptive', {  onChange: onUpdate })}
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
                <div className='border rounded p-1 mb-1 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='associatedWithProject'
                                    disabled={ recordLocked }
                                    { ...register('associatedWithProject', { onChange:  toggleAssociatedWithProject }) }
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
                                        disabled={ recordLocked }
                                        { ...register('projectTitle', {
                                            required: "You must provide a project title",
                                            minLength: {
                                                value: 5,
                                                message: "The Project Title must have at least 5 characters"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: 'The Project Title must have less than 50 characters'
                                            },
                                            onChange: onUpdate
                                        }) }
                                    />
                                    <label htmlFor='projectTitle' className='form-label'>Project Title</label>
                                </div>
                                { errors.projectTitle && <p className='form-error mt-1 text-start'>{errors.projectTitle.message}</p> }

                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control' id='projectOrganisation' autoComplete='off' placeholder='Project organisation' required
                                        disabled={ recordLocked }
                                        {...register('projectOrganisation', {
                                            required: "You must provide the name of the Project Organisation",
                                            minLength: {
                                                value: 5,
                                                message: "The Organisation Name must have at least 5 characters"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: 'The Organisation Name must have less than 50 characters'
                                            },
                                            onChange: onUpdate
                                        }) }
                                    />
                                    <label htmlFor='projectOrganisation' className='form-label'>Project Organisation</label>
                                </div>
                                { errors.projectOrganisation && <p className='form-error mt-1 text-start'>{errors.projectOrganisation.message}</p> }

                                <div className='form-floating'>
                                    <select className='form-select' id='projectRAMs' required
                                        disabled={ recordLocked }
                                        {...register('projectRAMs', { 
                                            required: 'A value must be selected', 
                                            onChange: onUpdate 
                                        }) }>
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
        </div>
    );
}

export default AccessRequestSummary;