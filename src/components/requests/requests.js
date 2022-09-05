import React, { useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';

import RequestList from "./list/requestList";

const Applications = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const requests = useSelector(state => state.requests.requests);
    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const roles = useSelector(state => state.auth.roles);

    const onGetPlanners = useCallback((idToken, localId, identifier) => dispatch(action.getPlanners(idToken, localId, identifier)), [dispatch]);
    const onGetRequests = useCallback((idToken, localId, roles, identifier) => dispatch(action.getRequests(idToken, localId, roles, identifier)), [dispatch]);
    const onSelectRequestItem = useCallback((request, identifier) => dispatch(action.selectRequestItem(request, identifier)), [dispatch]);

    useEffect(() => {
        
        if(roles.includes('planner') || roles.includes('coordinator'))
            onGetPlanners(idToken, localId, 'GET_PLANNERS');

        onGetRequests(idToken, localId, roles, 'GET_REQUESTS');

    }, [idToken, localId, onGetPlanners, onGetRequests, roles]);

    const navigateToRequestItem = () => {
        navigate('/request');
    }

    const editRequestItem = (item) => {
        onSelectRequestItem(item, 'UPDATE_SELECTED_ITEM');
        navigateToRequestItem();
    }

    return (
        <div className="container">
            {!roles.includes('coordinator')
                ?   <div className="p-3 form-floating">
                
                        <div className="btn-group float-start" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-success" onClick={navigateToRequestItem}>New Access Request</button>
                        </div>
                    </div>
                :   null
            }
            <hr className="mt-5" />
            <div className="row">
                <RequestList requests={requests} select={editRequestItem} />
            </div>
        </div>
    )
}

export default Applications;