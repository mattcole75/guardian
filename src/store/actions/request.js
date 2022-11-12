import axios from '../../shared/axios';
import * as type from './types';
// import { apikey } from '../../configuration/config';

const requestStart = () => {
    return {
        type: type.REQUEST_START
    };
}

const createRequestSuccess = (id, request, identifier) => {
    return {
        type: type.REQUEST_CREATE_SUCCESS,
        id: id,
        request: request,
        identifier: identifier
    };
}

const updateRequestSuccess = (id, request, identifier) => {
    return {
        type: type.REQUEST_UPDATE_SUCCESS,
        id: id,
        request: request,
        identifier: identifier
    };
}

const getRequestsSuccess = (requests, identifier) => {
    return {
        type: type.REQUESTS_GET_SUCCESS,
        requests: requests,
        identifier: identifier
    };
}

const getRquestSuccess = (request, identifier) => {
    return {
        type: type.REQUEST_GET_SUCCESS,
        request: request,
        identifier: identifier
    };
}

const getPlannersSuccess = (planners, identifier) => {
    return {
        type: type.REQUESTS_PLANNERS_GET_SUCCESS,
        planners: planners,
        identifier: identifier
    };
}

const updateSelectedLocationLimitIndex = (index, identifier) => {
    return {
        type: type.REQUEST_LOCATION_LIMIT_INDEX,
        locationLimitIndex: index,
        identifier: identifier
    };
}

const requestFinish = () => {
    return {
        type: type.REQUEST_FINISH
    };
}

const requestFail = (error) => {
    return {
        type: type.REQUEST_FAIL,
        error: error
    };
}

const requestStateReset = () => {
    return {
        type: type.REQUEST_STATE_RESET
    };
}

export const createRequest = (idToken, localId, data, identifier) => {

    return dispatch => {

        dispatch(requestStart());

        axios.post('/request', data, {
            headers: {
                idToken: idToken,
                localId: localId
            }
        })
        .then(res => {
            dispatch(createRequestSuccess(res.data.result.id, data, identifier));   
        })
        .then(() => {
            dispatch(requestFinish());
        })
        .catch(err => {
            dispatch(requestFail(err.message));
        });
    };
}

export const updateRequest = (id, idToken, localId, data, identifier) => {
    
    return dispatch => {
        
        dispatch(requestStart());

        axios.patch('/request', data, {
            headers: {
                idToken: idToken,
                localId: localId,
                param: id
            }
        })
        .then(res => {
            dispatch(updateRequestSuccess(id, data, identifier));
        })
        .then(() => {
            dispatch(requestFinish());
        })
        .catch(err => {
            dispatch(requestFail(err.message)); 
        });
    };
}

export const getRequests = (idToken, localId, startDate, endDate, statusFilter, plannerFilter, roles, identifier) => {

    return dispatch => {

        let url = '/requests';
        let headers = { headers: {
            idToken: idToken,
            localId: localId,
            startDate: startDate,
            endDate: endDate,
            statusFilter: statusFilter,
            plannerFilter: plannerFilter
        }};

        if(roles.includes('coordinator'))
            url = '/coordinatorrequests'
        
        if(roles.includes('planner'))
            url = '/plannerrequests'

        dispatch(requestStart());

        axios.get(url, headers)
        .then(res => {
            dispatch(getRequestsSuccess(res.data.result, identifier));
        })
        .then(() => {
            dispatch(requestFinish());
        })
        .catch(err => {
            dispatch(requestFail(err.message));
        });
    };
}

export const getRequest = (idToken, localId, uid, identifier) => {
    
    return dispatch => {

        dispatch(requestStart());

        axios.get('/request', { 
            headers: {
                idToken: idToken,
                localId: localId,
                uid: uid
            }
        })
        .then(res => {
            dispatch(getRquestSuccess(res.data.result, identifier))
        })
        .then(() => {
            dispatch(requestFinish());
        })
        .catch(err => {
            dispatch(requestFail(err.message));
        })
    };
}

export const selectLocationLimit = (elementIndex, identifier) => {

    return dispatch => {
        dispatch(updateSelectedLocationLimitIndex(elementIndex, identifier));
    };
}

export const getPlanners = (idToken, localId, identifier) => {

    return dispatch => {

        dispatch(requestStart());

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
            dispatch(requestFinish());
        })
        .catch(err => {
            dispatch(requestFail(err.message));
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
        dispatch(requestStateReset());
    };
};