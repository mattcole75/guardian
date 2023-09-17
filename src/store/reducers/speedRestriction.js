import * as type from '../actions/types';

const initialState = {
    loading: false,
    error: null,
    speedRestriction: null,
    speedRestrictions: [],
    identifier: null,
    redirectPath: '/'
}

const speedRestrictionStart = (state) => {
    return { ...state,
        error: null,
        loading: true
    };
}

const speedResrictionCreateSuccess = (state, action) => {
    const newSpeedRestriction = { [action.id]: action.speedRestriction };

    return { ...state,
        loading: false,
        error: null,
        speedRestriction: newSpeedRestriction,
        speedRestrictions: state.speedRestrictions.concat(newSpeedRestriction),
        identifier: action.identifier
    };
}

const speedRestrictionsGetSuccess = (state, action) => {
    return { ...state,
        loading: false,
        error: null,
        speedRestriction: null,
        speedRestrictions: action.speedRestrictions,
        identifier: action.identifier
    };
}

const speedRestrictionGetSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        speedRestriction: action.speedRestriction,
        identifier: action.identifier
    };
}

const speedRestrictionUpdateSuccess = (state, action) => {

    let updatedSpeedRestriction = null;
    let updatedSpeedRestrictions = [];

    // check that there are records currently held in state.  
    // if the user has refreshed the request page using the browser there will be no requests in state  
    if(state.speedRestrictions.length > 0) {
        // find the element index in the array
        const speedRestrictionIndex = state.speedRestrictions.findIndex(req => req.hasOwnProperty(action.id));
        // check if this is a deletee
        if(action.speedRestriction.inuse != null && action.speedRestriction.inuse === false) {
            updatedSpeedRestriction = null;
            updatedSpeedRestrictions = state.speedRestrictions.filter(req => Object.keys(req)[0] !== action.id );
        } else if(action.speedRestriction.status === 'Closed') {
            updatedSpeedRestriction = null;
            updatedSpeedRestrictions = state.speedRestrictions.filter(req => Object.keys(req)[0] !== action.id );
        } else {
            updatedSpeedRestriction = { [action.id]: { ...state.speedRestrictions[speedRestrictionIndex][action.id], ...action.speedRestriction } };

            updatedSpeedRestrictions = [ ...state.speedRestrictions ];
            updatedSpeedRestrictions[speedRestrictionIndex] = updatedSpeedRestriction;
        }
    } else {
        updatedSpeedRestriction = { [action.id]: { ...action.speedRestriction } };
    }

    return {
        ...state,
        loading: false,
        error: null,
        speedRestrictions: updatedSpeedRestrictions,
        speedRestriction: updatedSpeedRestriction,
        identifier: action.identifier
    };
}

const speedRestrictionFinish = (state) => {
    return { ...state,
        identifier: null
    };
}

const speedRestrictionFail = (state, action) => {
    return { ...state,
        loading: false,
        error: action.error
    };
}

const speedRestrictionStateReset = () => {
    return { ...initialState }
}

const speedRestrictionRedirectPath = (state, action) => {
    return { ...state,
        redirectPath: action.redirectPath
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SPEED_RESTRICTION_START: return speedRestrictionStart(state);
        case type.SPEED_RESTRICTION_CREATE_SUCCESS: return speedResrictionCreateSuccess(state, action);
        case type.SPEED_RESTRICTIONS_GET_SUCCESS: return speedRestrictionsGetSuccess(state, action);
        case type.SPEED_RESTRICTION_GET_SUCCESS: return speedRestrictionGetSuccess(state, action);
        case type.SPEED_RESTRICTION_UPDATE_SUCCESS: return speedRestrictionUpdateSuccess(state, action);
        case type.SPEED_RESTRICTION_FINISH: return speedRestrictionFinish(state);
        case type.SPEED_RESTRICTION_FAIL: return speedRestrictionFail(state, action);
        case type.SPEED_RESTRICTION_STATE_RESET: return speedRestrictionStateReset();
        case type.SPEED_RESTRICTION_REDIRECT_PATH: return speedRestrictionRedirectPath(state, action);
        default: return state
    };
}

export default reducer;