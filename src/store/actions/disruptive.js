import axios from '../../shared/axios';
import * as type from './types';

const disruptiveStart = () => {
    return {
        type: type.DISRUPTIVE_START
    };
}

const disruptiveCreateSuccess = (id, disruptive, identifier) => {
    return {
        type: type.DISRUPTIVE_CREATE_SUCCESS,
        id: id,
        disruptive: disruptive,
        identifier: identifier
    };
}

const disruptiveUpdateSuccess = (id, disruptive, identifier) => {
    return {
        type: type.DISRUPTIVE_UPDATE_SUCCESS,
        id: id,
        disruptive: disruptive,
        identifier: identifier
    };
}

const disruptivesGetSuccess = (disruptives, identifier) => {
    return {
        type: type.DISRUPTIVES_GET_SUCCESS,
        disruptives: disruptives,
        identifier: identifier
    };
}

const disruptiveGetSuccess = (disruptive, identifier) => {
    return {
        type: type.DISRUPTIVE_GET_SUCCESS,
        disruptive: disruptive,
        identifier: identifier
    }
}

const disruptiveSelectSuccess = (disruptive, identifier) => {
    return {
        type: type.DISRUPTIVE_SELECT_SUCCESS,
        disruptive: disruptive,
        identifier: identifier
    }
}

const disruptiveFinish = () => {
    return {
        type: type.DISRUPTIVE_FINISH
    };
}

const disruptiveFail = (error) => {
    return {
        type: type.DISRUPTIVE_FAIL,
        error: error
    };
}

const disruptiveStateReset = () => {
    return {
        type: type.DISRUPTIVE_ERROR_RESET
    };
}

export const createDisruptive = (idToken, localId, data, identifier) => {

    return dispatch => {
        dispatch(disruptiveStart());

        axios.post('/disruptive', data, {
            headers: {
                idToken: idToken,
                localId: localId
            }
        })
        .then(res => {
            dispatch(disruptiveCreateSuccess(res.data.result.id, data, identifier));
        })
        .then(() => {
            dispatch(disruptiveFinish());
        })
        .catch(err => {
            dispatch(disruptiveFail(err.message));
        })
    };
}

export const updateDisruptive = (id, idToken, localId, data, identifier) => {

    return dispatch => {
        dispatch(disruptiveStart());

        axios.patch('/disruptive', data, {
            headers: {
                idToken: idToken,
                localId: localId,
                param: id
            }
        })
        .then(() => {
            dispatch(disruptiveUpdateSuccess(id, data, identifier));
        })
        .then(() => {
            dispatch(disruptiveFinish());
        })
        .catch(err => {
            dispatch(disruptiveFail(err.message));
        })
    };
}

export const getDisruptives = (idToken, localId, uid, identifier) => {
    
    return dispatch => {
        dispatch(disruptiveStart());

        axios.get('/disruptives', { 
            headers: {
                idToken: idToken,
                localId: localId,
                uid: uid
            }
        })
        .then(res => {
            console.log(res.data.result);
            dispatch(disruptivesGetSuccess(res.data.result, identifier))
        })
        .then(() => {
            dispatch(disruptiveFinish());
        })
        .catch(err => {
            dispatch(disruptiveFail(err.message));
        })
    };
}

export const getDisruptive = (idToken, localId, uid, identifier) => {

    return dispatch => {
        dispatch(disruptiveStart());

        axios.get('/disruptive', {
            headers: {
                idToken: idToken,
                localId: localId,
                uid: uid
            }
        })
        .then(res => {
            dispatch(disruptiveGetSuccess(res.data.result, identifier));
        })
        .then(() => {
            dispatch(disruptiveFinish());
        })
        .catch(err => {
            dispatch(disruptiveFail(err.message));
        })

    };
}

export const selectDisruptive = (disruptive, identifier) => {

    return dispatch => {
        dispatch(disruptiveSelectSuccess(disruptive, identifier));
        dispatch(disruptiveFinish());
    };
}

export const resetDisruptive = () => {
    return dispatch => {
        dispatch(disruptiveStateReset());
    };
}