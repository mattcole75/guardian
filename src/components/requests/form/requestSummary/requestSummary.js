import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const RequestSummary = (props) => {

    const { request, save, recordLocked } = props;

    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            accessRequestTitle: request && request.accessRequestTitle,
            accessRequestDescription: request && request.accessRequestDescription,
            accessRequestCompetentPerson: request && request.accessRequestCompetentPerson,
            accessRequestCompetentPersonPhoneNumber: request && request.accessRequestCompetentPersonPhoneNumber,
            associatedWithProject: request && request.associatedWithProject,
            projectTitle: request && request.projectTitle,
            projectOrganisation: request && request.projectOrganisation,
            projectRAMs: request && request.projectRAMs
        }
    });

    const [associatedWithProject, setAssociatedWithProject] = useState(request && request.associatedWithProject);

    const toggleAssociatedWithProject = () => {
        setAssociatedWithProject(prevState => !prevState);
        onUpdate();
    }

    const onUpdate = debounce(() => {
        save(getValues(), 'SAVE_REQUEST');
    }, 2000);

    return (
        <div>
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
        </div>
    );
}

export default RequestSummary;