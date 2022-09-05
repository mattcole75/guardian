import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const RequestSummary = (props) => {

    const { request, save, editable } = props;

    const { register, handleSubmit, formState } = useForm({
        mode: 'onChange',
        // defaultValues: request // the bug is here
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
    }

    const onSave = useCallback((data) => {
        save(data, 'SAVE_REQUEST');
    }, [save]);

    return (
        <div>
            <div>
                {/* Summary section */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="accessRequestTitle" placeholder="Request title" required 
                        disabled={!editable}
                        {...register("accessRequestTitle", { required: true, minLength: 3 })} />
                    <label htmlFor="accessRequestTitle" className="form-label">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="accessRequestDescription"  rows="5" style={{height:"auto"}} placeholder="Request description" required 
                        disabled={!editable}
                        {...register("accessRequestDescription", { required: true, minLength: 5 })} />
                    <label htmlFor="accessRequestDescription" className="form-label">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="accessRequestCompetentPerson" placeholder="Competent person" required 
                        disabled={!editable}
                        {...register("accessRequestCompetentPerson", { required: true, minLength: 3 })} />
                    <label htmlFor="accessRequestCompetentPerson" className="form-label">Competent Person</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="accessRequestCompetentPersonPhoneNumber" placeholder="Site contact number" required 
                        disabled={!editable}
                        {...register("accessRequestCompetentPersonPhoneNumber", { required: true, minLength: 3 })} />
                    <label htmlFor="accessRequestCompetentPersonPhoneNumber" className="form-label">Competent Person Phone Number</label>
                </div>

                {/* Project section */}
                <div className='border rounded p-1 mb-1 bg-light'>
                    <div className="list-group mx-0">
                        <label className="list-group-item d-flex gap-2">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="associatedWithProject" 
                                    disabled={!editable}
                                    {...register('associatedWithProject', { onChange:  toggleAssociatedWithProject })}
                                />
                            </div>
                            <span className="text-start">
                                Is this Access Request associated with a project?
                                <small className="d-block text-muted">Indicate if this access request is associated with a project or programme</small>
                            </span>
                        </label>
                    </div>
                    { associatedWithProject
                        ?   <div className="mt-1">
                                <div className="form-floating mb-1">
                                    <input type="text" className="form-control" id="projectTitle" placeholder="Project title" required 
                                        disabled={!editable}
                                        {...register("projectTitle", { required: true, minLength: 3 })} />
                                    <label htmlFor="projectTitle" className="form-label">Project Title</label>
                                </div>
                                <div className="form-floating mb-1">
                                    <input type="text" className="form-control" id="projectOrganisation" placeholder="Project organisation" required
                                        disabled={!editable}
                                        {...register("projectOrganisation", { required: true })} />
                                    <label htmlFor="projectOrganisation" className="form-label">Project Organisation</label>
                                </div>
                                <div className="form-floating">
                                    <select className="form-select" id="projectRAMs" disabled={!editable} required
                                        {...register("projectRAMs", { required: true })}>
                                        <option value="">Choose...</option>
                                        <option>Approved by KAM</option>
                                        <option>Submitted to KAM</option>
                                        <option>In Progress not Submitted to KAM</option>
                                    </select>
                                    <label htmlFor="projectRAMs">Project Risk & Method Statement Status</label>
                                </div>
                            </div>
                        :   null
                    }
                </div>

            </div>

            {editable 
                ? <div className="border-bottom mb-3">
                    <button className="w-100 btn btn-lg btn-secondary mb-3" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save Access Request Summary</button>
                </div>
                : null
            }
        </div>
    );
}

export default RequestSummary;