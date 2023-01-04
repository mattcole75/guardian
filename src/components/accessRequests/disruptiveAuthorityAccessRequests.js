import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';

import Backdrop from "../ui/backdrop/backdrop";
import Spinner from "../ui/spinner/spinner";

// import Filter from "./filter/filter";
import DisruptiveAuthorityList from "./lists/disruptiveAuthorityList/disruptiveAuthorityList";


const DisruptiveAuthorityAccessRequests = () => {

    const dispatch = useDispatch();
    
    const loading = useSelector(state => state.disruptive.loading);
    const error = useSelector(state => state.disruptive.error);

    const disruptives = useSelector(state => state.disruptive.disruptives);

    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);

    const onGetDisruptives = useCallback((idToken, localId, identifier) => dispatch(action.getDisruptiveReviewList(idToken, localId, identifier)), [dispatch]);

    // a side effect to query the database and return to state a list of requests
    useEffect(() => {
        onGetDisruptives(idToken, localId, null, null, '', '', 'GET_DISRUPTIVES');
    },[idToken, localId, onGetDisruptives]);

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

            {/* The List Component */}
            <div className="row">
                <DisruptiveAuthorityList disruptives={disruptives ? disruptives : []} />
            </div>
        </div>
    )
}

export default DisruptiveAuthorityAccessRequests;