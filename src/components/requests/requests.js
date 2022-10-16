import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';

import Backdrop from "../ui/backdrop/backdrop";
import Spinner from "../ui/spinner/spinner";

import Filter from "./filter/filter";
import List from "./list/list";


const Requests = () => {

    const dispatch = useDispatch();
    
    const loading = useSelector(state => state.requests.loading);
    const error = useSelector(state => state.requests.error);
    const requests = useSelector(state => state.requests.requests);
    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const roles = useSelector(state => state.auth.roles);

    const onGetPlanners = useCallback((idToken, localId, identifier) => dispatch(action.getPlanners(idToken, localId, identifier)), [dispatch]);
    
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
            <Filter />

            {/* The List Component */}
            <div className="row">
                <List requests={requests} />
            </div>
        </div>
    )
}

export default Requests;