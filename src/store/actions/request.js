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
const getPlannersSuccess = (planners, identifier) => {
    return {
        type: type.REQUESTS_PLANNERS_GET_SUCCESS,
        planners: planners,
        identifier: identifier
    };
}

const updateSelectedRequest = (request, identifier) => {
    return {
        type: type.REQUEST_UPDATE_SELECTED,
        request: request,
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
        .then(response => {

            dispatch(createRequestSuccess(response.data.result.id, data, identifier));
            dispatch(requestFinish());
        })
        .catch(error => {
            console.log(error);
            dispatch(requestFail(error));
        })
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
        .then(response => {
            dispatch(updateRequestSuccess(id, data, identifier));
            dispatch(requestFinish());
        })
        .catch(error => {
            console.log(error);
            dispatch(requestFail(error)); 
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
        .then(response => {
            dispatch(getRequestsSuccess(response.data.result, identifier));
            dispatch(requestFinish());
        })
        .catch(error => {
            console.log(error);
            dispatch(requestFail(error));
        });
    };
}

export const selectRequestItem = (request, identifier) => {

    return dispatch => {
        dispatch(requestStart());
        dispatch(updateSelectedRequest(request, identifier));
        dispatch(requestFinish());
    };
}

export const selectLocationLimit = (elementIndex, identifier) => {

    return dispatch => {
        dispatch(requestStart());
        dispatch(updateSelectedLocationLimitIndex(elementIndex, identifier));
        dispatch(requestFinish());
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
            dispatch(requestFinish());
        })
        .catch(error => {
            dispatch(requestFail(error));
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