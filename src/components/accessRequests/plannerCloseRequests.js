import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';
import moment from 'moment';

import Backdrop from "../ui/backdrop/backdrop";
import Spinner from "../ui/spinner/spinner";
import Modal from '../ui/modal/modal';

// import Filter from "./filter/filter";
import ClosedList from "./lists/closedList/closedList";


const PlannerClosedAccessRequests = () => {

    const dispatch = useDispatch();
    
    const loading = useSelector(state => state.accessRequest.loading);
    const error = useSelector(state => state.accessRequest.error);
    const accessRequests = useSelector(state => state.accessRequest.accessRequests);

    const { idToken, localId, roles, displayName } = useSelector(state => state.auth);

    const onUpdateAccessRequest = useCallback((id, idToken, localId, data, identifier) => dispatch(action.userUpdateAccessRequest(id, idToken, localId, data, identifier)), [dispatch]);
    const onGetClosedAccessRequests = useCallback((idToken, localId, identifier) => dispatch(action.plannerGetClosedAccessRequests(idToken, localId, identifier)), [dispatch]);

    const [showCloseModal, setShowCloseModal] = useState(false);
    const [closeId, setCloseId] = useState(null);

    // a side effect to query the database and return to state a list of requests
    useEffect(() => {
        onGetClosedAccessRequests(idToken, localId, null, null, '', '', 'GET_ACCESS_REQUESTS');
    },[idToken, localId, onGetClosedAccessRequests, roles]);

    const toggleCloseModal = () => {
        setShowCloseModal(preState => !preState);
    }

    const closeRequestHandler = (id) => {
        // save id
        setCloseId(id);
        // show dialogue
        toggleCloseModal();
    };

    const closeAccessRequest = useCallback(() => {

        // find item index in array
        const index = accessRequests.findIndex(req => req.hasOwnProperty(closeId))
        //copy the event log array and add delete event
        let updatedEventLogItems = [ ...accessRequests[index][closeId].eventLog ];
        updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: 'Access Request Deleted' });

        onUpdateAccessRequest(closeId, idToken, localId, {
            status: 'Closed', 
            updated: moment().format(),
            eventLog: updatedEventLogItems
        }, 'CLOSE_ACCESS_REQUEST');

        toggleCloseModal();
    }, [accessRequests, closeId, displayName, idToken, localId, onUpdateAccessRequest]);

    let modal = null;
    if(showCloseModal === true) {
        modal = <Modal
            show={showCloseModal}
            modalClosed={ toggleCloseModal }
            content={
                <div className='modal-content'>
                    <div className='modal-body p-4 text-center'>
                        <h5 className='mb-0'>Close Access Request</h5>
                        <p className='mb-0'>Are you sure you want to close this Access Request?</p>
                    </div>
                    <div className='flex-nowrap p-0'>
                        <button type='button' className='btn btn-lg btn-warning fs-6 text-decoration-none col-6 m-0 rounded-0' onClick={ closeAccessRequest }><strong>Yes, close</strong></button>
                        <button type='button' className='btn btn-lg btn-success fs-6 text-decoration-none col-6 m-0 rounded-0' onClick={ toggleCloseModal }>Cancel</button>
                    </div>
                </div>

            } />;
    }

    let spinner = null;

    if(loading)
        spinner = <Spinner />

    return (
        <div className="container">
             <Backdrop show={ loading } />
            { spinner }
            {error &&
                <div className='alert alert-danger text-wrap text-break' role='alert'>
                    { error }
                </div>
            }
            { modal }
            {/* The List Component */}
            <div className="row">
                <ClosedList accessRequests={ accessRequests } displayName={ displayName } closeRequestHandler={ closeRequestHandler } />
            </div>
        </div>
    )
}

export default PlannerClosedAccessRequests;