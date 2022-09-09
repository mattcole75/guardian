import React, { useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';
import moment from "moment";

import Backdrop from "../ui/backdrop/backdrop";
import Spinner from "../ui/spinner/spinner";

import Filter from "./filter/filter";
import RequestList from "./list/requestList";


const Applications = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const loading = useSelector(state => state.requests.loading);
    const error = useSelector(state => state.requests.error);
    const requests = useSelector(state => state.requests.requests);
    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const roles = useSelector(state => state.auth.roles);

    const today = Date.parse(moment().startOf('day'));

    const onGetPlanners = useCallback((idToken, localId, identifier) => dispatch(action.getPlanners(idToken, localId, identifier)), [dispatch]);
    
    const onSelectRequestItem = useCallback((request, identifier) => dispatch(action.selectRequestItem(request, identifier)), [dispatch]);

    useEffect(() => {
        
        if(roles.includes('planner') || roles.includes('coordinator'))
            onGetPlanners(idToken, localId, 'GET_PLANNERS');

        // onGetRequests(idToken, localId, roles, 'GET_REQUESTS');

    }, [idToken, localId, onGetPlanners, roles, today]);

    const navigateToRequestItem = () => {
        navigate('/request');
    }

    const editRequestItem = (item) => {
        onSelectRequestItem(item, 'UPDATE_SELECTED_ITEM');
        navigateToRequestItem();
    }

    let spinner = null;

    if(loading)
        spinner = <Spinner />

    return (
        <div className="container">
             <Backdrop show={loading} />
            {spinner}
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            }
            {roles.includes('planner')
                ?   <Filter />
                :   null
            }
            {/* <hr className="mt-5" /> */}
            <div className="row">
                <RequestList requests={requests} select={editRequestItem} />
            </div>
        </div>
    )
}

export default Applications;