import axios from '../../shared/axios';
import * as type from './types';

const accessRequestStart = () => {
    return {
        type: type.ACCESS_REQUEST_START
    };
}

const createAccessRequestSuccess = (id, accessRequest, identifier) => {
    return {
        type: type.ACCESS_REQUEST_CREATE_SUCCESS,
        id: id,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const updateAccessRequestSuccess = (id, accessRequest, identifier) => {
    return {
        type: type.ACCESS_REQUEST_UPDATE_SUCCESS,
        id: id,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const getAccessRequestsSuccess = (accessRequests, identifier) => {
    return {
        type: type.ACCESS_REQUESTS_GET_SUCCESS,
        accessRequests: accessRequests,
        identifier: identifier
    };
}

const getAccessRquestSuccess = (accessRequest, identifier) => {
    return {
        type: type.ACCESS_REQUEST_GET_SUCCESS,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const getPlannersSuccess = (planners, identifier) => {
    return {
        type: type.ACCESS_REQUESTS_PLANNERS_GET_SUCCESS,
        planners: planners,
        identifier: identifier
    };
}

const updateSelectedLocationIndex = (index, identifier) => {
    return {
        type: type.ACCESS_REQUEST_LOCATION_INDEX,
        locationIndex: index,
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
            dispatch(createAccessRequestSuccess(res.data.result.id, data, identifier));   
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
            dispatch(updateAccessRequestSuccess(id, data, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message)); 
        });
    };
}

export const userGetAccessRequests = (idToken, localId, startDate, endDate, statusFilter, planner, identifier) => {

    return dispatch => {
        
        let headers = { headers: {
            idToken: idToken,
            localId: localId,
            startDate: startDate,
            endDate: endDate,
            statusFilter: statusFilter,
            plannerFilter: planner
        }};

        dispatch(accessRequestStart());

        axios.get('/accessrequests', headers)
        .then(res => {
            dispatch(getAccessRequestsSuccess(res.data.result, identifier));
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
            dispatch(getAccessRquestSuccess(res.data.result, identifier))
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        })
    };
}

export const selectLocation = (elementIndex, identifier) => {

    return dispatch => {
        dispatch(updateSelectedLocationIndex(elementIndex, identifier));
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

// export const deleteRequest = (id, idToken, identifier) => {
//     return dispatch => {
//         dispatch(requestStart);

//         axios.delete('requests' + idToken, id)
//         .then(res => {

//             dispatch(requestSuccess(
//                 res.data.idToken,
//                 res.data.localId,
//                 res.data.email,
//                 res.data.displayName,
//                 identifier
//             ));

//             dispatch(requestFinish());
//         })
//         .catch(err => {
//             console.log(err);
//             dispatch(requestFail(err)); 
//         });
//     };
// }

export const resetState = () => {
    return dispatch => {
        dispatch(accessRequestStateReset());
    };
};