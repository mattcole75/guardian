import * as type from '../actions/types';
import MapItem from '../../model/MapItem';

const initialState = {
    loading: false,
    error: null,
    mapItems: [],
    identifier: null,
    redirectPath: '/'
};

const mapStart = (state) => {
    return { ...state,
        error: null,
        loading: true
    };
}

const mapSuccess = (state, action) => {
    let newMapItems = [];
    for (const key in action.requests) {
        newMapItems.push(new MapItem(
            action.requests[key].projectOrganisation,
            action.requests[key].projectTitle,
            action.requests[key].accessTypeDisruptive,
            action.requests[key].accessRequestTitle,
            action.requests[key].requestStatus,
            action.requests[key].locationLimitItems
        ));
    }
    return {
        ...state,
        loading: false,
        error: null,
        mapItems: newMapItems,
        identifier: action.identifier
    };
}

const mapFinish = (state) => {
    return { ...state, identifier: null };
}

const mapFail = (state, action) => {
    return { ...state,
        loading: false,
        error: action.error
    };
}

const mapStateReset = (state) => {
    return { ...state, initialState };
}

const mapErrorReset = (state) => {
    return { ...state, error: null };
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case type.MAP_START: return mapStart(state);
        case type.MAP_SUCCESS: return mapSuccess(state, action);
        case type.MAP_FINISH: return mapFinish(state);
        case type.MAP_FAIL: return mapFail(state, action);
        case type.MAP_STATE_RESET: return mapStateReset(state);
        case type.MAP_ERROR_RESET: return mapErrorReset(state);
        default: return state;
    };
}

export default reducer;