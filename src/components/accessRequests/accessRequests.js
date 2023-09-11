import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';

import Filter from "./filter/filter";
import List from "./lists/list";
import Backdrop from "../ui/backdrop/backdrop";
import Spinner from "../ui/spinner/spinner";


const AccessRequests = () => {

    const dispatch = useDispatch();
    
    const loading = useSelector(state => state.accessRequest.loading);
    const error = useSelector(state => state.accessRequest.error);
    const accessRequests = useSelector(state => state.accessRequest.accessRequests);

    const { idToken, localId, roles, displayName } = useSelector(state => state.auth);

    const onGetPlanners = useCallback((idToken, localId, identifier) => dispatch(action.plannerGetPlanners(idToken, localId, identifier)), [dispatch]);
    
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

            <div className='u-margin-bottom-small'>
                <Filter />
            </div>

            {/* The List Component */}
            <div>
                <List accessRequests={accessRequests} displayName={displayName} />
            </div>
        </div>
    )
}

export default AccessRequests;