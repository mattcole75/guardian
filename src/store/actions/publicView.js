import axios from '../../shared/axios';
import * as type from './types';

const publicViewStart = () => {
    return {
        type: type.PUBLIC_VIEW_START
    };
}

const publicViewSuccess = (requests, identifier) => {
    return {
        type: type.PUBLIC_VIEW_SUCCESS,
        requests: requests,
        identifier: identifier
    };
}

const publicViewFinish = () => {
    return {
        type: type.PUBLIC_VIEW_FINISH
    };
}

const publicViewFail = (error) => {
    return {
        type: type.PUBLIC_VIEW_FAIL,
        error: error
    };
}

const publicViewStateReset = () => {
    return {
        type: type.PUBLIC_VIEW_STATE_RESET
    };
}

const publicViewErrorReset = () => {
    return {
        type: type.PUBLIC_VIEW_ERROR_RESET
    };
}

export const getPublicViewRequests = (idToken, localId, startDate, endDate, identifier) => {

    return dispatch => {

        dispatch(publicViewStart());

        axios.get('/publicview', {
            headers: {
                idToken: idToken,
                localId: localId,
                startDate: startDate,
                endDate: endDate
            }
        })
        .then(response => {
            dispatch(publicViewSuccess(response.data.result, identifier));
            dispatch(publicViewFinish());
        })
        .catch(error => {
            console.log(error);
            dispatch(publicViewFail(error));
        });
    };

}

export const publicViewResetState = () => {
    return dispatch => {
        dispatch(publicViewStateReset)
    };
}

export const publicViewResetError = () => {
    return dispatch => {
        dispatch(publicViewErrorReset)
    };
}