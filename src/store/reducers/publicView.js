import * as type from '../actions/types';
const initialState = {
    loading: false,
    error: null,
    requests: [],
    identifier: null,
    redirectPath: '/'
};

const publicViewStart = (state) => {
    return { ...state,
        error: null,
        loading: true
    };
}

const publicViewSuccess = (state, action) => {
    let newPublicViewRequestItems = [];
    for(const key1 in action.requests) {
        let id = Object.keys(action.requests[key1]);
        for(const key2 in action.requests[key1][id].locationItems) {
            newPublicViewRequestItems.push({
                organisation: action.requests[key1][id].requestor.organisation,
                title: action.requests[key1][id].summary.title || null,
                startDate: action.requests[key1][id].locationItems[key2].startDate || null,
                endDate: action.requests[key1][id].locationItems[key2].endDate || null,
                location: action.requests[key1][id].locationItems[key2].location || [],
                electricalIsolationRequired: action.requests[key1][id].locationItems[key2].electricalIsolationRequired || false,
                signallingResourceRequired: action.requests[key1][id].locationItems[key2].signallingResourceRequired || false,
                testTramsRequired: action.requests[key1][id].locationItems[key2].testTramsRequired || false,
                colocate: action.requests[key1][id].locationItems[key2].colocate || '',
                status: action.requests[key1][id].status
            })  
        }
    }
    
    return {
        ...state,
        loading: false,
        error: null,
        requests: newPublicViewRequestItems,
        identifier: action.identifier
    };
}

const publicViewFinish = (state) => {
    return { ...state, identifier: null };
}

const publicViewFail = (state, action) => {
    return { ...state,
        loading: false,
        error: action.error
    };
}

const publicViewStateReset = (state) => {
    return { ...state, initialState };
}

const publicViewErrorReset = (state) => {
    return { ...state, error: null };
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case type.PUBLIC_VIEW_START: return publicViewStart(state);
        case type.PUBLIC_VIEW_SUCCESS: return publicViewSuccess(state, action);
        case type.PUBLIC_VIEW_FINISH: return publicViewFinish(state);
        case type.PUBLIC_VIEW_FAIL: return publicViewFail(state, action);
        case type.PUBLIC_VIEW_STATE_RESET: return publicViewStateReset(state);
        case type.PUBLIC_VIEW_ERROR_RESET: return publicViewErrorReset(state);
        default: return state;
    };
}

export default reducer;