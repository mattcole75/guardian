import React, { useEffect, useCallback } from "react";
import RequestItem from './requestItem';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';

const Applications = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const requests = useSelector(state => state.requests.requests);
    const idToken = useSelector(state => state.auth.idToken);
    const onGetRequests = useCallback((identifier) => dispatch(action.getRequests(idToken, identifier)), [dispatch, idToken]);
    const onSelectRequestItem = useCallback((request, identifier) => dispatch(action.selectRequestItem(request, identifier)), [dispatch]);

    useEffect(() => {
        onGetRequests('GET_REQUESTS');

    }, [onGetRequests]);

    const navigateToRequestItem = () => {
        history.push('/request');
    }

    const editRequestItem = (item) => {
        onSelectRequestItem(item, 'UPDATE_SELECTED_ITEM');
        navigateToRequestItem();
    }

    return (
        <div className="container">
            <div className="p-3 form-floating">
                <div className="btn-group float-start" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={navigateToRequestItem}>New Access Request</button>
                </div>
            </div>
            <hr className="my-5" />
            <div className="row">
                <div className="row mb-2">
                    {requests && requests.map((item, index) => (
                        <RequestItem key={index} item={item} select={editRequestItem}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Applications;