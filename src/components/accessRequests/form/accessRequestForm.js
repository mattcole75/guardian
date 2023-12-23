import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../../store/actions/index';
import { Navigate, useParams } from 'react-router-dom';
import moment from 'moment';

import Administration from './administration/administration';
import Requestor from './requester/requester';
import AccessRequestSummary from './requestSummary/accessRequestSummary';
import Locations from './location/locations';
import LocationForm from './location/form/locationForm';
import Hazards from './hazards/hazards';
import Comment from '../comment/comment';
// import Finance from './finance/finance';
import EventLog from './eventLog/eventLog';

import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const AccessRequestForm = () => {

    const { uid } = useParams();
    const dispatch = useDispatch();

    const [editLocation, setEditLocation] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const [recordLocked, setRecordLocked] = useState(false);
    const [comment, setComment] = useState('');
    const [commentButtonEnabled, setCommentButtonEnabled] = useState(false);
    const [grantButtonDisabled, setGrantButtonDisabled] = useState(true);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const accessRequestLoading = useSelector(state => state.accessRequest.loading);
    const accessRequestError = useSelector(state => state.accessRequest.error);
    
    const { idToken, localId, displayName, roles } = useSelector(state => state.auth);
    
    const accessRequest = useSelector(state => state.accessRequest.accessRequest);
    // const locationIndex = useSelector(state => state.accessRequest.locationIndex);
    
    const isPlanner = roles.includes('planner');
    const isCoordinator = roles.includes('coordinator');
    
    // set the record uid as key
    let key = null;
    if(accessRequest && uid !== 'new') {
        key = uid;
    } else if (accessRequest && uid === 'new') {
        key = Object.keys(accessRequest)[0];
    }
    
    const onGetAccessRequest = useCallback((idToken, localId, uid, identifier) => dispatch(action.userGetAccessRequest(idToken, localId, uid, identifier)), [dispatch]);
    const onUpdateAccessRequest = useCallback((id, idToken, localId, data, identifier) => dispatch(action.userUpdateAccessRequest(id, idToken, localId, data, identifier)), [dispatch]);
    // const onLocationItemSelect = useCallback((index, identifier) => dispatch(action.selectLocation(index, identifier)), [dispatch]);
    const onGetPlanners = useCallback((idToken, localId, identifier) => dispatch(action.plannerGetPlanners(idToken, localId, identifier)), [dispatch]);
    
    // load access request if it's not new
    useEffect (() => {
        // get access request from db
        if(roles.includes('planner') || roles.includes('coordinator'))
            onGetPlanners(idToken, localId, 'GET_PLANNERS');
            
        onGetAccessRequest(idToken, localId, uid, 'GET_ACCESS_REQUEST');
    }, [uid, idToken, localId, onGetAccessRequest, roles, onGetPlanners]);

    // if a user tries to view another users access request then redirect
    useEffect(() => {

        if(!roles.includes('coordinator') && !roles.includes('planner') && !roles.includes('disruptionAuthority'))
            if(accessRequest != null && accessRequest[key].requestor.name !== displayName)
                setRedirect(<Navigate to='/forbidden' />);

    }, [accessRequest, displayName, key, roles]);

    // determin if the record is editable based on status
    useEffect(() => {
        if(accessRequest) {
            if(accessRequest[key].status === 'Submitted' || accessRequest[key].status === 'Under Review' || accessRequest[key].status === 'Granted')
                setRecordLocked(true);
            else
                setRecordLocked(false);
        }
    }, [accessRequest, key]);

    // enable or disable the comment button
    useEffect(() => {
        if(comment.length > 0)
            setCommentButtonEnabled(true);
        else
            setCommentButtonEnabled(false);
    },[comment]);

    // enable or disable the submit button.
    useEffect(() => {
        if(accessRequest && accessRequest[key].locationItems && accessRequest[key].locationItems.length > 0)
            setSubmitButtonDisabled(false);
        else
            setSubmitButtonDisabled(true);
    }, [key, accessRequest]);

    // enable or disable the grant access button
    useEffect(() => {

        let allLocationItemsConfirmed = true;
        let allDisruptedItemsApproved = true;

        if(accessRequest && accessRequest[key].locationItems && accessRequest[key].locationItems.length > 0) {
            accessRequest[key].locationItems.forEach(ele => {
                if(ele.locationStatus !== 'Confirmed')
                    allLocationItemsConfirmed = false;
            });
        }

        if(allLocationItemsConfirmed === true && allDisruptedItemsApproved === true)
            setGrantButtonDisabled(false);
        else
            setGrantButtonDisabled(true);
    }, [accessRequest, key]);

    // save the access request, this may be a new record or an update to an existing record
    const saveAccessRequestHandler = useCallback((data) => {
        onUpdateAccessRequest(key, idToken, localId, {
            ...accessRequest[key],
            ...data
        }, 'UPDATE_ACCESS_REQUEST');
    }, [idToken, key, localId, onUpdateAccessRequest, accessRequest]);

    const submitRequestHandler = useCallback((status) => {

        if(accessRequest) {
            let updatedEventLogItems = [ ...accessRequest[key].eventLog ];
            updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'Access Request ' + status });

            switch (status) {
                case 'Denied':
                    onUpdateAccessRequest(key, idToken, localId, {
                        status: status, 
                        updated: moment().format(),
                        eventLog: updatedEventLogItems
                    }, 'UPDATE_ACCESS_REQUEST_STATUS');
                    break;
                default:
                    onUpdateAccessRequest(key, idToken, localId, { 
                        status: status,
                        updated: moment().format(),
                        eventLog: updatedEventLogItems
                    }, 'UPDATE_ACCESS_REQUEST_STATUS');
            }
            
            setRedirect(<Navigate to='/accessrequests' />);
            
            
        }
    }, [accessRequest, displayName, onUpdateAccessRequest, key, idToken, localId]);

    const onSaveComment = useCallback(() => {

        let updatedComments = [];

        if (accessRequest[key].comments != null)
            updatedComments = [ ...accessRequest[key].comments ];

            updatedComments.push({
                commentator: displayName,
                logged: moment().format(),
                comment: comment
            });

            saveAccessRequestHandler({ comments: updatedComments }, 'SAVE_ACCESS_REQUEST');
        setComment('');
    }, [comment, displayName, key, accessRequest, saveAccessRequestHandler]);

    // const locationSelectHandler = useCallback((index) => {
    //     onLocationItemSelect(index, 'LOCATION_ITEM_SELECT');
    // }, [onLocationItemSelect]);

    const toggleLocationEdit = () => {
        // if(editLocation)
        //     locationSelectHandler(null);
        
        setEditLocation(prevState => !prevState);
    }

    let spinner = null;
    if(accessRequestLoading)
        spinner = <Spinner />;
    
    let modal = null;
    if(editLocation) {
        modal = <Modal 
            show={ editLocation } 
            modalClosed={ toggleLocationEdit } 
            content={
                <LocationForm 
                    toggle={ toggleLocationEdit }
                    save={saveAccessRequestHandler} 
                    accessRequest={ accessRequest ? accessRequest[key] : null }
                    // index={ locationIndex }
                    recordLocked={ recordLocked }
                />
            }/>
    }

    return (
        <div className='form-request my-5 shadow'>
            {redirect}
            <Backdrop show={ accessRequestLoading } />
                {spinner}
            
            {accessRequestError &&
                <div className='alert alert-danger' role='alert'>
                    {accessRequestError}
                </div>
            }
            
            {modal}
            <div className=''>
                <div className='text-sm-center'>
                    <i className='bi-calendar2-plus form-auth-icon'></i>
                    <h1 className='h3 mb-3 fw-normal'>Access Request Form</h1>
                </div>
                
                <div className='form-floating mb-3'>

                    <div className='accordion' id='accordionPanels'>
                        {/* This section is for planners and coordinators to discuss the access request */}
                        { accessRequest && (isCoordinator || isPlanner) && (accessRequest[key].requestor.requestorName !== displayName)
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingAdministration'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseAdministration' aria-expanded='true' aria-controls='panelsStayOpen-collapseAdministration'>
                                            Administration (only coordinators and planners can see this tab)
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseAdministration' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingAdministration'>
                                        <div className='accordion-body'>
                                            <Administration  accessRequest={accessRequest ? accessRequest[key] : null} save={saveAccessRequestHandler} />
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
                                            <Requestor requestor={ accessRequest[key].requestor } />
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
                                            <EventLog eventLog={ accessRequest[key].eventLog } />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Summary Details for the access Request */}
                        { accessRequest || uid === 'new'
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingSummary'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseSummary' aria-expanded='true' aria-controls='panelsStayOpen-collapseSummary'>
                                            <h3 className='h5 m-0 text-muted'>Access Request Summary</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseSummary' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingSummary'>
                                        <div className='accordion-body'>
                                            <AccessRequestSummary summary={ accessRequest ? accessRequest[key].summary : null } locationItems={ accessRequest ? accessRequest[key].locationItems : null } save={saveAccessRequestHandler} recordLocked={recordLocked} />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }
                        
                        {/* Location Section */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingLocations'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseLocations' aria-expanded='true' aria-controls='panelsStayOpen-collapseLocations'>
                                            <h3 className='h5 m-0 text-muted'>Location(s)</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseLocations' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingLocations'>
                                        <div className='accordion-body'>
                                            <Locations
                                                accessRequest={ accessRequest ? accessRequest[key] : null }
                                                save={ saveAccessRequestHandler }
                                                toggle={ toggleLocationEdit }
                                                // select={ locationSelectHandler }
                                                recordLocked={ recordLocked }
                                            />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Hazaard Section */}
                        { accessRequest
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingHazards'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseHazards' aria-expanded='true' aria-controls='panelsStayOpen-collapseHazards'>
                                            <h3 className='h5 m-0 text-muted'>Hazards</h3>
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseHazards' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingHazards'>
                                        <div className='accordion-body'>
                                            <Hazards
                                                accessRequest={accessRequest ? accessRequest[key] : null}
                                                save={saveAccessRequestHandler}
                                                recordLocked={recordLocked}
                                            />
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
                                                { accessRequest && accessRequest[key].comments
                                                    ?   <div className='list-group'>
                                                            {accessRequest[key].comments.map((item, index) => (<Comment key={index} comment={item} />))}
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
                { (!recordLocked && accessRequest && (accessRequest[key].requestor.name === displayName))
                    ?   <button className='w-100 btn btn-lg btn-primary mb-3' type='button' disabled={submitButtonDisabled} onClick={ () => { submitRequestHandler('Submitted') } }>Submit For Approval</button>
                    :   null
                }
                { (accessRequest && isPlanner === true) && (accessRequest[key].requestor.name !== displayName)
                    ?   <div>
                            {accessRequest && accessRequest[key].status === 'Submitted' && accessRequest[key].status !== 'Approved'
                                ?   <button className='w-100 btn btn-lg btn-success mb-3' type='button' disabled={ grantButtonDisabled } onClick={() => { submitRequestHandler('Granted')}}>Grant Access</button>
                                :   null
                            }
                            {accessRequest && (accessRequest[key].status === 'Submitted' || accessRequest[key].status === 'Granted')
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