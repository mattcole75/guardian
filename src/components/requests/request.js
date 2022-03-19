import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';
// import { Redirect } from 'react-router-dom';

import AccessDetails from './accessRequest/accessRequest';


import LocationLimits from './accessRequest/locationLimits/locationLimits';
import RiskAssessments from './accessRequest/riskAssessments/riskAssessments';
import MethodStatements from './accessRequest/methodStatements/methodStatements';

import Backdrop from '../ui/backdrop/backdrop';
import Spinner from '../ui/spinner/spinner';

const Request = () => {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.requests.loading);
    const error = useSelector(state => state.requests.error);
    // const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const idToken = useSelector(state => state.auth.idToken);
    const request = useSelector(state => state.requests.request);
    // const identifier = useSelector(state => state.auth.identifier);
    // const requestRedirectPath = useSelector(state => state.requests.requestRedirectPath);

    const onCreate = useCallback((data, identifier) => dispatch(action.createRequest(data, idToken, identifier)), [dispatch, idToken]);
    const onUpdate = useCallback((data, identifier) => dispatch(action.updateRequest(data, idToken, identifier)), [dispatch, idToken]);

    const saveHandler = useCallback((data) => {
        if(request)
            onUpdate({...data, id: request.id}, 'UPDATE_REQUEST');
        else
            onCreate(data, 'CREATE_REQUEST');
    }, [onCreate, onUpdate, request]);

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    return (
        <div className="form-request my-5">
            <Backdrop show={loading} />
                {spinner}
            
            {error &&
                <div className="alert alert-danger" role="alert">
                    {error.message}
                </div>
            }
            <div className="was-validated">
                <div className="text-sm-center">
                    <i className="bi-plus-circle-dotted form-auth-icon"></i>
                    <h1 className="h3 mb-3 fw-normal">Access Request</h1>
                </div>
                
                <div className="form-floating mb-3">
                    <AccessDetails save={saveHandler} />
                    <LocationLimits save={saveHandler} />
                    <RiskAssessments save={saveHandler} />
                    <MethodStatements save={saveHandler} />
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="button" disabled={false}>Submit for approval</button>
            </div>
        </div>
    )
}

export default Request;