import * as type from '../actions/types';

const initialState = {
    loading: false,
    error: null,
    accessRequests: [],
    accessRequest: null,
    planners: [],
    locationLimitIndex: null,
    reviewIndex: null,
    identifier: null,
    requestRedirectPath: '/'
};

const accessRequestStart = (state) => {
    return { ...state, 
        error: null,
        loading: true
    };
};

const accessRequestCreateSuccess = (state, action) => {

    const newAccessRequest = { [action.id]: action.accessRequest };

    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: state.accessRequests.concat(newAccessRequest),
        accessRequest: newAccessRequest,
        locationLimitIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };  
}

const accessRequestUpdateSuccess = (state, action) => {

    let updatedAccessRequest = null;
    let updatedAccessRequests = [];

    // check that there are requestes currently held in state.  
    // if the user has refreshed the request page using the browser there will be no requests in state  
    if(state.accessRequests.length > 0) {
        // find the element index in the array
        const accessRequestIndex = state.accessRequests.findIndex(req => req.hasOwnProperty(action.id));
        // check if this is a deletee
        if(action.accessRequest.inuse != null && action.accessRequest.inuse === false) {
            // null the accessRequest and remove the access request from the array
            updatedAccessRequest = null;
            updatedAccessRequests = state.accessRequests.filter(req => Object.keys(req)[0] !== action.id );
            // updatedAccessRequests = state.accessRequests.filter(req => req.id === action.id );
        } else if(action.accessRequest.status === 'Closed') {
            updatedAccessRequest = null;
            updatedAccessRequests = state.accessRequests.filter(req => Object.keys(req)[0] !== action.id );
        } else {
            updatedAccessRequest = { [action.id]: { ...state.accessRequests[accessRequestIndex][action.id], ...action.accessRequest } };

            updatedAccessRequests = [ ...state.accessRequests ];
            updatedAccessRequests[accessRequestIndex] = updatedAccessRequest;
        }
    } else {
        updatedAccessRequest = { [action.id]: { ...action.accessRequest } };
    }

    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: updatedAccessRequests,
        accessRequest: updatedAccessRequest,
        locationLimitIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const accessRequestsGetSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: action.accessRequests,
        accessRequest: null,
        locationLimitIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const accessRequestGetSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        accessRequest: action.accessRequest,
        locationLimitIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const accessRequestsPlannersGetSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        planners: action.planners,
        identifier: action.identifier
    };
}

const accessRequestLocationLimitIndex = (state, action) => {
    return {
        ...state,
        error: null,
        locationLimitIndex: action.locationLimitIndex,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const accessRequestDeleteSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: state.accessRequests.filter(req => req.id === action.id),
        locationLimitIndex: null,
        reviewIndex: null,
        identifier: action.identifier
    };
}

const accessRequestFinish = (state) => {
    return { ...state, identifier: null };
};

const accessRequestFail = (state, action) => {
    return { ...state,
        loading: false,
        error: action.error
    };
}

const accessRequestStateReset = (state) => {
    return { ...state, ...initialState };
};

const accessRequestErrorReset = (state) => {
    return { ...state, error: null };
}

const accessRequestRedirectPath = (state, action) => {
    return { ...state, authRedirectPath: action.authRedirectPath };
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case type.ACCESS_REQUEST_START: return accessRequestStart(state);
        case type.ACCESS_REQUEST_CREATE_SUCCESS: return accessRequestCreateSuccess(state, action);
        case type.ACCESS_REQUEST_UPDATE_SUCCESS: return accessRequestUpdateSuccess(state, action);
        case type.ACCESS_REQUESTS_GET_SUCCESS: return accessRequestsGetSuccess(state, action);
        case type.ACCESS_REQUEST_GET_SUCCESS: return accessRequestGetSuccess(state, action);
        case type.ACCESS_REQUESTS_PLANNERS_GET_SUCCESS: return accessRequestsPlannersGetSuccess(state, action);
        case type.ACCESS_REQUEST_LOCATION_LIMIT_INDEX: return accessRequestLocationLimitIndex(state, action);
        case type.ACCESS_REQUEST_DELETE_SUCCESS: return accessRequestDeleteSuccess(state, action);
        case type.ACCESS_REQUEST_FINISH: return accessRequestFinish(state);
        case type.ACCESS_REQUEST_FAIL: return accessRequestFail(state, action);
        case type.ACCESS_REQUEST_STATE_RESET: return accessRequestStateReset(state);
        case type.ACCESS_REQUEST_ERROR_RESET: return accessRequestErrorReset(state);
        case type.ACCESS_REQUEST_REDIRECT_PATH: return accessRequestRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;