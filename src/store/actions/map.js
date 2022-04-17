import axios from '../../shared/axios';
import * as type from './types';

const mapStart = () => {
    return {
        type: type.MAP_START
    };
}

const mapSuccess = (requests, identifier) => {
    return {
        type: type.MAP_SUCCESS,
        requests: requests,
        identifier: identifier
    };
}

const mapFinish = () => {
    return {
        type: type.MAP_FINISH
    };
}

const mapFail = (error) => {
    return {
        type: type.MAP_FAIL,
        error: error
    };
}

const mapStateReset = () => {
    return {
        type: type.MAP_STATE_RESET
    };
}

const mapErrorReset = () => {
    return {
        type: type.MAP_ERROR_RESET
    };
}

export const getMapRequests = (idToken, identifier) => {

    return dispatch => {

        dispatch(mapStart());

        axios.get('/requests.json?auth=' + idToken)
        .then(response => {
            dispatch(mapSuccess(response.data, identifier));
            dispatch(mapFinish());
        })
        .catch(error => {
            console.log(error);
            dispatch(mapFail(error));
        });
    };
}

export const mapResetState = () => {
    return dispatch => {
        dispatch(mapStateReset)
    };
}

export const mapResetError = () => {
    return dispatch => {
        dispatch(mapErrorReset)
    };
}