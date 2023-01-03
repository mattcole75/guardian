import moment from 'moment';
import * as type from '../actions/types';

const initialState = {
    loading: false,
    error: null,
    disruptives: [],
    disruptive: null,
    identifier: null,
    disruptiveRedirectPath: '/accessrequests'
}

const disruptiveStart = (state) => {
    return { ...state,
        error: null,
        loading: true
    };
}

const disruptiveCreateSuccess = (state, action) => {

    const newDisruptive = { [action.id]: action.disruptive };

    return { ...state,
        loading: false,
        error: null,
        disruptives: state.disruptives.concat(newDisruptive),
        disruptive: newDisruptive,
        identifier: action.identifier
    };
}

const disruptiveUpdateSuccess = (state, action) => {

    let updatedDisruptive = null;
    let updatedDisruptives = [];

    // check if there are disruptives currently held in state.
    // if the user has refreshed the request page using the browser there will not be any disruptives in state.
    if(state.disruptives.length > 0) {
        const disruptiveIndex = state.disruptives.findIndex(dis => dis.hasOwnProperty(action.id));
        updatedDisruptive = { [action.id]: { ...state.disruptives[disruptiveIndex][action.id], ...action.disruptive, updated: moment().format() } };
        updatedDisruptives = [ ...state.disruptives ];
        updatedDisruptives[disruptiveIndex] = updatedDisruptive;
    } else {
        updatedDisruptive = { [action.id]: { ...action.disruptive } };
    }

    return { ...state,
        loading: false,
        error: null,
        disruptives: updatedDisruptives,
        disruptive: updatedDisruptive,
        identifier: action.identifier
    };
}

const disruptivesGetSuccess = (state, action) => {
    return { ...state,
        loading: false,
        error: null,
        disruptives: action.disruptives,
        disruptive: null,
        identifier: action.identifier
    };
}

const disruptiveGetSuccess = (state, action) => {
    return { ...state,
        loading: false,
        error: null,
        disruptive: action.disruptive,
        identifier: action.identifier
    };
}

const disruptiveSelectSuccess = (state, action) => {

    // const disruptiveIndex = state.disruptives.findIndex(dis => dis.hasOwnProperty(action.id));
    // const disruptive =  { ...state.disruptives[disruptiveIndex] };

    return { ...state,
        loading: false,
        error: false,
        disruptive: action.disruptive,
        identifier: action.identifier
    };
}

const disruptiveFinish = (state) => {
    return { ...state, identifier: null };
}

const disruptiveFail = (state, action) => {
    return { ...state,
        loading: false,
        error: action.error
    };
}

const disruptiveStateReset = (state) => {
    return { ...state, ...initialState };
}

const disruptiveErrorReset = (state) => {
    return { ...state, error: null };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.DISRUPTIVE_START: return disruptiveStart(state);
        case type.DISRUPTIVE_CREATE_SUCCESS: return disruptiveCreateSuccess(state, action);
        case type.DISRUPTIVE_UPDATE_SUCCESS: return disruptiveUpdateSuccess(state, action);
        case type.DISRUPTIVES_GET_SUCCESS: return disruptivesGetSuccess(state, action);
        case type.DISRUPTIVE_GET_SUCCESS: return disruptiveGetSuccess(state, action);
        case type.DISRUPTIVE_SELECT_SUCCESS: return disruptiveSelectSuccess(state, action);
        case type.DISRUPTIVE_FINISH: return disruptiveFinish(state, action);
        case type.DISRUPTIVE_FAIL: return disruptiveFail(state, action);
        case type.DISRUPTIVE_STATE_RESET: return disruptiveStateReset(state, action);
        case type.DISRUPTIVE_ERROR_RESET: return disruptiveErrorReset(state, action);
        default: return state;
    }
};

export default reducer;