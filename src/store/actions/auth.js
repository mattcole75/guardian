import axios from '../../shared/axios';
import direct from 'axios';

import * as type from './types';
import { apikey } from '../../configuration/config';

const authStart = () => {
    return {
        type: type.AUTH_START
    };
}

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
}

const authGetUsersSuccess = (users, identifier) => {
    return {
        type: type.USERS_GET_SUCCESS,
        users: users,
        identifier: identifier
    };
}

const authAdminPatchSuccess = (user, identifier) => {
    return {
        type: type.AUTH_ADMIN_PATCH_SUCCESS,
        localId: user.localId,
        disabled: user.disabled,
        roles: user.roles,
        identifier: identifier
    };
}
const authRecoverPasswordSuccess = (email, identifier) => {
    return {
        type: type.AUTH_RECOVER_PASSWORD_SUCCESS,
        email: email,
        identifier: identifier
    }
}

const authFinish = () => {
    return {
        type: type.AUTH_FINISH
    };
}

const authFail = (error) => {
    return {
        type: type.AUTH_FAIL,
        error: error
    };
}

const authStateReset = () => {
    return {
        type: type.AUTH_STATE_RESET
    };
}

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
    
}

const deleteLocalStorage = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
    localStorage.removeItem('displayName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('email');
    localStorage.removeItem('organisation');
    localStorage.removeItem('roles');   
}

export const signup = (authData) => {
    return dispatch => {

        dispatch(authStart());
        axios.post('/user', authData)
            .then(res => {
                dispatch(authFinish());
            })
            .catch(err => {
                dispatch(authFail(err.message)); 
            });
    };
}

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
                    dispatch(authFail(err.message)); 
                })
            })
            .catch(err => {
                dispatch(authFail(err.message)); 
            });
    };
}

export const recoverPassword = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        direct.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + apikey, authData)
            .then(res => {
                dispatch(authRecoverPasswordSuccess(res.data.email, identifier));
                dispatch(authFinish());
            })
            .catch(err => {
                dispatch(authFail(err.message));
            });
    };
}

export const logout = () => {
    return dispatch => {
        dispatch(authStart());
        deleteLocalStorage();
        dispatch(authStateReset());
        dispatch(authFinish());
    };
}

export const authSendRequest = (url, method, data, idToken, localId, identifier, param) => {

    return dispatch => {

        dispatch(authStart());

        axios({
            method: method,
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                idToken: idToken,
                localId: localId,
                param: param
            }
        })
        .then(res => {
            const { uid, displayName, phoneNumber, email, organisation, roles } = res.data.data;
            dispatch(authSuccess(idToken, uid, displayName, phoneNumber, email, organisation, roles, identifier));
            dispatch(authFinish());
        })
        .catch(err => {
            dispatch(authFail(err.message));
        });
    };
}

export const authGetUsers = (idToken, localId, query, identifier) => {

    return dispatch => {

        dispatch(authStart());

        axios.get('/users',
            { 
                headers: {
                    'Content-Type': 'application/json',
                    idToken: idToken,
                    localId: localId,
                    param: query //this does not currently do anything server side
                }
            }
        )
            .then(res => {
                dispatch(authGetUsersSuccess(res.data.data, identifier));
                dispatch(authFinish());
            })
            .catch(err => {
                dispatch(authFail(err.message));
            });
    };
}

export const authAdminPatch = (idToken, localId, data, identifier) => {
    return dispatch => {

        dispatch(authStart());

        const config = { 
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                localId: localId
            }
        };

        axios.patch('/adminuser', data, config)
            .then(res => {
                dispatch(authAdminPatchSuccess(data, identifier));
                dispatch(authFinish());
                authGetUsers(idToken, localId, '', 'ADMIN_PATCH');
                // dispatch(authGetUsers(idToken, localId, '', identifier));
            })
            .catch(err => {
                dispatch(authFail(err.message)); 
            });
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}

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
}