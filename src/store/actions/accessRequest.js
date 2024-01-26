import axios from '../../shared/axios';
import { ref, uploadBytes, listAll, deleteObject } from 'firebase/storage'
import { storage } from '../../configuration/firebase/firebase';
import * as type from './types';

const accessRequestStart = () => {
    return {
        type: type.ACCESS_REQUEST_START
    };
}

const userCreateAccessRequestSuccess = (id, accessRequest, identifier) => {
    return {
        type: type.USER_CREATE_ACCESS_REQUEST_SUCCESS,
        id: id,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const userUpdateAccessRequestSuccess = (uid, accessRequest, identifier) => {
    return {
        type: type.USER_UPDATE_ACCESS_REQUEST_SUCCESS,
        uid: uid,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const plannerUpdateAccessRequestSuccess = (uid, accessRequest, identifier) => {
    return {
        type: type.PLANNER_UPDATE_ACCESS_REQUEST_SUCCESS,
        uid: uid,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const userGetAccessRequestsSuccess = (accessRequests, identifier) => {
    return {
        type: type.USER_GET_ACCESS_REQUESTS_SUCCESS,
        accessRequests: accessRequests,
        identifier: identifier
    };
}

const userUploadAccessRequestDocumentSuccess = (document, identifier) => {
    return {
        type: type.USER_UPLOAD_ACCESS_REQUEST_DOCUMENT_SUCCESS,
        document: document,
        identifier: identifier
    };
}

const userDeleteAccessRequestDocumentSuccess = (fileName, identifier) => {
    return {
        type: type.USER_DELETE_ACCESS_REQUEST_DOCUMENT_SUCCESS,
        fileName: fileName,
        identifier: identifier
    }
}

const plannerGetAccessRequestsSuccess = (accessRequests, identifier) => {
    return {
        type: type.PLANNER_GET_ACCESS_REQUESTS_SUCCESS,
        accessRequests: accessRequests,
        identifier: identifier
    }
}

const userGetAccessRquestSuccess = (accessRequest, identifier) => {
    return {
        type: type.USER_GET_ACCESS_REQUEST_SUCCESS,
        accessRequest: accessRequest,
        identifier: identifier
    };
}

const userGetAccessRequestPermitSuccess = (permit, identifier) => {
    return {
        type: type.USER_GET_ACCESS_REQUEST_PERMIT_SUCCESS,
        permit: permit,
        identifier: identifier
    };
}

const getPlannersSuccess = (planners, identifier) => {
    return {
        type: type.ACCESS_REQUEST_PLANNER_GET_PLANNERS_SUCCESS,
        planners: planners,
        identifier: identifier
    };
}

const accessRequestFinish = () => {
    return {
        type: type.ACCESS_REQUEST_FINISH
    };
}

const accessRequestFail = (error) => {
    return {
        type: type.ACCESS_REQUEST_FAIL,
        error: error
    };
}

const accessRequestStateReset = () => {
    return {
        type: type.ACCESS_REQUEST_STATE_RESET
    };
}

export const userCreateAccessRequest = (idToken, localId, data, identifier) => {

    return dispatch => {

        dispatch(accessRequestStart());

        axios.post('/accessrequest', data, {
            headers: {
                idToken: idToken,
                localId: localId
            }
        })
        .then(res => {
            dispatch(userCreateAccessRequestSuccess(res.data.result.id, data, identifier));   
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const userUpdateAccessRequest = (uid, idToken, localId, data, identifier) => {
    
    return dispatch => {
        
        dispatch(accessRequestStart());

        axios.patch('/accessrequest', data, {
            headers: {
                idToken: idToken,
                localId: localId,
                param: uid
            }
        })
        .then(() => {
            dispatch(userUpdateAccessRequestSuccess(uid, data, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const plannerUpdateAccessRequest = (uid, idToken, localId, data, identifier) => {

    return dispatch => {
        dispatch(accessRequestStart());

        axios.patch('/accessrequest', data, {
            headers: {
                idToken: idToken,
                localId: localId,
                param: uid
            }
        })
        .then(() => {
            dispatch(plannerUpdateAccessRequestSuccess(uid, data, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });        
    };
}

export const userGetAccessRequest = (idToken, localId, uid, identifier) => {

    const getAccessRequest = new Promise((resolve, reject) => {
        axios.get('/accessrequest', { 
            headers: {
                idToken: idToken,
                localId: localId,
                uid: uid
            }
        })
        .then(res => {
            resolve(res.data.result[uid]);
        })
        .catch(err => {
            reject(err);
        })
    });

    const getAccessRequestDocuments = new Promise((resolve, reject) => {

         // set the document location reference
         const docListRef = ref(storage, `access_request_documents/${uid}/`);
         const docList = [];
    
         listAll(docListRef)
             .then(res => {
                 res.items.forEach((item) => {
                    docList.push({ name: item.name });
                 })
 
                 return () => docList.length = 0; // empty the array
 
             })
             .then(() => {
                resolve(docList);
             })
             .catch(err => {
                 reject(err);
             });
    });

    const getPlanners = new Promise((resolve, reject) => {
        axios.get('/planners', {
            headers: {
                idToken: idToken,
                localId: localId
            }
        })
        .then(res => {
            resolve(res.data.planners);
        })
        .catch(err => {
            reject(err);
        })
    });
    
    return dispatch => {

        dispatch(accessRequestStart());

        Promise.all([getAccessRequest, getAccessRequestDocuments, getPlanners])
            .then(res => {
                dispatch(userGetAccessRquestSuccess({ ...res[0], documents: [ ...res[1] ] }, identifier));
                dispatch(getPlannersSuccess([ ...res[2] ], identifier));
            })
            .then(() => {
                dispatch(accessRequestFinish());
            })
            .catch(err => {
                dispatch(accessRequestFail(err.message));
            })
    };
}

export const userGetAccessRequestPermit = (idToken, localId, uid, identifier) => {

    return dispatch => {
        
        dispatch(accessRequestStart());

        axios.get('/accessrequestpermit', {
            headers: {
                idToken: idToken,
                localId: localId,
                uid: uid
            }
        })
        .then(res => {
            dispatch(userGetAccessRequestPermitSuccess(res.data.result, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const userGetAccessRequests = (idToken, localId, startDate, endDate, identifier) => {

    return dispatch => {
        
        let headers = { headers: {
            idToken: idToken,
            localId: localId,
            startDate: startDate,
            endDate: endDate
        }};

        dispatch(accessRequestStart());

        axios.get('/accessrequests', headers)
        .then(res => {
            dispatch(userGetAccessRequestsSuccess(res.data.result, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const plannerGetAccessRequests = (idToken, localId, data, identifier) => {

    const { startDate, endDate, status, category, picop, pic, organisation, line, isolation, safetyResource, testTrams, signallingResource, electricalResource } = data;

    return dispatch => {
        
        let headers = { headers: {
            idToken: idToken,
            localId: localId,
            startDate: startDate,
            endDate: endDate,
            statusFilter: status,
            categoryFilter: category,
            picopFilter: picop,
            picFilter: pic,
            organisationFilter: organisation,
            lineFilter: line,
            isolationFilter: isolation,
            safetyResourceFilter: safetyResource,
            testTramsFilter: testTrams,
            signallingResourceFilter: signallingResource,
            electricalResourceFilter: electricalResource
        }};

        dispatch(accessRequestStart());

        axios.get('/planneraccessrequests', headers)
        .then(res => {
            dispatch(plannerGetAccessRequestsSuccess(res.data.result, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const plannerGetDailySummary = (idToken, localId, day, identifier) => {

    return dispatch => {
        
        let headers = { headers: {
            idToken: idToken,
            localId: localId,
            day: day,
        }};

        dispatch(accessRequestStart());

        axios.get('/dailysummary', headers)
        .then(res => {
            dispatch(plannerGetAccessRequestsSuccess(res.data.result, identifier));
        })
        .then(() => {
            dispatch(accessRequestFinish());
        })
        .catch(err => {
            dispatch(accessRequestFail(err.message));
        });
    };
}

export const userUploadDocument = (uid, doc, identifier) => {

    return dispatch => {
        dispatch(accessRequestStart());
        
        const docRef = ref(storage, `access_request_documents/${uid}/${doc.name}`)

        uploadBytes(docRef, doc)
            .then(() => {
                dispatch(userUploadAccessRequestDocumentSuccess({ name: doc.name }, identifier));
            })
            .then(() => {
                dispatch(accessRequestFinish());
            })
            .catch(err => {
                dispatch(accessRequestFail(err.message));
            });
    };
}

export const userDeleteUploadedDocument = (uid, fileName, identifier) => {

    return dispatch => {
        dispatch(accessRequestStart());

        const docRef = ref(storage, `access_request_documents/${uid}/${fileName}`);
        
        deleteObject(docRef)
            .then(() => {
                dispatch(userDeleteAccessRequestDocumentSuccess(fileName, identifier));
            })
            .then(() => {
                dispatch(accessRequestFinish());
            })
            .catch(err => {
                dispatch(accessRequestFail(err.message));
            });
    };
}

export const accessRequestResetState = () => {
    return dispatch => {
        dispatch(accessRequestStateReset());
    };
};



