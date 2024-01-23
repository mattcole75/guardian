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
        for(const key2 in action.requests[key1][id].locations) {
            newPublicViewRequestItems.push({
                organisation: action.requests[key1][id].requester.organisation,
                siteDescription: action.requests[key1][id].siteDetails.siteDescription || null,
                startdate: action.requests[key1][id].locations[key2].startDate || null,
                endDate: action.requests[key1][id].locations[key2].endDate || null,
                locations: action.requests[key1][id].locations[key2].locationList || null,
                isolationType: action.requests[key1][id].planningInformation && action.requests[key1][id].planningInformation.isolationType
                    ?   action.requests[key1][id].planningInformation.isolationType
                    :   null,
                electricalResourceRequired: action.requests[key1][id].siteDetails.electricalResourceRequired || false,
                signallingResourceRequired: action.requests[key1][id].siteDetails.signallingResourceRequired || false,
                testTramsRequired: action.requests[key1][id].siteDetails.testTramsRequired || false,
                coLocate: action.requests[key1][id].planningInformation && action.requests[key1][id].planningInformation.coLocate
                    ?   action.requests[key1][id].planningInformation.coLocate
                    :   null,
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