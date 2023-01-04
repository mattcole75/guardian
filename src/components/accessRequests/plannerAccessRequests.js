import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';

import Backdrop from "../ui/backdrop/backdrop";
import Spinner from "../ui/spinner/spinner";

import Filter from "./filter/filter";
import PlannerList from "./lists/plannerList/plannerList";


const PlannerAccessRequests = () => {

    const dispatch = useDispatch();
    
    const loading = useSelector(state => state.accessRequest.loading);
    const error = useSelector(state => state.accessRequest.error);
    const accessRequests = useSelector(state => state.accessRequest.accessRequests);
    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const roles = useSelector(state => state.auth.roles);

    const onGetPlanners = useCallback((idToken, localId, identifier) => dispatch(action.plannerGetPlanners(idToken, localId, identifier)), [dispatch]);
    // const onGetAccessRequests = useCallback((idToken, localId, startDate, endDate, statusFilter, identifier) => dispatch(action.userGetAccessRequests(idToken, localId, startDate, endDate, statusFilter, identifier)), [dispatch]);

    // a side effect to query the database and return to state a list of requests
    // useEffect(() => {
    //     onGetAccessRequests(idToken, localId, null, null, '', '', 'GET_ACCESS_REQUESTS');
    // },[idToken, localId, onGetAccessRequests, roles]);

    
    // side effect to return a list of planners if the user has the planner or coordinator role asigned
    useEffect(() => {
        if(roles.includes('planner') || roles.includes('coordinator'))
            onGetPlanners(idToken, localId, 'GET_PLANNERS');
    }, [idToken, localId, onGetPlanners, roles]);

    let spinner = null;

    if(loading)
        spinner = <Spinner />

    return (
        <div className="container">
             <Backdrop show={loading} />
            {spinner}
            {error &&
                <div className='alert alert-danger text-wrap text-break' role='alert'>
                    {error}
                </div>
            }
            {/* The list Filter Component */}
            {roles.includes('planner')
                ?   <Filter />
                :   null
            }

            {/* The List Component */}
            <div className="row">
                <PlannerList accessRequests={accessRequests} />
            </div>
        </div>
    )
}

export default PlannerAccessRequests;