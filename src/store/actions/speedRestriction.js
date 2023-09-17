import axios from '../../shared/axios';
import * as type from './types';

const speedRestrictionStart = () => {
    return {
        type: type.SPEED_RESTRICTION_START
    };
}

const createSpeedRestrictionSuccess = (id, speedRestriction, identifier) => {
    return {
        type: type.SPEED_RESTRICTION_CREATE_SUCCESS,
        id: id,
        speedRestriction: speedRestriction,
        identifier: identifier
    };
}

const getSpeedRestrictionsSuccess = (speedRestrictions, identifier) => {
    return {
        type: type.SPEED_RESTRICTIONS_GET_SUCCESS,
        speedRestrictions: speedRestrictions,
        identifier: identifier
    };
}

const getSpeedRestrictionSuccess = (speedRestriction, identifier) => {
    return {
        type: type.SPEED_RESTRICTION_GET_SUCCESS,
        speedRestriction: speedRestriction,
        identifier: identifier
    };
}

const updateSpeedRestrictionSuccess = (id, speedRestriction, identifier) => {
    return {
        type: type.SPEED_RESTRICTION_UPDATE_SUCCESS,
        id: id,
        speedRestriction: speedRestriction,
        identifier: identifier
    };
}

const speedRestrictionFinish = () => {
    return {
        type: type.SPEED_RESTRICTION_FINISH
    };
}

const speedRestrictionFail = (error) => {
    return {
        type: type.SPEED_RESTRICTION_FAIL,
        error: error
    };
}

const speedRestrictionStateReset = () => {
    return {
        type: type.SPEED_RESTRICTION_STATE_RESET
    };
}

export const createSpeedRestriction = (idToken, localId, data, identifier) => {

    return dispatch => {

        dispatch(speedRestrictionStart());

        axios.post('/speedrestriction', data, {
            headers: {
                idToken: idToken,
                localId: localId
            }
        })
        .then(res => {
            dispatch(createSpeedRestrictionSuccess(res.data.result.id, data, identifier));   
        })
        .then(() => {
            dispatch(speedRestrictionFinish());
        })
        .catch(err => {
            dispatch(speedRestrictionFail(err.message));
        });
    };
}

export const getSpeedRestrictions = (idToken, localId, type, location, status, identifier) => {

    return dispatch => {
        
        let headers = { headers: {
            idToken: idToken,
            localId: localId,
            params: `${type},${location},${status}`
        }};

        dispatch(speedRestrictionStart());

        axios.get('/speedrestrictions', headers)
        .then(res => {
            dispatch(getSpeedRestrictionsSuccess(res.data.result, identifier));
        })
        .then(() => {
            dispatch(speedRestrictionFinish());
        })
        .catch(err => {
            dispatch(speedRestrictionFail(err.message));
        });
    };
}

export const getSpeedRestriction = (idToken, localId, uid, identifier) => {
    
    return dispatch => {

        dispatch(speedRestrictionStart());

        axios.get('/speedrestriction', { 
            headers: {
                idToken: idToken,
                localId: localId,
                uid: uid
            }
        })
        .then(res => {
            dispatch(getSpeedRestrictionSuccess(res.data.result, identifier))
        })
        .then(() => {
            dispatch(speedRestrictionFinish());
        })
        .catch(err => {
            dispatch(speedRestrictionFail(err.message));
        })
    };
}

export const updateSpeedRestriction = (id, idToken, localId, data, identifier) => {
    
    return dispatch => {
        
        dispatch(speedRestrictionStart());

        axios.patch('/speedrestriction', data, {
            headers: {
                idToken: idToken,
                localId: localId,
                uid: id
            }
        })
        .then(() => {
            dispatch(updateSpeedRestrictionSuccess(id, data, identifier));
        })
        .then(() => {
            dispatch(speedRestrictionFinish());
        })
        .catch(err => {
            dispatch(speedRestrictionFail(err.message)); 
        });
    };
}

export const speedRestrictionResetState = () => {
    return dispatch => {
        dispatch(speedRestrictionStateReset());
    };
};
