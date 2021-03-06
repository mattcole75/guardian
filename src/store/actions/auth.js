import axios from '../../shared/axios';
import direct from 'axios';

import * as type from './types';
import { apikey } from '../../configuration/config';

const authStart = () => {
    return {
        type: type.AUTH_START
    };
};

const authSuccess = (idToken, localId, displayName, phoneNumber, email, organisation, roles, identifier) => {
    return {
        type: type.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
        displayName: displayName,
        phoneNumber: phoneNumber,
        email: email,
        organisation: organisation,
        roles: roles,
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

const setLocalStorage = (idToken, localId, displayName, phoneNumber, email, organisation, roles, expiresIn) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('localId', localId);
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('email', email);
    localStorage.setItem('organisation', organisation);
    localStorage.setItem('roles', roles);
    
};

const deleteLocalStorage = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
    localStorage.removeItem('displayName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('email');
    localStorage.removeItem('organisation');
    localStorage.removeItem('roles');
    
};

export const signup = (authData) => {
    return dispatch => {

        dispatch(authStart());
        axios.post('/user', authData)
            .then(res => {
                dispatch(authFinish());
            })
            .catch(err => {
                dispatch(authFail(err)); 
            });
    };
};

export const login = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        direct.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apikey, authData)
            .then(resA => {
                const { idToken, localId, expiresIn } = resA.data
                axios.get('/user' , {
                    headers: {
                        idToken: idToken,
                        localId: localId
                    }
                })
                .then(resB => {
                    const { displayName, phoneNumber, email, organisation, roles } = resB.data.data;

                    setLocalStorage(idToken, localId, displayName, phoneNumber, email, organisation, roles, expiresIn);
                    dispatch(authSuccess(idToken, localId, displayName, phoneNumber, email, organisation, roles, identifier));
                    dispatch(checkAuthTimeout(expiresIn));
                    dispatch(authFinish());
                })
                .catch(err => {
                    dispatch(authFail(err)); 
                })
            })
            .catch(err => {
                dispatch(authFail(err)); 
            });
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(authStart());
        deleteLocalStorage();
        dispatch(authStateReset());
        dispatch(authFinish());
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
        const localId = localStorage.getItem('localId');
        const displayName = localStorage.getItem('displayName');
        const phoneNumber = localStorage.getItem('phoneNumber');
        const email = localStorage.getItem('email');
        const organisation = localStorage.getItem('organisation');
        const roles = localStorage.getItem('roles');
        

        if (!idToken) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
                dispatch(authStateReset());
            } else {
                dispatch(authSuccess(idToken, localId, displayName, phoneNumber, email, organisation, roles, 'AUTH_CHECK_STATE'));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            } 
        }
    };
};