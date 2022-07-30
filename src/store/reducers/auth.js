import * as type from '../actions/types';

const initialState = {
    loading: false,
    error: null,
    idToken: null,
    localId: null,
    displayName: null,
    phoneNumber: null,
    email: null,
    organisation: null,
    roles: [],
    identifier: null,
    authRedirectPath: '/'
};

const authStart = (state) => {
    return { ...state,
        error: null,
        loading: true
    };
};

const authSuccess = (state, action) => {
    return { ...state,
        error: null,
        idToken: action.idToken,
        localId: action.localId,
        displayName: action.displayName,
        phoneNumber: action.phoneNumber,
        email: action.email,
        organisation: action.organisation,
        roles: action.roles,
        identifier: action.identifier
    };
};

const authFinish = (state) => {
    return { ...state,
        loading: false,
        identifier: null
    };
};

const authFail = (state, action) => {
    return { ...state,
        loading: false,
        error: action.error
    };
}

const authStateReset = (state) => {
    return initialState;
};

const authLogout = (state) => {
    return initialState;
};

const authErrorReset = (state) => {
    return { ...state,
        error: null
    };
}

const authRedirectPath = (state, action) => {
    return { ...state,
        authRedirectPath: action.authRedirectPath
    };
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case type.AUTH_START: return authStart(state);
        case type.AUTH_SUCCESS: return authSuccess(state, action);
        case type.AUTH_FINISH: return authFinish(state);
        case type.AUTH_FAIL: return authFail(state, action);
        case type.AUTH_STATE_RESET: return authStateReset(state);
        case type.AUTH_ERROR_RESET: return authErrorReset(state);
        case type.AUTH_REDIRECT_PATH: return authRedirectPath(state, action);
        case type.AUTH_LOGOUT: return authLogout(state);
        
        default: return state;
    }
};

export default reducer;