import axios from '../../shared/axios';
import * as type from './types';
// import { apikey } from '../../configuration/config';

const requestStart = () => {
    return {
        type: type.REQUEST_START
    };
}

const createRequestSuccess = (id, request, identifier) => {
    return {
        type: type.REQUEST_CREATE_SUCCESS,
        id: id,
        request: request,
        identifier: identifier
    };
}

const updateRequestSuccess = (id, request, identifier) => {
    return {
        type: type.REQUEST_UPDATE_SUCCESS,
        id: id,
        request: request,
        identifier: identifier
    };
}

const requestFinish = () => {
    return {
        type: type.REQUEST_FINISH
    };
}

const requestFail = (error) => {
    return {
        type: type.REQUEST_FAIL,
        error: error
    };
}

const requestStateReset = () => {
    return {
        type: type.REQUEST_STATE_RESET
    };
}

export const createRequest = (data, idToken, identifier) => {

    return dispatch => {

        dispatch(requestStart());

        axios.post('/requests.json?auth=' + idToken, data)
        .then(response => {
            // dispatch(createRequestSuccess(response.data.name, {...data, ...{id: response.data.name}}, identifier));
            dispatch(createRequestSuccess(response.data.name, data, identifier));
            dispatch(requestFinish());
        })
        .catch(error => {
            console.log(error);
            dispatch(requestFail(error));
        })
    };
}

export const updateRequest = (data, idToken, identifier) => {
    
    return dispatch => {

        dispatch(requestStart());

        axios.patch('/requests/' + data.id + '.json?auth=' + idToken, data)
        .then(response => {

            dispatch(updateRequestSuccess(response.data.name, data, identifier));
            dispatch(requestFinish());
        })
        .catch(error => {
            console.log(error);
            dispatch(requestFail(error)); 
        });
    };
}

// export const deleteRequest = (id, idToken, identifier) => {
//     return dispatch => {
//         dispatch(requestStart);

//         axios.delete('requests' + idToken, id)
//         .then(res => {

//             dispatch(requestSuccess(
//                 res.data.idToken,
//                 res.data.localId,
//                 res.data.email,
//                 res.data.displayName,
//                 identifier
//             ));

//             dispatch(requestFinish());
//         })
//         .catch(err => {
//             console.log(err);
//             dispatch(requestFail(err)); 
//         });
//     };
// }

export const resetState = () => {
    return dispatch => {
        dispatch(requestStateReset());
    };
};