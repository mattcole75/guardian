import axios from 'axios';
import * as type from './types';
import { apikey } from '../../configuration/config';

const authStart = () => {
    return {
        type: type.AUTH_START
    };
};

const authSuccess = (idToken, localId, email, displayName, identifier) => {
    return {
        type: type.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
        email: email,
        displayName: displayName,
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
    localStorage.setItem('displayName', authData.displayName);
};

const deleteLocalStorage = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
    localStorage.removeItem('email');
    localStorage.removeItem('displayName');
};

export const signup = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apikey, authData)
            .then(res => {

                setLocalStorage(res.data);

                dispatch(authSuccess(
                    res.data.idToken,
                    res.data.localId,
                    res.data.email,
                    res.data.displayName,
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

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apikey, authData)
            .then(res => {

                setLocalStorage(res.data);

                dispatch(authSuccess(
                    res.data.idToken, 
                    res.data.localId, 
                    res.data.email,
                    res.data.displayName,
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