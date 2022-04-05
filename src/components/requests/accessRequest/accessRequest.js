import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const AccessRequest = (props) => {

    const { save, editable } = props;

    const request = useSelector(state => state.requests.request);
    const { register, handleSubmit, formState } = useForm({ 
        mode: 'onChange',
        // defaultValues: request // the bug is here
        defaultValues: {
            requestorName: request && request.requestorName,
            requestorPhone: request && request.requestorPhone,
            requestorEmail: request && request.requestorEmail,
            requestorOrganisation: request && request.requestorOrganisation,
            projectTitle: request && request.projectTitle,
            projectOrganisation: request && request.projectOrganisation,
            projectChangeRequestID: request && request.projectChangeRequestID,
            accessTypeDisruptive: request && request.accessTypeDisruptive,
            accessRequestTitle: request && request.accessRequestTitle,
            accessRequestDescription: request && request.accessRequestDescription,
            accessRequestCompetentPerson: request && request.accessRequestCompetentPerson,
            accessRequestSiteContactPhone: request && request.accessRequestSiteContactPhone
        }
    });

    const onSave = useCallback((data) => {
        save(data, 'SAVE_REQUEST');
    }, [save]);

    return (
        <div>
            <div className="mb-3 border-bottom mb-3">
                <h6 className="h6 text-start">Your details:</h6>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="requestorName" placeholder="Your name" required minLength={3} maxLength={32}
                        disabled={!editable}
                        {...register("requestorName", { required: true, minLength: 3, maxLength: 32 })} />
                    <label htmlFor="requestorName" className="form-label">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="tel" className="form-control" id="requestorPhone" placeholder="Your phone number" required 
                        disabled={!editable}
                        {...register("requestorPhone", { required: true })} />
                    <label htmlFor="requestorPhone" className="form-label">Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="requestorEmail" placeholder="name@example.com" required
                        disabled={!editable}
                        {...register("requestorEmail", { required: true, pattern: /^\S+@\S+$/i })} />
                    <label htmlFor="requestorEmail" className="form-label">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="requestorOrganisation" placeholder="Your organisation" required
                        disabled={!editable}
                        {...register("requestorOrganisation", { required: true, minLength: 3, maxLength: 32 })} />
                    <label htmlFor="requestorOrganisation" className="form-label">Organisation</label>
                </div>
            </div>

            <div className="mb-3 border-bottom mb-3">
                <h6 className="h6 text-start">Project details:</h6>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="projectTitle" placeholder="Project title" required 
                        disabled={!editable}
                        {...register("projectTitle", { required: true, minLength: 3 })} />
                    <label htmlFor="projectTitle" className="form-label">Project title</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="projectOrganisation" placeholder="Project organisation" required
                        disabled={!editable}
                        {...register("projectOrganisation", { required: true })} />
                    <label htmlFor="projectOrganisation" className="form-label">Project organisation</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="projectChangeRequestID" placeholder="Approved change request number" required 
                        disabled={!editable}
                        {...register("projectChangeRequestID", { required: true, minLength: 1 })} />
                    <label htmlFor="projectChangeRequestID" className="form-label">Change request ID</label>
                </div>
            </div>

            <div className="mb-3 border-bottom mb-3">
                <h6 className="h6 text-start">Access Request details:</h6>

                <div className="list-group mx-0 mb-3">
                    <label className="list-group-item d-flex gap-2">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="accessTypeDisruptive" 
                                disabled={!editable}
                                {...register("accessTypeDisruptive")} />
                        </div>
                        <span className="text-start">
                            Disruptive access request
                            <small className="d-block text-muted">Indicate if this request will be disruptive to normal operations</small>
                        </span>
                    </label>
                </div>

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
                    <label htmlFor="accessRequestCompetentPerson" className="form-label">Competent person</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="accessRequestSiteContactPhone" placeholder="Site contact number" required 
                        disabled={!editable}
                        {...register("accessRequestSiteContactPhone", { required: true, minLength: 3 })} />
                    <label htmlFor="accessRequestSiteContactPhone" className="form-label">Site contact number</label>
                </div>
            </div>

            {editable 
                ? <div className="border-bottom mb-3">
                    <button className="w-100 btn btn-lg btn-primary mb-3" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save section (draft)</button>
                </div>
                : null
            }
        </div>
    );
}

export default AccessRequest;