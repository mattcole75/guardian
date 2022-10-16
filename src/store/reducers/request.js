import * as type from '../actions/types';

const initialState = {
    loading: false,
    error: null,
    requests: [],
    request: null,
    planners: [],
    locationLimitIndex: null,
    reviewIndex: null,
    identifier: null,
    requestRedirectPath: '/'
};

const requestStart = (state) => {
    return { ...state, 
        error: null,
        loading: true
    };
};

const requestCreateSuccess = (state, action) => {

    const newRequest = { [action.id]: action.request };

    return {
        ...state,
        loading: false,
        error: null,
        requests: state.requests.concat(newRequest),
        request: newRequest,
        locationLimitIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestUpdateSuccess = (state, action) => {

    let updatedRequest = null;
    let updatedRequests = [];

    // check that there are requestes currently held in state.  
    // if the user has refreshed the request page using the browser there will be no requests in state  
    if(state.requests.length > 0) {
        const requestIndex = state.requests.findIndex(req => req.hasOwnProperty(action.id));
        updatedRequest = { [action.id]: { ...state.requests[requestIndex][action.id], ...action.request } };
        updatedRequests = [ ...state.requests ];
        updatedRequests[requestIndex] = updatedRequest;
    } else {
        updatedRequest = { [action.id]: { ...action.request } };
    }

    return {
        ...state,
        loading: false,
        error: null,
        requests: updatedRequests,
        request: updatedRequest,
        locationLimitIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestsGetSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        requests: action.requests,
        request: null,
        locationLimitIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestGetSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        request: action.request,
        locationLimitIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestsPlannersGetSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        planners: action.planners,
        identifier: action.identifier
    };
}

const requestLocationLimitIndex = (state, action) => {
    return {
        ...state,
        error: null,
        locationLimitIndex: action.locationLimitIndex,
        reviewIndex: null,
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
        reviewIndex: null,
        identifier: action.identifier
    };
}

const requestFinish = (state) => {
    return { ...state, identifier: null };
};

const requestFail = (state, action) => {
    return { ...state,
        loading: false,
        error: action.error
    };
}

const requestStateReset = (state) => {
    return { ...state, ...initialState };
};

const requestErrorReset = (state) => {
    return { ...state, error: null };
}

const requestRedirectPath = (state, action) => {
    return { ...state, authRedirectPath: action.authRedirectPath };
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case type.REQUEST_START: return requestStart(state);
        case type.REQUEST_CREATE_SUCCESS: return requestCreateSuccess(state, action);
        case type.REQUEST_UPDATE_SUCCESS: return requestUpdateSuccess(state, action);
        case type.REQUESTS_GET_SUCCESS: return requestsGetSuccess(state, action);
        case type.REQUEST_GET_SUCCESS: return requestGetSuccess(state, action);
        case type.REQUESTS_PLANNERS_GET_SUCCESS: return requestsPlannersGetSuccess(state, action);
        case type.REQUEST_LOCATION_LIMIT_INDEX: return requestLocationLimitIndex(state, action);
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