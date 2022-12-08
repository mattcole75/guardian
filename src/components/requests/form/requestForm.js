import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../../store/actions/index';
import { Navigate, useParams } from 'react-router-dom';
import moment from 'moment';

import Administration from './administration/administration';
import Requestor from './requestor/requestor';
import RequestSummary from './requestSummary/requestSummary';
import Disruptive from './disruptive/disruptive';
import LocationLimits from './locationLimits/locationLimits';
import LocationLimitForm from './locationLimits/locationLimitForm';
import Hazards from './hazards/hazards';
import Comment from '../comment/comment';
import Finance from './finance/finance';
import Compliance from './compliance/compliance';

import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const Request = () => {

    const { uid } = useParams();
    const dispatch = useDispatch();

    // // Disruptive: Tram Service Impact
    // const [editingTramDisruptiveItem, setEditingTramDisruptiveItem] = useState(false);
    // const [selectedTramImpactItemIndex, setSelectedTramImpactItemIndex] = useState(null);
    // const toggleEditingTramDisruptiveImpact = () => {
    //     if(editingTramDisruptiveItem)
    //         tramDisruptiveItemSelected(null);

    //     setEditingTramDisruptiveItem(prevState => !prevState);
    // }
    // const tramDisruptiveItemSelected = (index) => {
    //     setSelectedTramImpactItemIndex(index);
    // }

    const [editLocationLimit, setEditLocationLimit] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const [recordLocked, setRecordLocked] = useState(false);
    const [comment, setComment] = useState('');
    const [commentButtonEnabled, setCommentButtonEnabled] = useState(false);
    const [grantButtonDisabled, setGrantButtonDisabled] = useState(true);

    const loading = useSelector(state => state.requests.loading);
    const error = useSelector(state => state.requests.error);
    
    const { idToken, localId, displayName, phoneNumber, email, organisation, roles } = useSelector(state => state.auth);
    const request = useSelector(state => state.requests.request);

    const isPlanner = roles.includes('planner');
    const isCoordinator = roles.includes('coordinator');
    
    // set the record uid as key
    let key = null;
    if(request && uid !== 'new') {
        key = uid;
    } else if (request && uid === 'new') {
        key = Object.keys(request)[0];
    }
        
    const locationLimitIndex = useSelector(state => state.requests.locationLimitIndex);

    const onCreate = useCallback((idToken, localId, data, identifier) => dispatch(action.createRequest(idToken, localId, data, identifier)), [dispatch]);
    const onGetRequest = useCallback((idToken, localId, uid, identifier) => dispatch(action.getRequest(idToken, localId, uid, identifier)), [dispatch]);
    const onUpdate = useCallback((id, idToken, localId, data, identifier) => dispatch(action.updateRequest(id, idToken, localId, data, identifier)), [dispatch]);
    const onLocationLimitItemSelect = useCallback((index, identifier) => dispatch(action.selectLocationLimit(index, identifier)), [dispatch]);
    
    useEffect (() => {
        if(uid !== 'new') {
            // get request from db
            onGetRequest(idToken, localId, uid, 'GET_REQUEST');
        }
    }, [uid, onGetRequest, idToken, localId]);

    const disruptive = {
        disruptiveStatus: (key && request[key].disruptiveStatus) ? request[key].disruptiveStatus : null,
        requestorName: (key && request[key].requestorName) ? request[key].requestorName : null,
        accessRequestCreated: (key && request[key].created) ? request[key].created : null,
        disruptionSubmittedDate: (key && request[key].disruptionSubmittedDate) ? request[key].disruptionSubmittedDate : null,
        accessFirstDay: (key && request[key].accessFirstDay) ? request[key].accessFirstDay : null,
        disruptionSubmittedBy: (key && request[key].disruptionSubmittedBy) ? request[key].disruptionSubmittedBy : null,
        disruptiveAuthorityUpdatedBy: (key && request[key].disruptiveAuthorityUpdatedBy) ? request[key].disruptiveAuthorityUpdatedBy : null,
        disruptionAuthorityUpdatedDate: (key && request[key].disruptionAuthorityUpdatedDate) ? request[key].disruptionAuthorityUpdatedDate : null,
    }

    // determin if the record is editable based on status
    useEffect(() => {
        if(request) {
            if(request[key].status === 'Submitted' || request[key].status === 'Under Review' || request[key].status === 'Granted')
                setRecordLocked(true);
            else
                setRecordLocked(false);
        }
    }, [request, key]);

    useEffect(() => {
        if(comment.length > 0)
            setCommentButtonEnabled(true);
        else
            setCommentButtonEnabled(false);
    },[comment]);

    useEffect(() => {
        console.log(request && request[key].isDisruptive);

        if(request && request[key].isDisruptive && request[key].disruptiveStatus === 'Approved')
            setGrantButtonDisabled(false);
        else if( request && (request[key].isDisruptive == null || request[key].isDisruptive === false ))
            setGrantButtonDisabled(false);
        else
            setGrantButtonDisabled(true);
    }, [request, key]);

    // save the access request, this may be a new record or an update to an existing record
    const saveHandler = useCallback((data) => {

        if(request){
            onUpdate(key, idToken, localId, data, 'UPDATE_REQUEST');
        }
        else {
            onCreate(idToken, localId, { ...data, 
                requestorName: displayName,
                requestorPhoneNumber: phoneNumber,
                requestorEmail: email,
                requestorOrganisation: organisation
            }, 'CREATE_REQUEST');
        }
    }, [displayName, email, idToken, key, localId, onCreate, onUpdate, organisation, phoneNumber, request]);

    const submitRequestHandler = useCallback((status) => {
        if(request) {
            switch (status) {
                case 'Denied':
                    onUpdate(key, idToken, localId, { status: status, disruptiveStatus: 'Draft' }, 'UPDATE_REQUEST_STATUS');
                break;
                default:
                    onUpdate(key, idToken, localId, { status: status }, 'UPDATE_REQUEST_STATUS');
            }
            
            setRedirect(<Navigate to='/requests' />);
        }
    }, [request, onUpdate, key, idToken, localId]);

    const onSaveComment = useCallback(() => {

        let updatedComments = [];

        if (request[key].comments != null)
            updatedComments = [ ...request[key].comments ];

            updatedComments.push({
                commentator: displayName,
                logged: moment().format(),
                comment: comment
            });

        saveHandler({ comments: updatedComments }, 'SAVE_REQUEST');
        setComment('');
    }, [comment, displayName, key, request, saveHandler]);

    const locationLimitSelectHandler = useCallback((index) => {
        onLocationLimitItemSelect(index, 'LOCATION_ITEM_SELECT');
    }, [onLocationLimitItemSelect]);

    const toggleLocationLimitEdit = () => {
        if(editLocationLimit)
            locationLimitSelectHandler(null);
        
        setEditLocationLimit(prevState => !prevState);
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;
    
    let modal = null;
    if(editLocationLimit) {
        modal = <Modal 
            show={editLocationLimit} 
            modalClosed={toggleLocationLimitEdit} 
            content={
                <LocationLimitForm 
                    toggle={toggleLocationLimitEdit}
                    save={saveHandler} 
                    request={request ? request[key] : null}
                    index={locationLimitIndex}
                    recordLocked={recordLocked}
                />
            }/>
    }

    // if(editingTramDisruptiveItem) {
    //     modal = <Modal 
    //     show={editingTramDisruptiveItem} 
    //     modalClosed={toggleEditingTramDisruptiveImpact} 
    //     content={
    //         <TramImpactForm
    //             roles={roles}
    //             toggle={toggleEditingTramDisruptiveImpact}
    //             save={saveHandler} 
    //             request={request ? request[key] : null}
    //             index={selectedTramImpactItemIndex}
    //             editable={editable}
    //             setIndex={tramDisruptiveItemSelected}
    //         />
    //     }/>
    // }

    return (
        <div className='form-request my-5 shadow'>
            {redirect}
            <Backdrop show={loading} />
                {spinner}
            
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            }
            {modal}
            <div className=''>
                <div className='text-sm-center'>
                    <i className='bi-plus-circle-dotted form-auth-icon'></i>
                    <h1 className='h3 mb-3 fw-normal'>Access Request Form</h1>
                </div>
                
                <div className='form-floating mb-3'>

                    <div className='accordion' id='accordionPanels'>
                        {/* This section is for planners and coordinators to discuss the access request */}
                        { request && (isCoordinator || isPlanner)
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingAdministration'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseAdministration' aria-expanded='true' aria-controls='panelsStayOpen-collapseAdministration'>
                                            Administration (only coordinators and planners can see this tab)
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseAdministration' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingAdministration'>
                                        <div className='accordion-body'>
                                            <Administration request={request ? request[key] : null} save={saveHandler} />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* This section details the person who made the request and is collapsed by default */}
                        { request
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingRequestor'>
                                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseRequestor' aria-expanded='false' aria-controls='panelsStayOpen-collapseRequestor'>
                                            Requestor Details
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseRequestor' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingRequestor'>
                                        <div className='accordion-body'>
                                            <Requestor request={request[key]} />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* details about the requests compliance */}
                        { request
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingCompliance'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseCompliance' aria-expanded='true' aria-controls='panelsStayOpen-collapseCompliance'>
                                            Compliance
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseCompliance' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingCompliance'>
                                        <div className='accordion-body'>
                                            <Compliance disruptive={disruptive} />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* General Details about the access Request */}
                        { request || uid === 'new'
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingSummary'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseSummary' aria-expanded='true' aria-controls='panelsStayOpen-collapseSummary'>
                                            Access Request Summary
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseSummary' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingSummary'>
                                        <div className='accordion-body'>
                                            <RequestSummary request={request ? request[key] : null} save={saveHandler} recordLocked={recordLocked} />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Finance Details about the request */}
                        {
                            request
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingFinance'>
                                        <button className='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseFinance' aria-expanded='false' aria-controls='panelsStayOpen-collapseFinance'>
                                            Finance
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseFinance' className='accordion-collapse collapse' aria-labelledby='panelsStayOpen-headingFinance'>
                                        <div className='accordion-body'>
                                            <Finance request={request ? request[key] : null} save={saveHandler} recordLocked={recordLocked} />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Details for a disruptive request */}
                        { request
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingDisruptive'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseDisruptive' aria-expanded='true' aria-controls='panelsStayOpen-collapseDisruptive'>
                                            Disruptive Details
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseDisruptive' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingDisruptive'>
                                        <div className='accordion-body'>
                                            <Disruptive 
                                                request={request ? request[key] : null}
                                                disruptive={disruptive}
                                                save={saveHandler}
                                                recordLocked={recordLocked}
                                            />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        } 
                        
                        {/* Location Limit Section */}
                        { request
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingLocationLimits'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseLocationLimits' aria-expanded='true' aria-controls='panelsStayOpen-collapseLocationLimits'>
                                            Location Limits
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseLocationLimits' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingLocationLimits'>
                                        <div className='accordion-body'>
                                            <LocationLimits
                                                request={request ? request[key] : null}
                                                save={saveHandler}
                                                toggle={toggleLocationLimitEdit}
                                                select={locationLimitSelectHandler}
                                                recordLocked={recordLocked}
                                            />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Hazaard Section */}
                        { request
                            ?   <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingHazards'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseHazards' aria-expanded='true' aria-controls='panelsStayOpen-collapseHazards'>
                                            Hazards
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseHazards' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingHazards'>
                                        <div className='accordion-body'>
                                            <Hazards
                                                request={request ? request[key] : null}
                                                save={saveHandler}
                                                toggle={toggleLocationLimitEdit}
                                                select={locationLimitSelectHandler}
                                                recordLocked={recordLocked}
                                            />
                                        </div>
                                    </div>
                                </div>
                            :   null
                        }

                        {/* Comment section */}
                        { request
                            ?    <div className='accordion-item'>
                                    <h2 className='accordion-header' id='panelsStayOpen-headingComments'>
                                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseComments' aria-expanded='true' aria-controls='panelsStayOpen-collapseComments'>
                                            Comments
                                        </button>
                                    </h2>
                                    <div id='panelsStayOpen-collapseComments' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingComments'>
                                        <div className='accordion-body'>
                                            <div className='border rounded p-1 mb-1 bg-light'>
                                                <div className='text-sm-start p-2'>
                                                    <div className='mb-1'>
                                                        <label htmlFor='comment' className='form-label'>Comments</label>
                                                        <input type='text' className='form-control' id='comment' value={comment} autoComplete='off' onChange={(event => {setComment(event.target.value)})} placeholder='Type your message here' />
                                                    </div>
                                                    <div className='text-sm-end'>
                                                        <button className='w-25 btn btn-sm btn-primary mb-3' type='button' disabled={!commentButtonEnabled} onClick={onSaveComment}>Send</button>
                                                    </div>
                                                </div>
                                                { request && request[key].comments
                                                    ?   <div className='list-group'>
                                                            {request[key].comments.map((item, index) => (<Comment key={index} comment={item} />))}
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
                { (!recordLocked && request && (request[key].requestorName === displayName))
                    ?   <button className='w-100 btn btn-lg btn-primary mb-3' type='button' disabled={false} onClick={() => {submitRequestHandler('Submitted')}}>Submit For Approval</button>
                    :   null
                }
                { (request && isPlanner === true)
                    ?   <div>
                            {request && request[key].status !== 'Approved'
                                ? <button className='w-100 btn btn-lg btn-success mb-3' type='button' disabled={grantButtonDisabled} onClick={() => {submitRequestHandler('Granted')}}>Grant Access</button>
                                : null
                            }
                            <button className='w-100 btn btn-lg btn-danger' type='button' disabled={false} onClick={() => {submitRequestHandler('Denied')}}>Deny Access</button>
                        </div>
                    :   null
                }
            </div>
        </div>
    )
}

export default Request;