import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';
import { Navigate } from 'react-router-dom';

import AccessDetails from './accessRequest/accessRequest';
import LocationLimitForm from './accessRequest/locationLimits/locationLimitForm';
import RiskAssessmentForm from './accessRequest/riskAssessments/riskAssessmentForm';
import MethodStatementForm from './accessRequest/methodStatements/methodStatementForm';
import ReviewForm from './accessRequest/review/reviewForm';
import ReviewResponseForm from './accessRequest/review/reviewResponseForm';
import moment from 'moment';

import LocationLimits from './accessRequest/locationLimits/locationLimits';
import RiskAssessments from './accessRequest/riskAssessments/riskAssessments';
import MethodStatements from './accessRequest/methodStatements/methodStatements';
import ReviewItems from './accessRequest/review/reviews';

import Modal from '../ui/modal/modal';
import Backdrop from '../ui/backdrop/backdrop';
import Spinner from '../ui/spinner/spinner';

const Request = () => {

    const dispatch = useDispatch();

    const [editLocationLimit, setEditLocationLimit] = useState(false);
    const [editRiskAssessment, setEditRiskAssessment] = useState(false);
    const [editMethodStatement, setEditMethodStatement] = useState(false);
    const [editReview, setEditReview] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const [editable, setEditable] = useState(true);

    const loading = useSelector(state => state.requests.loading);
    const error = useSelector(state => state.requests.error);
    // const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const idToken = useSelector(state => state.auth.idToken);
    const request = useSelector(state => state.requests.request);
    const locationLimitIndex = useSelector(state => state.requests.locationLimitIndex);
    const riskAssessmentIndex = useSelector(state => state.requests.riskAssessmentIndex);
    const methodStatementIndex = useSelector(state => state.requests.methodStatementIndex);
    const reviewIndex = useSelector(state => state.requests.reviewIndex);
    // const identifier = useSelector(state => state.auth.identifier);
    // const requestRedirectPath = useSelector(state => state.requests.requestRedirectPath);

    const onCreate = useCallback((data, identifier) => dispatch(action.createRequest(data, idToken, identifier)), [dispatch, idToken]);
    const onUpdate = useCallback((id, data, identifier) => dispatch(action.updateRequest(id, data, idToken, identifier)), [dispatch, idToken]);
    const onLocationLimitItemSelect = useCallback((index, identifier) => dispatch(action.selectLocationLimit(index, identifier)), [dispatch]);
    const onRiskAssessmentItemSelect = useCallback((index, identifier) => dispatch(action.selectRiskAssessmemt (index, identifier)), [dispatch]);
    const onMethodStatementItemSelect = useCallback((index, identifier) => dispatch(action.selectMthodStatement (index, identifier)), [dispatch]);
    const onReviewItemSelect = useCallback((index, identifier) => dispatch(action.selectReview (index, identifier)), [dispatch]);


    useEffect(() => {
        if(request) {
            if(request.requestStatus === 'Submitted for approval' || request.requestStatus === 'Approved')
                setEditable(false);
            else
                setEditable(true);
        }
    }, [request]);

    const saveHandler = useCallback((data) => {
        if(request)
            onUpdate(
                request.id,
                {
                    ...data,
                    // requestStatus: 'Draft',
                    updated: moment().format()
                },
                'UPDATE_REQUEST'
            );
        else
            onCreate(
                {
                    ...data,
                    requestStatus: 'Draft',
                    created: moment().format(),
                    updated: moment().format()
                },
                'CREATE_REQUEST'
            );
    }, [onCreate, onUpdate, request]);

    const submitRequestHandler = useCallback((status) => {
        if(request) {
            onUpdate(
                request.id,
                {
                    requestStatus: status,
                    updated: moment().format()
                },
                'UPDATE_REQUEST_STATUS'

            );
            setRedirect(<Navigate to="/requests" />);
        }
    }, [request, onUpdate]);

    const locationLimitSelectHandler = useCallback((index) => {
        onLocationLimitItemSelect(index, 'LOCATION_ITEM_SELECT');
    }, [onLocationLimitItemSelect]);

    const riskAssessmentSelectHandler = useCallback((index) => {
        onRiskAssessmentItemSelect(index, 'RISK_ITEM_SELECT');
    }, [onRiskAssessmentItemSelect]);

    const methodStatementSelectHandler = useCallback((index) => {
        onMethodStatementItemSelect(index, 'METHOD_ITEM_SELECT');
    }, [onMethodStatementItemSelect]);

    const reviewSelectHandler = useCallback((index) => {
        onReviewItemSelect(index, 'REVIEW_ITEM_SELECT');
    }, [onReviewItemSelect]);

    const toggleLocationLimitEdit = () => {
        if(editLocationLimit)
            locationLimitSelectHandler(null);
        
        setEditLocationLimit(prevState => !prevState)
    };
    
    const toggleRiskAssessmentEdit = () => {
        if(editRiskAssessment)
            riskAssessmentSelectHandler(null);

        setEditRiskAssessment(prevState => !prevState)
    };

    const toggleMethodStatementEdit = () => {
        if(editMethodStatement)
            methodStatementSelectHandler(null);

        setEditMethodStatement(prevState => !prevState)
    };

    const toggleReviewEdit = () => {
        if(editReview)
            reviewSelectHandler(null);

        setEditReview(prevState => !prevState)
    };

    let spinner = null;
    if(loading)
        spinner = <Spinner />;
    
    let modal = null;
    if(editLocationLimit) {
        modal = <Modal 
            show={editLocationLimit} 
            modalClosed={toggleLocationLimitEdit} 
            content={
                <LocationLimitForm 
                    toggle={toggleLocationLimitEdit}
                    save={saveHandler} 
                    request={request}
                    index={locationLimitIndex}
                    editable={editable}
                />
            }/>
    }
    if(editRiskAssessment) {
        modal = <Modal 
            show={editRiskAssessment} 
            modalClosed={toggleRiskAssessmentEdit} 
            content={
                <RiskAssessmentForm 
                    toggle={toggleRiskAssessmentEdit}
                    save={saveHandler} 
                    request={request}
                    index={riskAssessmentIndex}
                    editable={editable}
                />
            }/>
    }
    if(editMethodStatement) {
        modal = <Modal 
            show={editMethodStatement} 
            modalClosed={toggleMethodStatementEdit} 
            content={
                <MethodStatementForm 
                    toggle={toggleMethodStatementEdit}
                    save={saveHandler} 
                    request={request}
                    index={methodStatementIndex}
                    editable={editable}
                />
            }/>
    }

    if(editReview && (request && request.requestStatus === 'Submitted for approval')) {
        modal = <Modal 
            show={editReview} 
            modalClosed={toggleReviewEdit} 
            content={
                <ReviewForm 
                    toggle={toggleReviewEdit}
                    save={saveHandler} 
                    request={request}
                    index={reviewIndex}
                />
            }/>
    } else if (editReview && (request && request.requestStatus !== 'Submitted for approval')) {
        modal = <Modal 
            show={editReview} 
            modalClosed={toggleReviewEdit} 
            content={
                <ReviewResponseForm 
                    toggle={toggleReviewEdit}
                    save={saveHandler} 
                    request={request}
                    index={reviewIndex}
                />
            }/>
    }

    return (
        <div className="form-request my-5">
            {redirect}
            <Backdrop show={loading} />
                {spinner}
            
            {error &&
                <div className="alert alert-danger" role="alert">
                    {error.message}
                </div>
            }
            {modal}
            <div className="was-validated">
                <div className="text-sm-center">
                    <i className="bi-plus-circle-dotted form-auth-icon"></i>
                    <h1 className="h3 mb-3 fw-normal">Access Request</h1>
                </div>
                
                <div className="form-floating mb-3">
                    <AccessDetails save={saveHandler} editable={editable} />
                    <LocationLimits save={saveHandler} editable={editable} toggle={toggleLocationLimitEdit} select={locationLimitSelectHandler} />
                    <RiskAssessments save={saveHandler} editable={editable} toggle={toggleRiskAssessmentEdit} select={riskAssessmentSelectHandler} />
                    <MethodStatements save={saveHandler} editable={editable} toggle={toggleMethodStatementEdit} select={methodStatementSelectHandler} />
                    <ReviewItems save={saveHandler} toggle={toggleReviewEdit} select={reviewSelectHandler} />
                        
                </div>
                {editable
                    ? <button className="w-100 btn btn-lg btn-primary" type="button" disabled={false} onClick={() => {submitRequestHandler('Submitted for approval')}}>Submit for approval</button>
                    :<div>
                        {request && request.requestStatus !== 'Approved'
                            ? <button className="w-100 btn btn-lg btn-primary mb-3" type="button" disabled={false} onClick={() => {submitRequestHandler('Approved')}}>Approve and lock</button>
                            : null
                        }
                         <button className="w-100 btn btn-lg btn-danger" type="button" disabled={false} onClick={() => {submitRequestHandler('Rejected')}}>Reject (return access request)</button>
                    </div>
                }   
                
            </div>
        </div>
    )
}

export default Request;