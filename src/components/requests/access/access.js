import React from 'react';
import { useForm } from 'react-hook-form';

const Access = (props) => {

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

    return (
        <div className="form-request my-5">
            {/* <Backdrop show={loading} />
                {spinner}
            {isAuthenticated && <Redirect to={authRedirectPath} />}
            {error &&
                <div className="alert alert-danger" role="alert">
                    {error.message}
                </div>
            } */}
            <form className="was-validated">
                <div className="text-sm-center">
                    <i className="bi-plus-circle-dotted form-auth-icon"></i>
                    <h1 className="h3 mb-3 fw-normal">Access Request</h1>
                </div>
                
                <div className="form-floating mb-3">
                    <h6 className="h6 text-start">Your details:</h6>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="name" placeholder="Your name" required {...register("name", { required: true, minLength: 3 })} />
                        <label htmlFor="name" className="form-label">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="tel" className="form-control" id="phone" placeholder="Your phone number" required {...register("phone", { required: true })} />
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" required {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                        <label htmlFor="email" className="form-label">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="organisation" placeholder="Your organisation" required {...register("organisation", { required: true })} />
                        <label htmlFor="organisation" className="form-label">Organisation</label>
                    </div>

                    <h6 className="h6 text-start">Project details:</h6>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="projectTitle" placeholder="Project title" required {...register("projectTitle", { required: true, minLength: 3 })} />
                        <label htmlFor="projectTitle" className="form-label">Project title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="projectOrganisation" placeholder="Project organisation" required {...register("projectOrganisation", { required: true })} />
                        <label htmlFor="organisation" className="form-label">Project organisation</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="changeRequestId" placeholder="Approved change request number" required {...register("changeRequestId", { required: true, minLength: 1 })} />
                        <label htmlFor="changeRequestId" className="form-label">Change request ID</label>
                    </div>

                    <h6 className="h6 text-start">Request details:</h6>
                    <div className="list-group mx-0 mb-3">
                        <label className="list-group-item d-flex gap-2">
                        <input className="form-check-input flex-shrink-0" type="radio" name="accessTypeGroupRadios" id="disruptiveAccessRequest" {...register("isStandardAccess", { required: true })} checked />
                            <span className="text-start">
                                Disruptive access request
                                <small className="d-block text-muted">Disruptive Access Request</small>
                            </span>
                        </label>
                        <label className="list-group-item d-flex gap-2">
                            <input className="form-check-input flex-shrink-0" type="radio" name="accessTypeGroupRadios" id="standardAccessRequest" {...register("isStandardAccess", { required: true })} />
                            <span className="text-start">
                                Standard access request
                                <small className="d-block text-muted">Standard access request with 12 week lead time</small>
                            </span>
                        </label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="title" placeholder="Request title" required {...register("title", { required: true, minLength: 3 })} />
                        <label htmlFor="title" className="form-label">Title</label>
                    </div>

                    <div className="form-floating mb-3">
                        <textarea className="form-control" id="description"  rows="5" style={{height:"auto"}} placeholder="Request description" required {...register("description", { required: true, minLength: 5 })} />
                        <label htmlFor="description" className="form-label">Description</label>
                    </div>

                    <h6 className="h6 text-start">Location limits:</h6>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="from" placeholder="From" required {...register("from", { required: true, minLength: 3 })} />
                        <label htmlFor="name" className="form-label">From</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="to" placeholder="To" required {...register("to", { required: true, minLength: 3 })} />
                        <label htmlFor="name" className="form-label">To</label>
                    </div>
                    <div className="text-start mb-3" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success">Add limit item</button>
                    </div>

                    <div className="list-group mb-3 text-start">
                        <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <i className="bi-wrench access-icon access-icon-proceed"></i>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75"><strong>Date/Time: </strong>20/06/2022 01:00</p>
                                    <p className="mb-0 opacity-75"><strong>Type: </strong>Occupation (issolation)</p>
                                    <p className="mb-0 opacity-75"><strong>Duration: </strong>3h</p>
                                </div>
                                <small className="opacity-70 text-nowrap access-icon-proceed">approved</small>
                            </div>
                        </a>
                        <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <i className="bi-wrench access-icon access-icon-pending"></i>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75"><strong>Date/Time: </strong>21/06/2022 01:00</p>
                                    <p className="mb-0 opacity-75"><strong>Type: </strong>Posession (issolation)</p>
                                    <p className="mb-0 opacity-75"><strong>Duration: </strong>3h</p>
                                </div>
                                <small className="opacity-70 text-nowrap access-icon-pending">pending</small>
                            </div>
                        </a>
                        <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <i className="bi-wrench access-icon access-icon-decline"></i>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75"><strong>Date/Time: </strong>22/06/2022 01:00</p>
                                    <p className="mb-0 opacity-75"><strong>Type: </strong>Maintenance</p>
                                    <p className="mb-0 opacity-75"><strong>Duration: </strong>1h</p>
                                </div>
                                <small className="opacity-70 text-nowrap access-icon-decline">declined</small>
                            </div>
                        </a>
                    </div>
                    <h6 className="h6 text-start">Risk Assessments:</h6>
                    <div className="list-group mb-3 text-start">
                        <label htmlFor="hospital" className="form-label">Nearest Hospital</label>
                        <select className="form-select" id="hospital" required>
                            <option value="">Choose...</option>
                            <option>Manchester Royal Infirmary</option>
                            <option>North Manchester General Hospital</option>
                            <option>Manchester Royal Infirmary</option>
                            <option>Wythenshawe Hospital</option>
                            <option>Withington Community Hospital</option>
                        </select>
                     </div>
                    <div className="text-start mb-3" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success">Add risk item</button>
                    </div>
                    <div className="list-group mb-3 text-start">
                        <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <i className="bi-exclamation-triangle access-icon access-icon-proceed"></i>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75"><strong>Hazard: </strong>Electric shock from OHL</p>
                                    <p className="mb-0 opacity-75"><strong>Risk score: </strong>8</p>
                                    <p className="mb-0 opacity-75"><strong>Mitigated risk score: </strong>4</p>
                                </div>
                                <small className="opacity-70 text-nowrap access-icon-proceed">acceptable</small>
                            </div>
                        </a>
                        <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <i className="bi-exclamation-triangle access-icon access-icon-pending"></i>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75"><strong>Hazard: </strong>Struck by a tram</p>
                                    <p className="mb-0 opacity-75"><strong>Risk score: </strong>8</p>
                                    <p className="mb-0 opacity-75"><strong>Mitigated risk score: </strong>4</p>
                                </div>
                                <small className="opacity-70 text-nowrap access-icon-pending">pending</small>
                            </div>
                        </a>
                        <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <i className="bi-exclamation-triangle access-icon access-icon-decline"></i>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75"><strong>Hazard: </strong>Slips, Trips and falls</p>
                                    <p className="mb-0 opacity-75"><strong>Risk score: </strong>12</p>
                                    <p className="mb-0 opacity-75"><strong>Mitigated risk score: </strong>8</p>
                                </div>
                                <small className="opacity-70 text-nowrap access-icon-decline">not acceptable</small>
                            </div>
                        </a>
                    </div>

                    <h6 className="h6 text-start">Method Statements:</h6>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="competentPerson" placeholder="Competent person" required {...register("competentPerson", { required: true, minLength: 3 })} />
                        <label htmlFor="competentPerson" className="form-label">Competent person</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="siteContactNumber" placeholder="Site contact number" required {...register("siteContactNumber", { required: true, minLength: 3 })} />
                        <label htmlFor="siteContactNumber" className="form-label">Site contact number</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" id="methodScope"  rows="5" style={{height:"auto"}} placeholder="Scope of work" required {...register("methodScope", { required: true, minLength: 5 })} />
                        <label htmlFor="methodScope" className="form-label">Scope of work</label>
                    </div>
                    <div className="list-group mb-3 text-start">
                        <label htmlFor="ppe" className="form-label">Personal protective equipment</label>
                        <select className="form-select" id="ppe" required>
                            <option value="">Choose...</option>
                            <option>Five Point PPE (Minumum)</option>
                        </select>
                     </div>
                     <div className="list-group mb-3 text-start">
                        <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <i className="bi-exclamation-triangle access-icon access-icon-proceed"></i>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75"><strong>Task 1: </strong>Task brief</p>
                                    <p className="mb-0 opacity-75"><strong>Equipment: </strong>none</p>
                                    <p className="mb-0 opacity-75"><strong>Track Vehicles: </strong>None</p>
                                </div>
                                <small className="opacity-70 text-nowrap access-icon-proceed">approved</small>
                            </div>
                        </a>
                        <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <i className="bi-exclamation-triangle access-icon access-icon-pending"></i>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75"><strong>Task 2: </strong>Confirm line is clear</p>
                                    <p className="mb-0 opacity-75"><strong>Equipment: </strong>None</p>
                                    <p className="mb-0 opacity-75"><strong>Track Vehicles: </strong>None</p>
                                </div>
                                <small className="opacity-70 text-nowrap access-icon-pending">pending</small>
                            </div>
                        </a>
                        <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <i className="bi-exclamation-triangle access-icon access-icon-decline"></i>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <p className="mb-0 opacity-75"><strong>Task 3: </strong>Test OHL is dead</p>
                                    <p className="mb-0 opacity-75"><strong>Equipment: </strong>2 Items</p>
                                    <p className="mb-0 opacity-75"><strong>Track Vehicles: </strong>None</p>
                                </div>
                                <small className="opacity-70 text-nowrap access-icon-decline">not acceptable</small>
                            </div>
                        </a>
                    </div>
                </div>

                
                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={false}>Submit for approval</button>
            </form>
        </div>
    )
}

export default Access;