import * as type from '../actions/types';

const initialState = {
    loading: false,
    error: null,
    accessRequests: [],
    accessRequest: null,
    planners: [],
    permit: null,
    identifier: null,
    requestRedirectPath: '/'
};

const accessRequestStart = (state) => {
    return { ...state, 
        error: null,
        loading: true
    };
};

const userCreateAccessRequestSuccess = (state, action) => {

    const newAccessRequest = { [action.id]: action.accessRequest };

    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: state.accessRequests.concat(newAccessRequest),
        accessRequest: newAccessRequest,
        identifier: action.identifier
    };  
}

const userUpdateAccessRequestSuccess = (state, action) => {

    // make a copy of the states access requests array
    let updatedAccessRequests = [ ...state.accessRequests ];
    let updatedAccessRequest = null;

    // check that there are requestes currently held in state.  
    // if the user has refreshed the request page using the browser there will be no requests in state
    if(updatedAccessRequests.length > 0) {
        // find the element index in the array
        const accessRequestIndex = state.accessRequests.findIndex(req => req.uid === action.uid);
        // update list item with updated updated
        updatedAccessRequest = { ...state.accessRequests[accessRequestIndex], ...action.accessRequest };
        // update list
        updatedAccessRequests[accessRequestIndex] = updatedAccessRequest;
    } else {
        updatedAccessRequest = { ...state.accessRequest, ...action.accessRequest };
    }

    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: updatedAccessRequests,
        accessRequest: updatedAccessRequest,
        identifier: action.identifier
    };
}

const plannerUpdateAccessRequestSuccess = (state, action) => {

    // make a copy of the states access requests array
    let updatedAccessRequests = [ ...state.accessRequests ];
    let updatedAccessRequest = null;

    // check that there are requestes currently held in state.  
    // if the user has refreshed the request page using the browser there will be no requests in state
    if(updatedAccessRequests.length > 0) {
        // find the element index in the array
        const accessRequestIndex = state.accessRequests.findIndex(req => req.uid === action.uid);
        // update list item with updated updated
        updatedAccessRequest = {
            ...state.accessRequest,
            planningInformation: {...action.accessRequest.planningInformation },
            eventLog: [ ...action.accessRequest.eventLog ],
            status: action.accessRequest.status
        };
        // update list
        updatedAccessRequests[accessRequestIndex] = updatedAccessRequest;
    } else {
        updatedAccessRequest = {
            ...state.accessRequest,
            planningInformation: {...action.accessRequest.planningInformation },
            eventLog: [ ...action.accessRequest.eventLog ],
            status: action.accessRequest.status
        };
    }

    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: updatedAccessRequests,
        accessRequest: updatedAccessRequest,
        identifier: action.identifier
    }

}

const userGetAccessRequestsSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: action.accessRequests,
        accessRequest: null,
        identifier: action.identifier
    };
}

const userGetAccessRequestSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        accessRequest: action.accessRequest,
        identifier: action.identifier
    };
}

const userGetAccessRequestPermitSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        permit: action.permit,
        identifier: action.identifier
    };
}

const userUploadAccessRequestDocumentSuccess = (state, action) => {
    let updatedAccessRequestDocuments = [];
    updatedAccessRequestDocuments = [ ...state.accessRequest.documents ];
    updatedAccessRequestDocuments.push(action.document);
    const updatedAccessRequest = { ...state.accessRequest, documents: [ ...updatedAccessRequestDocuments ] };

    return { ...state,
        loading: false,
        error: null,
        accessRequest: updatedAccessRequest,
        identifier: action.identifier
    };
}

const userDeleteAccessRequestDocumentSuccess = (state, action) => {

    const updatedAccessRequestDocuments = [ ...state.accessRequest.documents].filter(el => {
        return el.name !== action.fileName
    });

    return { ...state,
        loading: false,
        error: null,
        accessRequest: { ...state.accessRequest, documents: [ ...updatedAccessRequestDocuments ] },
        identifier: action.identifier
    };
}

const plannerGetAccessRequestsSuccess = (state, action) => {
    let accessRequestItems = [];
    for(const key1 in action.accessRequests) {
         let id = Object.keys(action.accessRequests[key1]);
         for(const key2 in action.accessRequests[key1][id].locations) {  
            accessRequestItems.push({
                uid: id[0],
                startDate: action.accessRequests[key1][id].locations[key2].startDate,
                endDate: action.accessRequests[key1][id].locations[key2].endDate,
                locations: action.accessRequests[key1][id].locations[key2].locationList,
                escalatedDate: action.accessRequests[key1][id].planningInformation.escalatedDate,
                possessionDetails: action.accessRequests[key1][id].planningInformation.possessionDetails,
                picop: action.accessRequests[key1][id].planningInformation.picop,
                pic: action.accessRequests[key1][id].planningInformation.pic,
                nwrAdjacent: action.accessRequests[key1][id].planningInformation.nwrAdjacent,
                coLocate: action.accessRequests[key1][id].planningInformation.coLocate,
                organisation: action.accessRequests[key1][id].planningInformation.organisation,
                line: action.accessRequests[key1][id].planningInformation.line,
                siteDescription: action.accessRequests[key1][id].siteDetails.siteDescription,
                isolationType: action.accessRequests[key1][id].planningInformation.isolationType,
                isolationDetails: action.accessRequests[key1][id].planningInformation.isolationDetails,
                startTime: action.accessRequests[key1][id].locations[key2].startTime,
                endTime: action.accessRequests[key1][id].locations[key2].endTime,
                worksiteLimits: action.accessRequests[key1][id].planningInformation.worksiteLimits,
                safetyResourceRequired: action.accessRequests[key1][id].planningInformation.safetyResourceRequired,
                signallingResourceRequired: action.accessRequests[key1][id].siteDetails.signallingResourceRequired,
                electricalResourceRequired: action.accessRequests[key1][id].siteDetails.electricalResourceRequired,
                testTramsRequired: action.accessRequests[key1][id].siteDetails.testTramsRequired,
                tramConfigurationType: action.accessRequests[key1][id].planningInformation.tramConfigurationType,
                onTrackMachineCount: action.accessRequests[key1][id].planningInformation.onTrackMachineCount,
                onTrackPlant: action.accessRequests[key1][id].planningInformation.onTrackPlant,
                trolleyType: action.accessRequests[key1][id].planningInformation.trolleyType,
                onTrackMachine: action.accessRequests[key1][id].planningInformation.onTrackMachine,
                siteRemarks: action.accessRequests[key1][id].planningInformation.siteRemarks,
                withinDisruptivePossession: action.accessRequests[key1][id].planningInformation.withinDisruptivePossession,
                updated: action.accessRequests[key1][id].updated,
                possessionCategory: action.accessRequests[key1][id].planningInformation.possessionCategory,
                status: action.accessRequests[key1][id].status
            })
        }
    }

    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: accessRequestItems,
        accessRequest: null,
        identifier: action.identifier
    };
}

const plannerGetPlannersSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        planners: action.planners,
        identifier: action.identifier
    };
}

const accessRequestDeleteSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        accessRequests: state.accessRequests.filter(req => req.id === action.id),
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
    return initialState;
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
        case type.USER_CREATE_ACCESS_REQUEST_SUCCESS: return userCreateAccessRequestSuccess(state, action);
        case type.USER_UPDATE_ACCESS_REQUEST_SUCCESS: return userUpdateAccessRequestSuccess(state, action);
        case type.PLANNER_UPDATE_ACCESS_REQUEST_SUCCESS: return plannerUpdateAccessRequestSuccess(state, action);
        case type.USER_GET_ACCESS_REQUESTS_SUCCESS: return userGetAccessRequestsSuccess(state, action);
        case type.USER_GET_ACCESS_REQUEST_SUCCESS: return userGetAccessRequestSuccess(state, action);
        case type.USER_GET_ACCESS_REQUEST_PERMIT_SUCCESS: return userGetAccessRequestPermitSuccess(state, action);
        case type.USER_UPLOAD_ACCESS_REQUEST_DOCUMENT_SUCCESS: return userUploadAccessRequestDocumentSuccess(state,action);
        case type.USER_DELETE_ACCESS_REQUEST_DOCUMENT_SUCCESS: return userDeleteAccessRequestDocumentSuccess(state, action);
        case type.PLANNER_GET_ACCESS_REQUESTS_SUCCESS: return plannerGetAccessRequestsSuccess(state, action);
        case type.ACCESS_REQUEST_PLANNER_GET_PLANNERS_SUCCESS: return plannerGetPlannersSuccess(state, action);
        case type.ACCESS_REQUEST_PLANNER_DELETE_SUCCESS: return accessRequestDeleteSuccess(state, action);
        case type.ACCESS_REQUEST_FINISH: return accessRequestFinish(state);
        case type.ACCESS_REQUEST_FAIL: return accessRequestFail(state, action);
        case type.ACCESS_REQUEST_STATE_RESET: return accessRequestStateReset(state);
        case type.ACCESS_REQUEST_ERROR_RESET: return accessRequestErrorReset(state);
        case type.ACCESS_REQUEST_REDIRECT_PATH: return accessRequestRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;