import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';
import { Navigate } from 'react-router-dom';
import moment from 'moment';
import { determinStartDate, determinEndDate } from '../../../../shared/utility';

const AccessRequestSummary = (props) => {

    const { summary, locationLimitItems, save, recordLocked } = props;

    const { register, getValues, formState } = useForm({
        mode: 'onChange',
        defaultValues: {
            accessRequestTitle: summary && summary.accessRequestTitle,
            accessRequestDescription: summary && summary.accessRequestDescription,
            accessFirstDay:  summary && summary.accessFirstDay,
            accessLastDay: summary && summary.accessLastDay,
            accessRequestCompetentPerson: summary && summary.accessRequestCompetentPerson,
            accessRequestCompetentPersonPhoneNumber: summary && summary.accessRequestCompetentPersonPhoneNumber,
            associatedWithProject: summary && summary.associatedWithProject,
            isDisruptive: summary && summary.isDisruptive,
            projectTitle: summary && summary.projectTitle,
            projectOrganisation: summary && summary.projectOrganisation,
            projectRAMs: summary && summary.projectRAMs
        }
    });

    const [associatedWithProject, setAssociatedWithProject] = useState(summary && summary.associatedWithProject);
    const [redirect, setRedirect] = useState(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // determin the earliest date and the latest date in the location limit items array
    useEffect(() => {
        if(locationLimitItems) {
            setStartDate(moment(determinStartDate(locationLimitItems)).format('YYYY-MM-DD'));
            setEndDate(moment(determinEndDate(locationLimitItems)).format('YYYY-MM-DD'));
        }
    }, [locationLimitItems]);

    const toggleAssociatedWithProject = () => {
        setAssociatedWithProject(prevState => !prevState);
        onUpdate();
    }

    const onUpdate = debounce(() => {
        if(summary != null)
            save({ summary: { ...getValues() } }, 'SAVE_ACCESS_REQUEST');
    }, 2000);

    const onCreate = () => {
        save({ summary: { ...getValues() } }, 'SAVE_ACCESS_REQUEST');
    }

    const onCancel = () => {
        setRedirect(<Navigate to='/accessrequests' />);
    }

    return (
        <div>
            {redirect}
            <div className='mb-3'>
                {/* Summary section */}
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='accessRequestTitle' autoComplete='off' placeholder='Request title' required 
                        disabled={recordLocked}
                        {...register('accessRequestTitle', { required: true, minLength: 3, onChange: onUpdate })} />
                    <label htmlFor='accessRequestTitle' className='form-label'>Title</label>
                </div>
                <div className='form-floating mb-3'>
                    <textarea className='form-control' id='accessRequestDescription'  rows='5' style={{height:'auto'}} placeholder='Request description' required 
                        disabled={recordLocked}
                        {...register('accessRequestDescription', { required: true, minLength: 5, onChange: onUpdate })} />
                    <label htmlFor='accessRequestDescription' className='form-label'>Description</label>
                </div>
                {summary != null
                    ?   <div className='row g-2 mb-3'>
                            <div className='form-floating  col-sm-6'>
                                <input type='date' className='form-control' id='accessFirstDay' placeholder='First day of access'
                                    value={ startDate } disabled={ true }
                                />
                                <label htmlFor='accessFirstDay' className='form-label'>Access First day</label>
                            </div>
                            <div className='form-floating col-sm-6 mb-1'>
                                <input type='date' className='form-control' id='accessLastDay' placeholder='Last day of access'
                                    value={ endDate } disabled={ true }
                                />
                                <label htmlFor='accessLastDay' className='form-label'>Access Last day</label>
                            </div>
                        </div>
                    :   null
                }
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='accessRequestCompetentPerson' autoComplete='off' placeholder='Competent person' required 
                        disabled={recordLocked}
                        {...register('accessRequestCompetentPerson', { required: true, minLength: 3, onChange: onUpdate })} />
                    <label htmlFor='accessRequestCompetentPerson' className='form-label'>Competent Person</label>
                </div>
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='accessRequestCompetentPersonPhoneNumber' autoComplete='off' placeholder='Site contact number' required 
                        disabled={recordLocked}
                        {...register('accessRequestCompetentPersonPhoneNumber', { required: true, minLength: 3, onChange: onUpdate })} />
                    <label htmlFor='accessRequestCompetentPersonPhoneNumber' className='form-label'>Competent Person Phone Number</label>
                </div>

                {/* disruptive */}
                <div className='border rounded p-1 mb-3 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='isDisruptive'
                                    disabled={recordLocked}
                                    {...register('isDisruptive', { onChange:  onUpdate })}
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
                                    disabled={recordLocked}
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
                                <div className='form-floating mb-1'>
                                    <input type='text' className='form-control' id='projectTitle' autoComplete='off' placeholder='Project title' required 
                                        disabled={recordLocked}
                                        {...register('projectTitle', { required: true, minLength: 3, onChange: onUpdate })} />
                                    <label htmlFor='projectTitle' className='form-label'>Project Title</label>
                                </div>
                                <div className='form-floating mb-1'>
                                    <input type='text' className='form-control' id='projectOrganisation' autoComplete='off' placeholder='Project organisation' required
                                        disabled={recordLocked}
                                        {...register('projectOrganisation', { required: true, onChange: onUpdate })} />
                                    <label htmlFor='projectOrganisation' className='form-label'>Project Organisation</label>
                                </div>
                                <div className='form-floating'>
                                    <select className='form-select' id='projectRAMs' required
                                        disabled={recordLocked}
                                        {...register('projectRAMs', { required: true, onChange: onUpdate })}>
                                        <option value=''>Choose...</option>
                                        <option>Approved by KAM</option>
                                        <option>Submitted to KAM</option>
                                        <option>In Progress not Submitted to KAM</option>
                                    </select>
                                    <label htmlFor='projectRAMs'>Project Risk & Method Statement Status</label>
                                </div>
                            </div>
                        :   null
                    }
                </div>
            </div>
            {summary == null
                ?   <div>
                        <div className='form-floating mb-3'>
                            <button className='w-100 btn btn-lg btn-primary' type='button' disabled={!formState.isValid} onClick={ onCreate }>Save</button>
                        </div>
                        <div className='form-floating'>
                            <button className='w-100 btn btn-lg btn-danger' type='button' onClick={ onCancel }>Cancel</button>
                        </div>
                    </div>
                :   null
            }
        </div>
    );
}

export default AccessRequestSummary;