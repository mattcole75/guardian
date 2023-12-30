import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../../store/actions/index';
import { Navigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { determinStartDate, determinEndDate } from '../../../shared/utility';
// import Administration from './administration/administration';
import Requester from './requester/requester';
// import AccessRequestSummary from './requestSummary/accessRequestSummary';
// import Locations from './location/locations';
// import LocationForm from './location/form/locationForm';
// import Hazards from './hazards/hazards';
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

import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const AccessRequestForm = () => {

    const { uid } = useParams();
    const dispatch = useDispatch();

    const { loading, error, identifier } = useSelector(state => state.accessRequest);
    const { idToken, localId, displayName, roles } = useSelector(state => state.auth);
    const accessRequest = useSelector(state => state.accessRequest.accessRequest);
    
    const [ editLocation, setEditLocation ] = useState(false);
    const [ editWorkStage, setEditWorkStage ] = useState(false);

    const [ redirect, setRedirect ] = useState(null);
    const [ recordLocked, setRecordLocked ] = useState(false);
    const [ comment, setComment ] = useState('');
    const [ commentButtonEnabled, setCommentButtonEnabled ] = useState(false);
    const [ grantButtonDisabled, setGrantButtonDisabled ] = useState(true);
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

    const [ siteDetailsValid, setSiteDetailsValid ] = useState(true);

    const isPlanner = roles.includes('planner');
    
    // set the record uid as uid
    // let key = null;
    // if(accessRequest && uid !== 'new') {
        // key = uid;
    // } else if (accessRequest && uid === 'new') {
        // uid = Object.uids(accessRequest)[0];
    // }
    
    const onGetAccessRequest = useCallback((idToken, localId, uid, identifier) => dispatch(action.userGetAccessRequest(idToken, localId, uid, identifier)), [dispatch]);
    const onUpdateAccessRequest = useCallback((id, idToken, localId, data, identifier) => dispatch(action.userUpdateAccessRequest(id, idToken, localId, data, identifier)), [dispatch]);
    const onGetPlanners = useCallback((idToken, localId, identifier) => dispatch(action.plannerGetPlanners(idToken, localId, identifier)), [dispatch]);
    
    // load access request if it's not new
    useEffect (() => {
        // get access request from db
        if(roles.includes('planner') || roles.includes('coordinator'))
            onGetPlanners(idToken, localId, 'GET_PLANNERS');
            
        onGetAccessRequest(idToken, localId, uid, 'GET_ACCESS_REQUEST');
    }, [uid, idToken, localId, onGetAccessRequest, roles, onGetPlanners]);

    useEffect(() => {
        if(identifier === 'GET_ACCESS_REQUEST') {
            setSiteDetails(accessRequest[uid].siteDetails)
            setLocations(accessRequest[uid].locations);
            setWorkStages(accessRequest[uid].workStages);
            setPermitRequirements(accessRequest[uid].permitRequirements);
            setElectricalIsolationRequirements(accessRequest[uid].electricalIsolationRequirements);
            setAdditionalInformation(accessRequest[uid].additionalInformation);
        }
    }, [identifier, accessRequest, uid]);

    // if a user tries to view another users access request then redirect
    useEffect(() => {
        if(!roles.includes('planner'))
            if(accessRequest != null && accessRequest[uid].requester.displayName !== displayName)
                setRedirect(<Navigate to='/forbidden' />);
    }, [accessRequest, displayName, uid, roles]);

    // determin if the record is editable based on status
    useEffect(() => {
        if(accessRequest) {
            if(accessRequest[uid].status === 'Submitted' || accessRequest[uid].status === 'Under Review' || accessRequest[uid].status === 'Granted')
                setRecordLocked(true);
            else
                setRecordLocked(false);
        }
    }, [accessRequest, uid]);

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

    // enable or disable the submit button.
    useEffect(() => {
        if(accessRequest && accessRequest[uid].locations && accessRequest[uid].locations.length > 0 && accessRequest[uid].workStages.length > 0)
            setSubmitButtonDisabled(false);
        else
            setSubmitButtonDisabled(true);
    }, [uid, accessRequest, saveButtonDisabled]);

    // enable or disable the grant access button
    useEffect(() => {

        let allLocationItemsConfirmed = true;
        let allDisruptedItemsApproved = true;

        if(accessRequest && accessRequest[uid].locationItems && accessRequest[uid].locationItems.length > 0) {
            accessRequest[uid].locationItems.forEach(ele => {
                if(ele.locationStatus !== 'Confirmed')
                    allLocationItemsConfirmed = false;
            });
        }

        if(allLocationItemsConfirmed === true && allDisruptedItemsApproved === true)
            setGrantButtonDisabled(false);
        else
            setGrantButtonDisabled(true);
    }, [accessRequest, uid]);

    // save the access request, this may be a new record or an update to an existing record
    const onSave = useCallback(() => {
        onUpdateAccessRequest(uid, idToken, localId, {
            siteDetails: {
                ...siteDetails,
                accessFirstDay: moment(determinStartDate(locations)).format('YYYY-MM-DD'),
                accessLastDay: moment(determinEndDate(locations)).format('YYYY-MM-DD')
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
            status: 'Draft',
            updated: moment().format(),
            }, 'UPDATE_ACCESS_REQUEST');
    }, [onUpdateAccessRequest, uid, idToken, localId, siteDetails, locations, workStages, permitRequirements, electricalIsolationRequirements, additionalInformation]);

    const saveAccessRequestHandler = useCallback((data) => {
        onUpdateAccessRequest(uid, idToken, localId, {
            ...accessRequest[uid],
            ...data
        }, 'UPDATE_ACCESS_REQUEST');
    }, [idToken, uid, localId, onUpdateAccessRequest, accessRequest]);

    const createComplianceLog = useCallback((locations) => {
        if(moment(determinStartDate(locations)).diff(moment(accessRequest[uid].created), 'week') < 6) {
            return { user: 'System', logged: moment().format(), event: 'Not compliant to 6 week notice requirement' };
        } else {
            return { user: 'System', logged: moment().format(), event: 'Compliant to 6 week notice requirement' };
        }
    }, [accessRequest, uid]);

    const submitRequestHandler = useCallback((status) => {

        let updatedEventLogItems = [ ...accessRequest[uid].eventLog ];
        updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'Access Request ' + status });
        updatedEventLogItems.push(createComplianceLog(locations));

        onUpdateAccessRequest(uid, idToken, localId, {
            siteDetails: {
                ...siteDetails,
                accessFirstDay: moment(determinStartDate(locations)).format('YYYY-MM-DD'),
                accessLastDay: moment(determinEndDate(locations)).format('YYYY-MM-DD')
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

        if (accessRequest[uid].comments != null)
            updatedComments = [ ...accessRequest[uid].comments ];

            updatedComments.push({
                commentator: displayName,
                logged: moment().format(),
                comment: comment
            });

            saveAccessRequestHandler({ comments: updatedComments }, 'SAVE_ACCESS_REQUEST');
        setComment('');
    }, [comment, displayName, uid, accessRequest, saveAccessRequestHandler]);

    // const locationSelectHandler = useCallback((index) => {
    //     onLocationItemSelect(index, 'LOCATION_ITEM_SELECT');
    // }, [onLocationItemSelect]);

    const toggleLocationEdit = () => {
        setEditLocation(prevState => !prevState);
    }

    const toogleWorkStageEdit = () => {
        setEditWorkStage(prevState => !prevState);
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
                toogleWorkStageEdit();
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

    const onCancel = () => {
        setRedirect(<Navigate to='/accessrequests' />);
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
            modalClosed={ toogleWorkStageEdit } 
            content={
                <WorkStageForm 
                    toggle={ toogleWorkStageEdit }
                    save={ onSetWorkStage }
                    recordLocked={ recordLocked }
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
                
                <div className='form-floating mb-3'>

                    <div className='accordion' id='accordionPanels'>
                        {/* This section is for planners and coordinators to discuss the access request */}
                        { accessRequest && isPlanner && (accessRequest[uid].requester.name !== displayName)
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingAdministration'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseAdministration' aria-expanded='true' aria-controls='panelsStayOpen-collapseAdministration'>
                                            Administration (only coordinators and planners can see this tab)
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseAdministration' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingAdministration'>
                                        <div className='accordion-body'>
                                            {/* <Administration  accessRequest={accessRequest ? accessRequest[uid] : null} save={saveAccessRequestHandler} /> */}
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* This section details the person who made the request and is collapsed by default */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingRequestor'>
                                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseRequestor' aria-expanded='false' aria-controls='panelsStayOpen-collapseRequestor'>
                                            <h3 className='h5 m-0 text-muted'>Requestor Details</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseRequestor' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingRequestor'>
                                        <div className='accordion-body'>
                                            <Requester displayName={ accessRequest[uid].requester.displayName } phoneNumber={ accessRequest[uid].requester.phoneNumber } email={ accessRequest[uid].requester.email } organisation={ accessRequest[uid].requester.organisation } />
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
                                            <h3 className='h5 m-0 text-muted'>Event Log</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseEventLog' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingEventLog'>
                                        <div className='accordion-body'>
                                            <EventLog eventLog={ accessRequest[uid].eventLog } />
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
                                            <h3 className='h5 m-0 text-muted'>Access Request</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseSummary' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingSummary'>
                                        <div className='accordion-body'>
                                            {/* <AccessRequestSummary summary={ accessRequest ? accessRequest[uid].summary : null } locationItems={ accessRequest ? accessRequest[uid].locationItems : null } save={saveAccessRequestHandler} recordLocked={recordLocked} /> */}
                                            {/* Site details */}
                                            <SiteDetails siteDetails={ siteDetails } update={ onSetSiteDetails } recordLocked={ recordLocked } siteDetailsIsValid={ onSetSiteDetailsValidation } />
                                            {/* locations */}
                                            <Locations locations={ locations } add={ locationAddHandler } toggle={ locationCloseHandler } select={ locationSelectHandler } recordLocked={ recordLocked } />
                                            {/* work plan */}
                                            <WorkStages workStages={ workStages } toggle={ toogleWorkStageEdit } save={ onSetWorkStage } recordLocked={ recordLocked } />
                                            {/* Permit Requirements */}
                                            <PermitRequirements permitRequirements={ permitRequirements} update={ onSetPermitRequirement } recordLocked={ recordLocked } />
                                            {/* Electrical Isolation Requirements */}
                                            <ElectricalIsolationRequirements electricalIsolationRequirements={ electricalIsolationRequirements } update={ onSetElectricalIsolationRequirements } recordLocked={ recordLocked } />
                                            {/* Aditional Information */}
                                            <AdditionalInformation additionalInformation={ additionalInformation } update={ onSetAdditionalInformation } recordLocked={ recordLocked } />

                                            <div className='form-floating mt-2 mb-2'>

                                                { !recordLocked
                                                    ?   <button className='w-100 btn btn-lg btn-primary mb-2' type='button' onClick={ onSave } disabled={ saveButtonDisabled }>Save as draft</button>
                                                    :   null
                                                }
                                                { (!recordLocked && accessRequest && (accessRequest[uid].requester.displayName === displayName))
                                                    ?   <button className='w-100 btn btn-lg btn-success mb-2' type='button' disabled={ submitButtonDisabled } onClick={ () => { submitRequestHandler('Submitted') } }>Submit For Approval</button>
                                                    :   null
                                                }
                                                { !recordLocked
                                                    ?   <button className='w-100 btn btn-lg btn-danger' type='button' onClick={ onCancel }>Cancel</button>
                                                    :   null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Planner Section */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingHazards'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseHazards' aria-expanded='true' aria-controls='panelsStayOpen-collapseHazards'>
                                            <h3 className='h5 m-0 text-muted'>For official use only</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseHazards' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingHazards'>
                                        <div className='accordion-body'>
                                            {/* <Hazards
                                                accessRequest={accessRequest ? accessRequest[uid] : null}
                                                save={saveAccessRequestHandler}
                                                recordLocked={recordLocked}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Comment section */}
                        { accessRequest
                            ?    <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingComments'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseComments' aria-expanded='true' aria-controls='panelsStayOpen-collapseComments'>
                                            <h3 className='h5 m-0 text-muted'>Comments</h3>
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
                                                { accessRequest && accessRequest[uid].comments
                                                    ?   <div className='list-group'>
                                                            { accessRequest[uid].comments.map((item, index) => (<Comment key={ index } uid={ index } comment={ item } />)) }
                                                        </div>
                                                    :   <div className='alert alert-warning text-sm-center' role='alert'>There are no comments on this Access Request</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            : null
                        }
                    </div>                        
                </div>
                { (!recordLocked && accessRequest && (accessRequest[uid].requester.name === displayName))
                    ?   <button className='w-100 btn btn-lg btn-primary mb-3' type='button' disabled={submitButtonDisabled} onClick={ () => { submitRequestHandler('Submitted') } }>Submit For Approval</button>
                    :   null
                }
                { (accessRequest && isPlanner === true) && (accessRequest[uid].requester.name !== displayName)
                    ?   <div>
                            {accessRequest && accessRequest[uid].status === 'Submitted' && accessRequest[uid].status !== 'Approved'
                                ?   <button className='w-100 btn btn-lg btn-success mb-3' type='button' disabled={ grantButtonDisabled } onClick={() => { submitRequestHandler('Granted')}}>Grant Access</button>
                                :   null
                            }
                            {accessRequest && (accessRequest[uid].status === 'Submitted' || accessRequest[uid].status === 'Granted')
                                ?   <button className='w-100 btn btn-lg btn-danger' type='button' disabled={false} onClick={ () => { submitRequestHandler('Denied') } }>Deny Access</button>
                                :   null
                            }
                            
                        </div>
                    :   null
                }
            </div>
        </div>
    )
}

export default AccessRequestForm;