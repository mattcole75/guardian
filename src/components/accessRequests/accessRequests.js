import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { plannerGetPlanners, userUpdateAccessRequest } from '../../store/actions/index';

import moment from "moment";
import Filter from "./filter/filter";
import List from "./lists/list";
import Backdrop from "../ui/backdrop/backdrop";
import Spinner from "../ui/spinner/spinner";
import Modal from "../ui/modal/modal";


const AccessRequests = () => {

    const dispatch = useDispatch();
    
    const loading = useSelector(state => state.accessRequest.loading);
    const error = useSelector(state => state.accessRequest.error);
    const accessRequests = useSelector(state => state.accessRequest.accessRequests);

    const { idToken, localId, roles, displayName } = useSelector(state => state.auth);

    const onGetPlanners = useCallback((idToken, localId, identifier) => dispatch(plannerGetPlanners(idToken, localId, identifier)), [dispatch]);
    const onUpdateAccessRequest = useCallback((id, idToken, localId, data, identifier) => dispatch(userUpdateAccessRequest(id, idToken, localId, data, identifier)), [dispatch]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const toggleDeleteModal = () => {
        setShowDeleteModal(preState => !preState);
    }
    
    // side effect to return a list of planners if the user has the planner or coordinator role asigned
    useEffect(() => {
        if(roles.includes('planner') || roles.includes('coordinator'))
            onGetPlanners(idToken, localId, 'GET_PLANNERS');
    }, [idToken, localId, onGetPlanners, roles]);

    const deleteRequestHandler = (id) => {
        // save id
        setDeleteId(id);
        // show dialogue
        toggleDeleteModal();
    };

    const deleteAccessRequest = useCallback(() => {

        // find item index in array
        const index = accessRequests.findIndex(req => req.hasOwnProperty(deleteId))
        //copy the event log array and add delete event
        let updatedEventLogItems = [ ...accessRequests[index][deleteId].eventLog ];
        updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'Access Request Deleted' });

        onUpdateAccessRequest(deleteId, idToken, localId, {
            inuse: false, 
            updated: moment().format(),
            eventLog: updatedEventLogItems
        }, 'DELETE_ACCESS_REQUEST');

        toggleDeleteModal();
    }, [accessRequests, deleteId, displayName, idToken, localId, onUpdateAccessRequest]);

    let modal = null;
    if(showDeleteModal === true) {
        modal = <Modal
            show={showDeleteModal}
            modalClosed={ toggleDeleteModal }
            content={
                <div className='modal-content form-auth rounded-4 shadow bg-white'>
                    <div className='modal-body p-4 text-center'>
                        <h5 className='mb-0'>Delete Access Request</h5>
                        <p className='mb-0'>Are you sure you want to delete this Access Request?</p>
                    </div>
                    <div className='flex-nowrap p-0'>
                        <button type='button' className='btn btn-lg btn-danger fs-6 text-decoration-none col-6 m-0 rounded-0 w-100' onClick={ deleteAccessRequest }><strong>Yes, delete</strong></button>
                        <button type='button' className='btn btn-lg btn-success fs-6 text-decoration-none col-6 m-0 rounded-0 w-100' onClick={ toggleDeleteModal }>Cancel</button>
                    </div>
                </div>

            } />;
    }

    let spinner = null;

    if(loading)
        spinner = <Spinner />

    return (
        <div className="container">
             <Backdrop show={loading} />
            { spinner }
            { error &&
                <div className='alert alert-danger text-wrap text-break' role='alert'>
                    {error}
                </div>
            }
            { modal }

            <div className='u-margin-bottom-small'>
                <Filter />
            </div>

            {/* The List Component */}
            <div>
                <List accessRequests={accessRequests} deleteRequestHandler={deleteRequestHandler} displayName={displayName} />
            </div>
        </div>
    )
}

export default AccessRequests;