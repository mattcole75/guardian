import * as type from '../actions/types';
import { updateObject } from '../../shared/utility';
import Request from '../../model/AccessRequestItem';

const initialState = {
    loading: false,
    error: null,
    requests: [],
    request: null,
    locationLimitIndex: null,
    riskAssessmentIndex: null,
    methodStatementIndex: null,
    reviewIndex: null,
    identifier: null,
    requestRedirectPath: '/'
};

const requestStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    });
};

const requestCreateSuccess = (state, action) => {
    const newRequest = new Request(
        action.id,
        action.request.requestorName,
        action.request.requestorPhone,
        action.request.requestorEmail,
        action.request.requestorOrganisation,
        action.request.projectTitle,
        action.request.projectOrganisation,
        action.request.projectChangeRequestID,
        action.request.accessTypeDisruptive,
        action.request.accessRequestTitle,
        action.request.accessRequestDescription,
        action.request.accessRequestCompetentPerson,
        action.request.accessRequestSiteContactPhone,
        action.request.locationLimitItems || [],
        action.request.riskAssessmentItems || [],
        action.request.methodStatementItems || [],
        action.request.reviewItems || [],
        action.request.requestStatus,
        action.request.created,
        action.request.updated
    );
    return {
        ...state,
        loading: false,
        error: null,
        requests: state.requests.concat(newRequest),
        request: newRequest,
        locationLimitIndex: null,
        riskAssessmentIndex: null,
        methodStatementIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestUpdateSuccess = (state, action) => {

    const requestIndex = state.requests.findIndex(req => req.id === action.id);
    const updatedRequest = new Request(
        action.id,
        action.request.requestorName || state.request.requestorName,
        action.request.requestorPhone || state.request.requestorPhone,
        action.request.requestorEmail || state.request.requestorEmail,
        action.request.requestorOrganisation || state.request.requestorOrganisation,
        action.request.projectTitle || state.request.projectTitle,
        action.request.projectOrganisation || state.request.projectOrganisation,
        action.request.projectChangeRequestID || state.request.projectChangeRequestID,
        action.request.accessTypeDisruptive || state.request.accessTypeDisruptive,
        action.request.accessRequestTitle || state.request.accessRequestTitle,
        action.request.accessRequestDescription || state.request.accessRequestDescription,
        action.request.accessRequestCompetentPerson || state.request.accessRequestCompetentPerson,
        action.request.accessRequestSiteContactPhone || state.request.accessRequestSiteContactPhone,
        action.request.locationLimitItems || state.request.locationLimitItems || [],
        action.request.riskAssessmentItems || state.request.riskAssessmentItems || [],
        action.request.methodStatementItems || state.request.methodStatementItems || [],
        action.request.reviewItems || state.request.reviewItems || [],
        action.request.requestStatus || state.request.requestStatus,
        action.request.created || state.request.created,
        action.request.updated || state.request.updated
    );
    const updatedRequests = [...state.requests];
    updatedRequests[requestIndex] = updatedRequest;
    return {
        ...state,
        loading: false,
        error: null,
        requests: updatedRequests,
        request: updatedRequest,
        locationLimitIndex: null,
        riskAssessmentIndex: null,
        methodStatementIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestsGetSuccess = (state, action) => {
    let newRequests = [];
    for (const key in action.requests) {
        newRequests.push(new Request(
                key,
                action.requests[key].requestorName,
                action.requests[key].requestorPhone,
                action.requests[key].requestorEmail,
                action.requests[key].requestorOrganisation,
                action.requests[key].projectTitle,
                action.requests[key].projectOrganisation,
                action.requests[key].projectChangeRequestID,
                action.requests[key].accessTypeDisruptive,
                action.requests[key].accessRequestTitle,
                action.requests[key].accessRequestDescription,
                action.requests[key].accessRequestCompetentPerson,
                action.requests[key].accessRequestSiteContactPhone,
                action.requests[key].locationLimitItems || [],
                action.requests[key].riskAssessmentItems || [],
                action.requests[key].methodStatementItems || [],
                action.requests[key].reviewItems || [],
                action.requests[key].requestStatus,
                action.requests[key].created,
                action.requests[key].updated
            ));
    }
    return {
        ...state,
        loading: false,
        error: null,
        requests: newRequests,
        request: null,
        locationLimitIndex: null,
        riskAssessmentIndex: null,
        methodStatementIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestUpdateSelected = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        request: action.request,
        locationLimitIndex: null,
        riskAssessmentIndex: null,
        methodStatementIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestLocationLimitIndex = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        locationLimitIndex: action.locationLimitIndex,
        riskAssessmentIndex: null,
        methodStatementIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestRiskAssessmentIndex = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        locationLimitIndex: null,
        riskAssessmentIndex: action.riskAssessmentIndex,
        methodStatementIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestMethodStatementIndex = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        locationLimitIndex: null,
        riskAssessmentIndex: null,
        methodStatementIndex: action.methodStatementIndex,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestReviewIndex = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        locationLimitIndex: null,
        riskAssessmentIndex: null,
        methodStatementIndex: null,
        reviewIndex: action.reviewIndex,
        identifier: action.identifier
    };
}

const requestDeleteSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        requests: state.requests.filter(req => req.id === action.id),
        locationLimitIndex: null,
        riskAssessmentIndex: null,
        methodStatementIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestFinish = (state) => {
    return updateObject( state, {
        identifier: null
    });
};

const requestFail = (state, action) => {
    return updateObject( state, {
        loading: false,
        error: action.error
    });
}

const requestStateReset = (state) => {
    return updateObject( state, initialState);
};

const requestErrorReset = (state) => {
    return updateObject( state, {
        error: null
    });
}

const requestRedirectPath = (state, action) => {
    return updateObject( state, {
        authRedirectPath: action.authRedirectPath
    });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case type.REQUEST_START: return requestStart(state);
        case type.REQUEST_CREATE_SUCCESS: return requestCreateSuccess(state, action);
        case type.REQUEST_UPDATE_SUCCESS: return requestUpdateSuccess(state, action);
        case type.REQUESTS_GET_SUCCESS: return requestsGetSuccess(state, action);
        case type.REQUEST_UPDATE_SELECTED: return requestUpdateSelected(state, action);
        case type.REQUEST_LOCATION_LIMIT_INDEX: return requestLocationLimitIndex(state, action);
        case type.REQUEST_RISK_ASSESSMENT_INDEX: return requestRiskAssessmentIndex(state, action);
        case type.REQUEST_METHOD_STATEMENT_INDEX: return requestMethodStatementIndex(state, action);
        case type.REQUEST_REVIEW_INDEX: return requestReviewIndex(state, action);
        case type.REQUEST_DELETE_SUCCESS: return requestDeleteSuccess(state, action);
        case type.REQUEST_FINISH: return requestFinish(state);
        case type.REQUEST_FAIL: return requestFail(state, action);
        case type.REQUEST_STATE_RESET: return requestStateReset(state);
        case type.REQUEST_ERROR_RESET: return requestErrorReset(state);
        case type.REQUEST_REDIRECT_PATH: return requestRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;