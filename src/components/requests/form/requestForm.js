import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../../store/actions/index';
import { Navigate } from 'react-router-dom';
import moment from 'moment';

import Administration from './administration/administration';
import Requestor from './requestor/requestor';
import RequestSummary from './requestSummary/requestSummary';
import LocationLimits from './locationLimits/locationLimits';
import LocationLimitForm from './locationLimits/locationLimitForm';
import Hazards from './hazards/hazards';
import Comment from '../comment/comment';

import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const Request = () => {

    const dispatch = useDispatch();

    const [editLocationLimit, setEditLocationLimit] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const [editable, setEditable] = useState(true);
    const [comment, setComment] = useState('');
    const [commentButtonEnabled, setCommentButtonEnabled] = useState(false);

    const loading = useSelector(state => state.requests.loading);
    const error = useSelector(state => state.requests.error);
    
    const {idToken, localId, displayName, phoneNumber, email, organisation, roles } = useSelector(state => state.auth);

    const request = useSelector(state => state.requests.request);
    
    // get the record uid as key
    let key = null;
    if(request)
        key = Object.keys(request);

    const locationLimitIndex = useSelector(state => state.requests.locationLimitIndex);

    const onCreate = useCallback((idToken, localId, data, identifier) => dispatch(action.createRequest(idToken, localId, data, identifier)), [dispatch]);
    const onUpdate = useCallback((id, idToken, localId, data, identifier) => dispatch(action.updateRequest(id, idToken, localId, data, identifier)), [dispatch]);
    const onLocationLimitItemSelect = useCallback((index, identifier) => dispatch(action.selectLocationLimit(index, identifier)), [dispatch]);
    
    useEffect(() => {
        if(request) {
            if(request[key].status === 'Submitted' || request[key].status === 'Under Review' || request[key].status === 'Granted')
                setEditable(false);
            else
                setEditable(true);
        }
    }, [request, key]);

    useEffect(() => {
        if(comment.length > 0)
            setCommentButtonEnabled(true);
        else
            setCommentButtonEnabled(false);
    },[comment]);

    // save the access request, this may be a new record or an update to an existing record
    const saveHandler = useCallback((data) => {
        if(request)
            onUpdate(key, idToken, localId, data, 'UPDATE_REQUEST');
        else {

            onCreate(idToken, localId, { ...data, 
                requestorName: displayName,
                requestorPhoneNumber: phoneNumber,
                requestorEmail: email,
                requestorOrganisation: organisation }, 
            'CREATE_REQUEST');
        }
        
    }, [displayName, email, idToken, key, localId, onCreate, onUpdate, organisation, phoneNumber, request]);

    const submitRequestHandler = useCallback((status) => {
        if(request) {
            onUpdate(key, idToken, localId, { status: status }, 'UPDATE_REQUEST_STATUS');
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
    }, [comment, displayName, key, request, saveHandler]);

    const locationLimitSelectHandler = useCallback((index) => {
        onLocationLimitItemSelect(index, 'LOCATION_ITEM_SELECT');
    }, [onLocationLimitItemSelect]);

    const toggleLocationLimitEdit = () => {
        if(editLocationLimit)
            locationLimitSelectHandler(null);
        
        setEditLocationLimit(prevState => !prevState)
    };

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
                    request={request[key]}
                    index={locationLimitIndex}
                    editable={editable}
                />
            }/>
    }

    return (
        <div className='form-request my-5'>
            {redirect}
            <Backdrop show={loading} />
                {spinner}
            
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error.message}
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
                        { roles.includes('coordinator') || roles.includes('planner')
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

                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='panelsStayOpen-headingSummary'>
                                <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseSummary' aria-expanded='true' aria-controls='panelsStayOpen-collapseSummary'>
                                    Access Request Summary
                                </button>
                            </h2>
                            <div id='panelsStayOpen-collapseSummary' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingSummary'>
                                <div className='accordion-body'>
                                    <RequestSummary request={request ? request[key] : null} save={saveHandler} editable={editable} />
                                </div>
                            </div>
                        </div>

                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='panelsStayOpen-headingLocationLimits'>
                                <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseLocationLimits' aria-expanded='true' aria-controls='panelsStayOpen-collapseLocationLimits'>
                                    Location Limits
                                </button>
                            </h2>
                            <div id='panelsStayOpen-collapseLocationLimits' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingLocationLimits'>
                                <div className='accordion-body'>
                                    <LocationLimits request={request ? request[key] : null} save={saveHandler} editable={editable} toggle={toggleLocationLimitEdit} select={locationLimitSelectHandler} />
                                </div>
                            </div>
                        </div>

                        <div className='accordion-item'>
                            <h2 className='accordion-header' id='panelsStayOpen-headingHazards'>
                                <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseHazards' aria-expanded='true' aria-controls='panelsStayOpen-collapseHazards'>
                                    Hazards
                                </button>
                            </h2>
                            <div id='panelsStayOpen-collapseHazards' className='accordion-collapse collapse show' aria-labelledby='panelsStayOpen-headingHazards'>
                                <div className='accordion-body'>
                                    <Hazards request={request ? request[key] : null} save={saveHandler} editable={editable} toggle={toggleLocationLimitEdit} select={locationLimitSelectHandler} />
                                </div>
                            </div>
                        </div>
                        <div className='accordion-item'>
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
                                                <input type='text' className='form-control' id='comment' autoComplete='off' onChange={(event => {setComment(event.target.value)})} placeholder='Type your message here' />
                                            </div>
                                            <div className='text-sm-end'>
                                                <button className='w-25 btn btn-sm btn-primary mb-3' type='button' disabled={!commentButtonEnabled} onClick={onSaveComment}>Send</button>
                                            </div>
                                        </div>
                                        <div className='list-group'>
                                            {
                                                (request && request[key].comments) && request[key].comments.map((item, index) => (<Comment key={index} comment={item} />))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                        
                </div>
                {(editable && request && (request[key].requestorName === displayName))
                    ?   <button className='w-100 btn btn-lg btn-primary mb-3' type='button' disabled={false} onClick={() => {submitRequestHandler('Submitted')}}>Submit For Approval</button>
                    :   null
                }
                { roles.includes('planner')
                    ?   <div>
                            {request && request[key].status !== 'Approved'
                                ? <button className='w-100 btn btn-lg btn-success mb-3' type='button' disabled={false} onClick={() => {submitRequestHandler('Granted')}}>Grant Access</button>
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