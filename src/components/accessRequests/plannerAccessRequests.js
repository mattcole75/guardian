import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as action from '../../store/actions/index';

import Backdrop from '../ui/backdrop/backdrop';
import Spinner from '../ui/spinner/spinner';
import Modal from '../ui/modal/modal';

import Filter from './filter/filter';
import PlannerList from './lists/plannerList/plannerList';


const PlannerAccessRequests = () => {

    const dispatch = useDispatch();
    
    const loading = useSelector(state => state.accessRequest.loading);
    const error = useSelector(state => state.accessRequest.error);
    const accessRequests = useSelector(state => state.accessRequest.accessRequests);
    const { idToken, localId, displayName, roles } = useSelector(state => state.auth);

    const onUpdateAccessRequest = useCallback((id, idToken, localId, data, identifier) => dispatch(action.userUpdateAccessRequest(id, idToken, localId, data, identifier)), [dispatch]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const toggleDeleteModal = () => {
        setShowDeleteModal(preState => !preState);
    }

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
                <div className='modal-content'>
                    <div className='modal-body p-4 text-center'>
                        <h5 className='mb-0'>Delete Access Request</h5>
                        <p className='mb-0'>Are you sure you want to delete this Access Request?</p>
                    </div>
                    <div className='flex-nowrap p-0'>
                        <button type='button' className='btn btn-lg btn-warning fs-6 text-decoration-none col-6 m-0 rounded-0' onClick={ deleteAccessRequest }><strong>Yes, delete</strong></button>
                        <button type='button' className='btn btn-lg btn-success fs-6 text-decoration-none col-6 m-0 rounded-0' onClick={ toggleDeleteModal }>Cancel</button>
                    </div>
                </div>

            } />;
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />

    return (
        <div className='container'>
             <Backdrop show={ loading } />
            { spinner }
            { error &&
                <div className='alert alert-danger text-wrap text-break' role='alert'>
                    {error}
                </div>
            }
            { modal }
            {/* The list Filter Component */}
            { roles.includes('planner')
                ?   <Filter />
                :   null
            }

            {/* The List Component */}
            <div className='row'>
                <PlannerList accessRequests={accessRequests} deleteRequestHandler={deleteRequestHandler} displayName={displayName} />
            </div>
        </div>
    )
}

export default PlannerAccessRequests;