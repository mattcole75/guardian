import axios from '../../shared/axios';
import * as type from './types';

const accessRequestStart = () => {
    return {
        type: type.ACCESS_REQUEST_START
    };
}

const userCreateAccessRequestSuccess = (id, accessRequest, identifier) => {
    return {
        type: type.USER_CREATE_ACCESS_REQUEST_SUCCESS,
        id: id,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const userUpdateAccessRequestSuccess = (id, accessRequest, identifier) => {
    return {
        type: type.USER_UPDATE_ACCESS_REQUEST_SUCCESS,
        id: id,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const userGetAccessRequestsSuccess = (accessRequests, identifier) => {
    return {
        type: type.USER_GET_ACCESS_REQUESTS_SUCCESS,
        accessRequests: accessRequests,
        identifier: identifier
    };
}

const plannerGetAccessRequestsSuccess = (accessRequests, identifier) => {
    return {
        type: type.PLANNER_GET_ACCESS_REQUESTS_SUCCESS,
        accessRequests: accessRequests,
        identifier: identifier
    }
}

const userGetAccessRquestSuccess = (accessRequest, identifier) => {
    return {
        type: type.USER_GET_ACCESS_REQUEST_SUCCESS,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const getPlannersSuccess = (planners, identifier) => {
    return {
        type: type.ACCESS_REQUEST_PLANNER_GET_PLANNERS_SUCCESS,
        planners: planners,
        identifier: identifier
    };
}

const accessRequestFinish = () => {
    return {
        type: type.ACCESS_REQUEST_FINISH
    };
}

const accessRequestFail = (error) => {
    return {
        type: type.ACCESS_REQUEST_FAIL,
        error: error
    };
}

const accessRequestStateReset = () => {
    return {
        type: type.ACCESS_REQUEST_STATE_RESET
    };
}

export const userCreateAccessRequest = (idToken, localId, data, identifier) => {

    return dispatch => {

        dispatch(accessRequestStart());

        axios.post('/accessrequest', data, {
            headers: {
                idToken: idToken,
                localId: localId
            }
        })
        .then(res => {
            dispatch(userCreateAccessRequestSuccess(res.data.result.id, data, identifier));   
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const userUpdateAccessRequest = (id, idToken, localId, data, identifier) => {
    
    return dispatch => {
        
        dispatch(accessRequestStart());

        axios.patch('/accessrequest', data, {
            headers: {
                idToken: idToken,
                localId: localId,
                param: id
            }
        })
        .then(() => {
            dispatch(userUpdateAccessRequestSuccess(id, data, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const userGetAccessRequests = (idToken, localId, startDate, endDate, identifier) => {

    return dispatch => {
        
        let headers = { headers: {
            idToken: idToken,
            localId: localId,
            startDate: startDate,
            endDate: endDate
        }};

        dispatch(accessRequestStart());

        axios.get('/accessrequests', headers)
        .then(res => {
            dispatch(userGetAccessRequestsSuccess(res.data.result, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const plannerGetAccessRequests = (idToken, localId, startDate, endDate, identifier) => {

    return dispatch => {
        
        let headers = { headers: {
            idToken: idToken,
            localId: localId,
            startDate: startDate,
            endDate: endDate
        }};

        dispatch(accessRequestStart());

        axios.get('/planneraccessrequests', headers)
        .then(res => {
            dispatch(plannerGetAccessRequestsSuccess(res.data.result, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const userGetAccessRequest = (idToken, localId, uid, identifier) => {
    
    return dispatch => {

        dispatch(accessRequestStart());

        axios.get('/accessrequest', { 
            headers: {
                idToken: idToken,
                localId: localId,
                uid: uid
            }
        })
        .then(res => {
            dispatch(userGetAccessRquestSuccess(res.data.result, identifier))
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        })
    };
}

export const plannerGetPlanners = (idToken, localId, identifier) => {

    return dispatch => {

        dispatch(accessRequestStart());

        axios.get('/planners', {
            headers: {
                idToken: idToken,
                localId: localId
            }
        })
        .then(response => {
            dispatch(getPlannersSuccess(response.data.planners, identifier));
            
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const accessRequestResetState = () => {
    return dispatch => {
        dispatch(accessRequestStateReset());
    };
};