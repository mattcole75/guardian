import * as type from '../actions/types';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    idToken: null,
    localId: null,
    email: null,
    identifier: null,
    authRedirectPath: '/'
};

const authStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        loading: false,
        error: null,
        idToken: action.idToken,
        localId: action.localId,
        email: action.email,
        avatarUrl: action.avatarUrl,
        identifier: action.identifier
    });
};

const authFinish = (state) => {
    return updateObject( state, {
        identifier: null
    });
};

const authFail = (state, action) => {
    return updateObject( state, {
        loading: false,
        error: action.error
    });
}

const authStateReset = (state) => {
    return updateObject( state, initialState);
};

const authLogout = (state) => {
    return updateObject( state, initialState);
};

const authErrorReset = (state) => {
    return updateObject( state, {
        error: null
    });
}

const authRedirectPath = (state, action) => {
    return updateObject( state, {
        authRedirectPath: action.authRedirectPath
    });
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
        // case actionType.AUTH_POST_DISPLAY_NAME: return postDisplayName(state, action);
        // case actionType.AUTH_POST_EMAIL: return postEmail(state, action);
        // case actionType.AUTH_POST_PASSWORD: return postPassword(state, action);
        // case actionType.AUTH_POST_FORGOTTEN_PASSWORD: return postForgottenPassword(state, action);
        case type.AUTH_LOGOUT: return authLogout(state);
        
        default: return state;
    }
};

export default reducer;