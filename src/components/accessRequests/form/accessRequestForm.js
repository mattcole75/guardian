import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userGetAccessRequest, userUpdateAccessRequest, userDeleteUploadedDocument, plannerUpdateAccessRequest } from '../../../store/actions/index';
import { Navigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { determineStartDate, determineEndDate } from '../../../shared/utility';
import Requester from './requester/requester';
import Comment from '../comment/comment';
import EventLog from './eventLog/eventLog';

import SiteDetails from './siteDetails/siteDetails';
import Locations from './location/locations';
import LocationForm from './location/form/locationForm'
import WorkStages from './workStages/workStages';
import WorkStageForm from './workStages/form/workStageForm';
import PermitRequirements from './permitRequirements/permitRequirements';
import ElectricalIsolationRequirements from './electricalIsolationRequirements/electricalIsolationRequirements';
import AdditionalInformation from './additionalInformation/additionalInformation';
import PlanningInformation from './planningInformation/planningInformation';
import Documentation from './documentation/documentation';
import DocumentUpload from './documentation/documentUpload/documentUpload';

import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const AccessRequestForm = () => {

    const { uid } = useParams();
    const dispatch = useDispatch();

    const { loading, error, identifier, accessRequest, planners } = useSelector(state => state.accessRequest);
    const { idToken, localId, displayName, roles } = useSelector(state => state.auth);
    
    const [ editLocation, setEditLocation ] = useState(false);
    const [ editWorkStage, setEditWorkStage ] = useState(false);
    const [ uploadingDocument, setUploadingDocument ] = useState(false);

    const [ redirect, setRedirect ] = useState(null);
    const [ recordLocked, setRecordLocked ] = useState(false);
    const [ comment, setComment ] = useState('');
    const [ commentButtonEnabled, setCommentButtonEnabled ] = useState(false);
    const [ submitButtonDisabled, setSubmitButtonDisabled ] = useState(true);
    const [ saveButtonDisabled, setSaveButtonDisabled ] = useState(true);

    const [ siteDetails, setSiteDetails ] = useState(null);
    const [ locations, setLocations ] = useState([]);
    const [ selectedLocationIndex, setSelectedLocationIndex ] = useState(null);
    const [ selectedLocation, setSelectedLocation ] = useState(null);
    const [ workStages, setWorkStages ] = useState([]);
    const [ permitRequirements, setPermitRequirements] = useState(null);
    const [ electricalIsolationRequirements, setElectricalIsolationRequirements ] = useState(null);
    const [ additionalInformation, setAdditionalInformation ] = useState(null);
    const [ planningInformation, setPlanningInformation ] = useState(null);
    const [ siteDetailsValid, setSiteDetailsValid ] = useState(true);
    
    const onGetAccessRequest = useCallback((idToken, localId, uid, identifier) => dispatch(userGetAccessRequest(idToken, localId, uid, identifier)), [dispatch]);
    const onUpdateAccessRequest = useCallback((uid, idToken, localId, data, identifier) => dispatch(userUpdateAccessRequest(uid, idToken, localId, data, identifier)), [dispatch]);
    const onPlannerUpdateAccessRequest = useCallback((uid, idToken, localId, data, identifier) => dispatch(plannerUpdateAccessRequest(uid, idToken, localId, data, identifier)), [dispatch]);
    const onDeleteAccessRequestDocument = useCallback((id, fileName, identifier) => dispatch(userDeleteUploadedDocument(id, fileName, identifier)), [dispatch]);

    // load access request
    useEffect (() => {
        onGetAccessRequest(idToken, localId, uid, 'GET_ACCESS_REQUEST');
    }, [uid, idToken, localId, onGetAccessRequest]);

    // load state once record retrieved
    useEffect(() => {
        if(identifier === 'GET_ACCESS_REQUEST') {
            setSiteDetails(accessRequest.siteDetails)
            setLocations(accessRequest.locations);
            setWorkStages(accessRequest.workStages);
            setPermitRequirements(accessRequest.permitRequirements);
            setElectricalIsolationRequirements(accessRequest.electricalIsolationRequirements);
            setAdditionalInformation(accessRequest.additionalInformation);
            setPlanningInformation(accessRequest.planningInformation);
        }
    }, [identifier, accessRequest, uid]);

    // if a user tries to view another users access request then redirect
    useEffect(() => {
        if(!roles.includes('planner'))
            if(accessRequest != null && accessRequest.requester.localId !== localId)
                setRedirect(<Navigate to='/forbidden' />);
    }, [accessRequest, localId, uid, roles]);

    // determine if the record is editable based on status
    useEffect(() => {
        if(accessRequest) {
            if(accessRequest.status === 'Submitted' || accessRequest.status === 'Under Review' || accessRequest.status === 'Granted' || accessRequest.status === 'Completed' || accessRequest.requester.localId !== localId)
                setRecordLocked(true);
            else
                setRecordLocked(false);
        }
    }, [accessRequest, localId, uid]);

    // enable or disable the comment button
    useEffect(() => {
        if(comment.length > 0)
            setCommentButtonEnabled(true);
        else
            setCommentButtonEnabled(false);
    },[comment]);

    // enable or disable the save button
    useEffect(() => {
        if(!siteDetailsValid)
            setSaveButtonDisabled(true);
        else
            setSaveButtonDisabled(false);
    }, [siteDetailsValid, siteDetails, locations, workStages, permitRequirements, electricalIsolationRequirements, additionalInformation]);

    // enable or disable the submit button
    useEffect(() => {
        if(accessRequest && accessRequest.locations && accessRequest.locations.length > 0 && accessRequest.workStages.length > 0)
            setSubmitButtonDisabled(false);
        else
            setSubmitButtonDisabled(true);
    }, [uid, accessRequest, saveButtonDisabled]);

    // save the access request, this may be a new record or an update to an existing record
    const onSave = useCallback((status) => {
        onUpdateAccessRequest(uid, idToken, localId, {
            siteDetails: {
                ...siteDetails,
                accessFirstDay: moment(determineStartDate(locations)).format('YYYY-MM-DD'),
                accessLastDay: moment(determineEndDate(locations)).format('YYYY-MM-DD')
            },
            locations: [
                 ...locations
            ],
            workStages: [
                ...workStages
            ],
            permitRequirements: {
                ...permitRequirements
            },
            electricalIsolationRequirements: {
                ...electricalIsolationRequirements
            },
            additionalInformation: {
                ...additionalInformation,
            },
            status: status
            }, 'UPDATE_ACCESS_REQUEST');
    }, [onUpdateAccessRequest, uid, idToken, localId, siteDetails, locations, workStages, permitRequirements, electricalIsolationRequirements, additionalInformation]);

    const onPlanningSave = useCallback((status) => {
    
        let updatedEventLogItems = [ ...accessRequest.eventLog ];
        const currentLocations = [ ...accessRequest.locations ];

        let updatedPermit = [];

        switch(status) {
            case 'Denied':
                updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'The Access Request has been denied' });
                break;
            case 'Granted':
                updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'The Access Request has been granted' });
                
                // eslint-disable-next-line array-callback-return
                currentLocations.map((item) => {
                    let dateFrom = new Date(item.startDate);
                    const dateTo = new Date(item.endDate);

                    while(dateFrom <= dateTo) {
                        updatedPermit.push({
                            date: dateFrom.toISOString().slice(0, 10),
                            startTime: item.startTime,
                            endTime: item.endTime,
                            organisation: accessRequest.planningInformation.organisation,
                            worksiteLimits: accessRequest.planningInformation.worksiteLimits,
                            natureOfWork: accessRequest.siteDetails.siteDescription,
                            locations: item.locationList,
                            shifts: item.shifts,
                            preparedBy: accessRequest.planningInformation.planner,
                            approvedDate: moment().format()
                        });

                        dateFrom.setDate(dateFrom.getDate() + 1)
                    }
                });

                break;
            case 'Completed':
                updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'The Access Request has been completed' });
                break;
            case 'Deleted':
                updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'The Access Request has been deleted' });
                break;
            default:
                break;
        }

        onPlannerUpdateAccessRequest(uid, idToken, localId, {
            planningInformation: {
                ...planningInformation
            },
            status: status,
            eventLog: updatedEventLogItems,
            permit: updatedPermit
            }, 'PLANNER_UPDATE_ACCESS_REQUEST');

    }, [accessRequest, onPlannerUpdateAccessRequest, uid, idToken, localId, planningInformation, displayName]);

    const onSaveComments = useCallback((data) => {
        onUpdateAccessRequest(uid, idToken, localId, {
            ...data
        }, 'UPDATE_ACCESS_REQUEST');
    }, [idToken, uid, localId, onUpdateAccessRequest]);

    const createComplianceLog = useCallback((locations) => {
        if(moment(determineStartDate(locations)).diff(moment(accessRequest.created), 'week') < 6) {
            return { user: 'System', logged: moment().format(), event: 'Not compliant to 6 week notice requirement' };
        } else {
            return { user: 'System', logged: moment().format(), event: 'Compliant to 6 week notice requirement' };
        }
    }, [accessRequest]);

    const submitRequestHandler = useCallback((status) => {

        let updatedEventLogItems = [ ...accessRequest.eventLog ];
        updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'Access Request ' + status });
        updatedEventLogItems.push(createComplianceLog(locations));

        onUpdateAccessRequest(uid, idToken, localId, {
            siteDetails: {
                ...siteDetails,
                accessFirstDay: moment(determineStartDate(locations)).format('YYYY-MM-DD'),
                accessLastDay: moment(determineEndDate(locations)).format('YYYY-MM-DD')
            },
            locations: [
                    ...locations
            ],
            workStages: [
                ...workStages
            ],
            permitRequirements: {
                ...permitRequirements
            },
            electricalIsolationRequirements: {
                ...electricalIsolationRequirements
            },
            additionalInformation: {
                ...additionalInformation
            },
            status: status,
            updated: moment().format(),
            eventLog: updatedEventLogItems
        }, 'UPDATE_ACCESS_REQUEST_STATUS');
        
        setRedirect(<Navigate to='/accessrequests' />);
    }, [accessRequest, uid, displayName, createComplianceLog, locations, onUpdateAccessRequest, idToken, localId, siteDetails, workStages, permitRequirements, electricalIsolationRequirements, additionalInformation]);

    const onSaveComment = useCallback(() => {

        let updatedComments = [];

        if (accessRequest.comments != null)
            updatedComments = [ ...accessRequest.comments ];

            updatedComments.push({
                commentator: displayName,
                logged: moment().format(),
                comment: comment
            });

            onSaveComments({ comments: updatedComments }, 'SAVE_ACCESS_REQUEST');
        setComment('');
    }, [comment, displayName, accessRequest, onSaveComments]);

    const toggleLocationEdit = () => {
        setEditLocation(prevState => !prevState);
    }

    const toggleWorkStageEdit = () => {
        setEditWorkStage(prevState => !prevState);
    }

    const toggleUploadingDocument = () => {
        setUploadingDocument(prevState => !prevState);
    }

    const locationSelectHandler = useCallback((index, item) => {
        setSelectedLocationIndex(index);
        setSelectedLocation(item);
        toggleLocationEdit();
    }, []);

    const locationAddHandler = () => {
        setSelectedLocation(null);
        setSelectedLocationIndex(null);
        toggleLocationEdit();
    }

    const locationCloseHandler = () => {
        toggleLocationEdit();
    }

    const onSetSiteDetails = (data) => {
        setSiteDetails(data);
    }
    
    const onSetSiteDetailsValidation = (isValid) => {
        setSiteDetailsValid(isValid);
    }

    const onSetLocation = (action, index, location) => {

        const updatedLocations = [ ...locations ];

        switch (action) {
            case 'ADD':
                updatedLocations.push(location);
                setLocations(updatedLocations);
                toggleLocationEdit();
                break;
            case 'UPDATE':
                updatedLocations[index] = location;
                setLocations(updatedLocations);
                toggleLocationEdit();
                break;
            case 'DELETE':
                updatedLocations.splice(index, 1);
                setLocations(updatedLocations);
                toggleLocationEdit();
                break;
            default:
                return;
        }
        
    }

    const onSetWorkStage = (action, index, workStage) => {
        const updatedWorkStages = [ ...workStages ];

        switch (action) {
            case 'ADD':
                updatedWorkStages.push(workStage);
                setWorkStages(updatedWorkStages);
                toggleWorkStageEdit();
                break;
            case 'DELETE':
                updatedWorkStages.splice(index, 1);
                setWorkStages(updatedWorkStages);
                break;
            case 'UP':
                //arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                updatedWorkStages.splice((index - 1), 0, updatedWorkStages.splice(index, 1)[0]);
                setWorkStages(updatedWorkStages);
                break;
            case 'DOWN':
                updatedWorkStages.splice((index + 1), 0, updatedWorkStages.splice(index, 1)[0]);
                setWorkStages(updatedWorkStages);
                break;
            default:
                return;
        }
    }

    const onSetPermitRequirement = (data) => {
        setPermitRequirements(data);
    }

    const onSetElectricalIsolationRequirements = (data) => {
        setElectricalIsolationRequirements(data);
    }

    const onSetAdditionalInformation = (data) => {
        setAdditionalInformation(data);
    }

    const onSetPlanningInformation = (data) => {
        setPlanningInformation(data);
    }

    const onClose = () => {
        setRedirect(<Navigate to='/accessrequests' />);
    }

    const deleteAccessRequestDocumentHandler = (fileName) => {
        onDeleteAccessRequestDocument(uid, fileName, 'DELETE_ACCESS_REQUEST_DOCUMENT');
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;
    
    let modal = null;
    if(editLocation) {
        modal = <Modal 
            show={ editLocation } 
            modalClosed={ toggleLocationEdit } 
            content={
                <LocationForm 
                    close={ locationCloseHandler }
                    save={ onSetLocation }
                    index={ selectedLocationIndex }
                    location={ selectedLocation }
                    recordLocked={ recordLocked }
                />
            }/>
    }
    if(editWorkStage) {
        modal = <Modal 
            show={ editWorkStage } 
            modalClosed={ toggleWorkStageEdit } 
            content={
                <WorkStageForm 
                    toggle={ toggleWorkStageEdit }
                    save={ onSetWorkStage }
                    recordLocked={ recordLocked }
                />
            }/>
    }
    if(uploadingDocument) {
        modal = <Modal 
            show={ uploadingDocument } 
            modalClosed={ toggleUploadingDocument } 
            content={
                <DocumentUpload 
                    uid={ uid }
                    toggle={ toggleUploadingDocument }
                />
            }/>
    }

    return (
        <div className='form-request my-5 shadow'>
            { redirect }
            <Backdrop show={ loading } />
            
            { spinner }
            
            {error &&
                <div className='alert alert-danger' role='alert'>
                    { error }
                </div>
            }
            
            {modal}

            <div className=''>
                <div className='text-sm-center'>
                    <i className='bi-calendar2-plus form-auth-icon'></i>
                    <h1 className='h3 mb-3 fw-normal'>Access Request Details</h1>
                </div>
                <div className='text-start mt-2 mb-3'>
                    <button className='btn btn-outline-secondary btn-sm' type='button' onClick={ onClose }>Return to list</button>
                </div> 
                
                <div className='form-floating mb-3'>

                    <div className='accordion' id='accordionPanels'>

                        {/* This section details the person who made the request and is collapsed by default */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingRequester'>
                                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseRequester' aria-expanded='false' aria-controls='panelsStayOpen-collapseRequester'>
                                            <h3 className='h5 m-0 text-muted'>1. Requester Details</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseRequester' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingRequester'>
                                        <div className='accordion-body'>
                                            <Requester displayName={ accessRequest.requester.displayName } phoneNumber={ accessRequest.requester.phoneNumber } email={ accessRequest.requester.email } organisation={ accessRequest.requester.organisation } />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* details about the requests event log */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingEventLog'>
                                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseEventLog' aria-expanded='false' aria-controls='panelsStayOpen-collapseEventLog'>
                                            <h3 className='h5 m-0 text-muted'>2. Event Log</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseEventLog' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingEventLog'>
                                        <div className='accordion-body'>
                                            <EventLog eventLog={ accessRequest.eventLog } />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Details for the access Request */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingSummary'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseSummary' aria-expanded='true' aria-controls='panelsStayOpen-collapseSummary'>
                                            <h3 className='h5 m-0 text-muted'>3. Access Request</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseSummary' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingSummary'>
                                        <div className='accordion-body'>
                                            {/* <AccessRequestSummary summary={ accessRequest ? accessRequest.summary : null } locationItems={ accessRequest ? accessRequest.locationItems : null } save={saveAccessRequestHandler} recordLocked={recordLocked} /> */}
                                            {/* Site details */}
                                            <SiteDetails siteDetails={ siteDetails } update={ onSetSiteDetails } recordLocked={ recordLocked } siteDetailsIsValid={ onSetSiteDetailsValidation } status={ accessRequest.status } />
                                            {/* locations */}
                                            <Locations locations={ locations } add={ locationAddHandler } toggle={ locationCloseHandler } select={ locationSelectHandler } recordLocked={ recordLocked } />
                                            {/* work plan */}
                                            <WorkStages workStages={ workStages } toggle={ toggleWorkStageEdit } save={ onSetWorkStage } recordLocked={ recordLocked } />
                                            {/* Permit Requirements */}
                                            <PermitRequirements permitRequirements={ permitRequirements} update={ onSetPermitRequirement } recordLocked={ recordLocked } />
                                            {/* Electrical Isolation Requirements */}
                                            <ElectricalIsolationRequirements electricalIsolationRequirements={ electricalIsolationRequirements } update={ onSetElectricalIsolationRequirements } recordLocked={ recordLocked } />
                                            {/* Additional Information */}
                                            <AdditionalInformation additionalInformation={ additionalInformation } update={ onSetAdditionalInformation } recordLocked={ recordLocked } />

                                            <div className='form-floating mt-2 mb-2'>

                                                { !recordLocked && !accessRequest
                                                    ?   <button className='w-100 btn btn-lg btn-primary mb-2' type='button' onClick={ () => onSave('Draft') } disabled={ saveButtonDisabled }>Save as draft</button>
                                                    :   null
                                                }
                                                { !recordLocked && accessRequest
                                                    ?   <button className='w-100 btn btn-lg btn-primary mb-2' type='button' onClick={ () => onSave(accessRequest.status) } disabled={ saveButtonDisabled }>Save Changes</button>
                                                    :   null
                                                }
                                                { (!recordLocked && accessRequest && (accessRequest.requester.localId === localId))
                                                    ?   <button className='w-100 btn btn-lg btn-success mb-2' type='button' disabled={ submitButtonDisabled } onClick={ () => { submitRequestHandler('Submitted') } }>Submit For Approval</button>
                                                    :   null
                                                }
                                            </div>

                                            <div className='text-start mt-2'>
                                                <button className='btn btn-outline-secondary btn-sm' type='button' onClick={ onClose }>Return to list</button>
                                            </div> 
                                        </div> 
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Planner Section */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingPlanning'>
                                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapsePlanning' aria-expanded='false' aria-controls='panelsStayOpen-collapsePlanning'>
                                            <h3 className='h5 m-0 text-muted'>4. For official use only</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapsePlanning' className='accordion-collapse collapse collapse' aria-labelledby='panelsStayOpen-headingPlanning'>
                                        <div className='accordion-body'>
                                            <PlanningInformation 
                                                planningInformation={ planningInformation }
                                                update={ onSetPlanningInformation }
                                                save={ onPlanningSave }
                                                isPlanner={ roles.includes('planner') }
                                                planners={ planners }
                                                status={ accessRequest.status }
                                                identifier={ identifier }
                                            />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* document section */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingDocuments'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseDocuments' aria-expanded='true' aria-controls='panelsStayOpen-collapseDocuments'>
                                            <h3 className='h5 m-0 text-muted'>5. Documents</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseDocuments' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingDocuments'>
                                        <div className='accordion-body'>
                                            <Documentation
                                                uid={ uid }
                                                documents={ accessRequest && accessRequest.documents }
                                                deleteDocument={ deleteAccessRequestDocumentHandler }
                                                toggle={ toggleUploadingDocument }
                                                recordLocked={ recordLocked }
                                            />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Comment section */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                            <h2 className='accordion-header' id='panelsStayOpen-headingComments'>
                                <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseComments' aria-expanded='true' aria-controls='panelsStayOpen-collapseComments'>
                                    <h3 className='h5 m-0 text-muted'>6. Comments</h3>
                                </button>
                            </h2>
                            <div id='panelsStayOpen-collapseComments' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingComments'>
                                <div className='accordion-body'>
                                    <div className='border rounded p-1 mb-1 bg-light'>
                                        <div className='text-sm-start p-2'>
                                            <div className='mb-2'>
                                                <input type='text' className='form-control' id='comment' value={comment} autoComplete='off' onChange={(event => {setComment(event.target.value)})} placeholder='Type your message here' />
                                            </div>
                                            <div className='text-sm-end'>
                                                <button className='w-25 btn btn-sm btn-primary mb-3' type='button' disabled={!commentButtonEnabled} onClick={onSaveComment}>Send</button>
                                            </div>
                                        </div>
                                        { accessRequest && accessRequest.comments
                                            ?   <div className='list-group'>
                                                    { accessRequest.comments.map((item, index) => (<Comment key={ index } uid={ index } comment={ item } />)) }
                                                </div>
                                            :   <div className='alert alert-warning text-sm-center' role='alert'>There are no comments on this Access Request</div>
                                        }
                                    </div>
                                </div>
                            </div>
                                </div>
                            :   null
                        }
                            
                    </div>                        
                </div>
            </div>
        </div>
    )
}

export default AccessRequestForm;