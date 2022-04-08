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

const updateSelectedRiskAssessmentIndex = (index, identifier) => {
    return {
        type: type.REQUEST_RISK_ASSESSMENT_INDEX,
        riskAssessmentIndex: index,
        identifier: identifier
    };
}

const updateSelectedMethodStatementIndex = (index, identifier) => {
    return {
        type: type.REQUEST_METHOD_STATEMENT_INDEX,
        methodStatementIndex: index,
        identifier: identifier
    };
}

const updateSelectedReviewIndex = (index, identifier) => {
    return {
        type: type.REQUEST_REVIEW_INDEX,
        reviewIndex: index,
        identifier: identifier
    }
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

export const createRequest = (data, idToken, identifier) => {

    return dispatch => {

        dispatch(requestStart());

        axios.post('/requests.json?auth=' + idToken, data)
        .then(response => {
            dispatch(createRequestSuccess(response.data.name, data,identifier));
            dispatch(requestFinish());
        })
        .catch(error => {
            console.log(error);
            dispatch(requestFail(error));
        })
    };
}

export const updateRequest = (id, data, idToken, identifier) => {
    
    return dispatch => {

        dispatch(requestStart());

        axios.patch('/requests/' + id + '.json?auth=' + idToken, data)
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

export const getRequests = (idToken, identifier) => {

    return dispatch => {

        dispatch(requestStart());

        axios.get('/requests.json?auth=' + idToken)
        .then(response => {
            dispatch(getRequestsSuccess(response.data, identifier));
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

export const selectRiskAssessmemt = (elementIndex, identifier) => {
    return dispatch => {
        dispatch(requestStart());
        dispatch(updateSelectedRiskAssessmentIndex(elementIndex, identifier));
        dispatch(requestFinish());
    };
}

export const selectMthodStatement = (elementIndex, identifier) => {
    return dispatch => {
        dispatch(requestStart());
        dispatch(updateSelectedMethodStatementIndex(elementIndex, identifier));
        dispatch(requestFinish());
    };
}

export const selectReview = (elementIndex, identifier) => {
    return dispatch => {
        dispatch(requestStart());
        dispatch(updateSelectedReviewIndex(elementIndex, identifier));
        dispatch(requestFinish());
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