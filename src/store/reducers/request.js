import * as type from '../actions/types';
import { updateObject } from '../../shared/utility';
import Request from '../../model/AccessRequestItem';

const initialState = {
    loading: false,
    error: null,
    requests: [],
    request: null,
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
        action.request.accessRequestIsDisruptive,
        action.request.accessRequestTitle,
        action.request.accessRequestDescription,
        action.request.accessRequestCompetentPerson,
        action.request.accessRequestSiteContactPhone,
        'Draft'
    );
    return {
        ...state,
        loading: false,
        error: null,
        requests: state.requests.concat(newRequest),
        request: newRequest,
        identifier: action.identifier
    };
}

const requestUpdateSuccess = (state, action) => {
    const requestIndex = state.requests.findIndex(req => req.id === action.id);

    const updatedRequest = new Request(
        action.id,
        action.request.requestorName,
        action.request.requestorPhone,
        action.request.requestorEmail,
        action.request.requestorOrganisation,
        action.request.projectTitle,
        action.request.projectOrganisation,
        action.request.projectChangeRequestID,
        action.request.accessRequestIsDisruptive,
        action.request.accessRequestTitle,
        action.request.accessRequestDescription,
        action.request.accessRequestCompetentPerson,
        action.request.accessRequestSiteContactPhone,
        'Draft'
    );
    const updatedRequests = [...state.requests];
    updatedRequests[requestIndex] = updatedRequest;
    return {
        ...state,
        loading: false,
        error: null,
        requests: updatedRequests,
        request: updatedRequest,
        identifier: action.identifier
    };
}

const requestDeleteSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        requests: state.requests.filter(req => req.id === action.id),
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