import axios from 'axios';
import * as type from './types';

const authStart = () => {
    return {
        type: type.AUTH_START
    };
};

const authSuccess = (idToken, localId, email, identifier) => {
    return {
        type: type.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
        email: email,
        identifier: identifier
    };
};

const authFinish = () => {
    return {
        type: type.AUTH_FINISH
    };
};

const authFail = (error) => {
    return {
        type: type.AUTH_FAIL,
        error: error
    };
};

const authStateReset = () => {
    return {
        type: type.AUTH_STATE_RESET
    };
};

const setLocalStorage = (authData) => {
    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);
    localStorage.setItem('idToken', authData.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('localId', authData.localId);
    localStorage.setItem('email', authData.email);
};

const deleteLocalStorage = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
    localStorage.removeItem('email');
};

export const signup = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtfV_dauaHQma6Mlb8yCphbx0rMsqTuko', authData)
            .then(res => {

                setLocalStorage(res.data);

                dispatch(authSuccess(
                    res.data.idToken,
                    res.data.localId,
                    res.data.email,
                    identifier
                ));

                dispatch(checkAuthTimeout(res.data.expiresIn));
                dispatch(authFinish());
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err)); 
            });
    };
};

export const login = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtfV_dauaHQma6Mlb8yCphbx0rMsqTuko', authData)
            .then(res => {

                setLocalStorage(res.data);

                dispatch(authSuccess(
                    res.data.idToken, 
                    res.data.localId, 
                    res.data.email,
                    identifier
                ));

                dispatch(checkAuthTimeout(res.data.expiresIn));
                dispatch(authFinish());

            })
            .catch(err => {
        
                dispatch(authFail(err)); 
            });
    };
};

export const logout = () => {
    return dispatch => {
        deleteLocalStorage();
        dispatch(authStateReset());
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        const email = localStorage.getItem('email');

        if (!idToken) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
                dispatch(authStateReset());
            } else {
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess(idToken, localId, email, 'AUTH_CHECK_STATE'));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            } 
        }
    };
};