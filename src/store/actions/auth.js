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

const authAccountCreateSuccess = (identifier) => {
    return {
        type: type.AUTH_CREATE_ACCOUNT_SUCCESS,
        identifier: identifier
    }
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

const setLocalStorage = (idToken, localId, displayName, phoneNumber, email, organisation, roles, expiresIn, refreshToken) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('localId', localId);
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('email', email);
    localStorage.setItem('organisation', organisation);
    localStorage.setItem('roles', roles);
    localStorage.setItem('refreshToken', refreshToken);
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
    localStorage.removeItem('refreshToken');
}

// exported functions
export const signup = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        axios.post('/user', authData)
            .then(res => {
                if(res.status === 201)
                    dispatch(authAccountCreateSuccess(identifier));
            })
            .then(() => {
                dispatch(authFinish());
            })
            .catch(err => {

                if(err.response.data) {
                    const { message } = err.response.data;

                    switch (message) {
                        case 'auth/email-already-exists } - The email address is already in use by another account.':
                            dispatch(authFail('Email address already in use'));
                            break;
                        case 'auth/phone-number-already-exists } - The user with the provided phone number already exists.':
                            dispatch(authFail('Phone number already in use'));
                            break;
                        case 'OPERATION_NOT_ALLOWED':
                            dispatch(authFail('Website is currently down, please try again later'));
                            break;
                        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                            dispatch(authFail('Too many failed login attempts, please try again later'));
                            break;
                        default:
                            dispatch(authFail('Unknown error please report the following to the administrator: ' + message)); 

                    }
                } else {
                    dispatch(authFail(err.message)); 
                }
            });
    };
}

export const login = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        direct.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apikey, authData)
            .then(res => {
                const { idToken, localId, expiresIn, refreshToken } = res.data
                axios.get('/user' , {
                    headers: {
                        idToken: idToken,
                        localId: localId
                    }
                })
                .then(user => {
                    console.log(user.data);
                    const { displayName, phoneNumber, email, organisation, roles } = user.data.data;
                    setLocalStorage(idToken, localId, displayName, phoneNumber, email, organisation, roles, expiresIn, refreshToken);
                    dispatch(authSuccess(idToken, localId, displayName, phoneNumber, email, organisation, roles, identifier));
                    dispatch(checkAuthTimeout(expiresIn, refreshToken));
                })
                .then(() => {
                    dispatch(authFinish());
                })
                .catch(err => {
                    dispatch(authFail(err.message)); 
                })
            })
            .catch(err => {
                if(err.response.data) {
                    const { error } = err.response.data;

                    console.log(error.message);

                    switch (error.message) {
                        case 'EMAIL_NOT_FOUND':
                            dispatch(authFail('Incorrect email address or password'));
                            break;
                        case 'INVALID_PASSWORD':
                            dispatch(authFail('Incorrect email address or password'));
                            break;
                        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
                            dispatch(authFail('Too many failed attempts, please try again later'));
                            break;
                        case 'USER_DISABLED':
                            dispatch(authFail('Account disabled, please cantact the administrator'));
                            break;
                        default:
                            dispatch(authFail('Unknown error please report the following to the administrator: ' + error.message)); 

                    }
                } else {
                    dispatch(authFail(err.message)); 
                }
                
            });
    };
}

export const authRecoverPassword = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        direct.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + apikey, authData)
            .then(res => {
                dispatch(authRecoverPasswordSuccess(res.data.email, identifier));
            })
            .then(() => {
                dispatch(authFinish());
            })
            .catch(err => {
                dispatch(authFail(err.message));
            });
    };
}

export const authUpdatePassword = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        direct.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + apikey, authData)
            .then(res => {
                
                const { idToken, localId, expiresIn, refreshToken } = res.data
                axios.get('/user' , {
                    headers: {
                        idToken: idToken,
                        localId: localId
                    }
                })
                .then(user => {
                    const { displayName, phoneNumber, email, organisation, roles } = user.data.data;
                    setLocalStorage(idToken, localId, displayName, phoneNumber, email, organisation, roles, expiresIn, refreshToken);
                    dispatch(authSuccess(idToken, localId, displayName, phoneNumber, email, organisation, roles, identifier));
                    dispatch(checkAuthTimeout(expiresIn, refreshToken));
                })
                .then(() => {
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
            // dispatch(logout()); // use this if you want to log a user out after an hour.
            dispatch(extendAuthTimeout()); // use this to renew the user token roughly each hour
        }, (expirationTime - 120) * 1000);
    };
}

const extendAuthTimeout = () => {
    
    return dispatch => {

        const refreshToken = localStorage.getItem('refreshToken');
        if(refreshToken == null) {
            dispatch(logout());
                dispatch(authStateReset());
        } else {
            
            dispatch(authStart());
            
            console.log({ grant_type: 'refresh_token', refresh_token: refreshToken });
            
            direct.post('https://securetoken.googleapis.com/v1/token?key=' + apikey, { grant_type: 'refresh_token', refresh_token: refreshToken })
                .then(res => {
                    
                    const { id_token, user_id, expires_in, refresh_token } = res.data
                    
                    axios.get('/user' , {
                        headers: {
                            idToken: id_token,
                            localId: user_id
                        }
                    })
                    .then(user => {
                        const { displayName, phoneNumber, email, organisation, roles } = user.data.data;
                        setLocalStorage(id_token, user_id, displayName, phoneNumber, email, organisation, roles, expires_in, refresh_token);
                        dispatch(authSuccess(id_token, user_id, displayName, phoneNumber, email, organisation, roles, 'EXTEND_AUTH_TIMEOUT'));
                        dispatch(checkAuthTimeout(expires_in, refresh_token));
                    })
                    .then(() => {
                        dispatch(authFinish());
                    })
                    .catch(err => {
                        console.log(err);
                        dispatch(authFail(err.message));
                    })
                })
                .catch(err => {
                    dispatch(authFail(err.message));
                });
        }
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
            if (expirationDate <= new Date()) {
                dispatch(logout());
                dispatch(authStateReset());
            } else {
                dispatch(authSuccess(idToken, localId, displayName, phoneNumber, email, organisation, roles, 'AUTH_CHECK_STATE'));
                dispatch(checkAuthTimeout());
                // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
                // todo: https://cloud.google.com/identity-platform/docs/use-rest-api#section-refresh-token
            }
        }
    };
}