import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';

import Filter from './filter/filter';
import Map from './map/map';
import AccessRequestList from './accessRequestList/accessRequestList';

const PublicView = () => {

    const dispatch = useDispatch();
    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const publicViewRequests = useSelector(state => state.publicView.requests);

    const onGetPublicRequests = useCallback((idToken, localId, identifier) => dispatch(action.getPublicViewRequests(idToken, localId, identifier)), [dispatch])

    useEffect(() => {
        onGetPublicRequests(idToken, localId,'GET_PUBLIC_VIEW_REQUESTS');
    },[idToken, localId, onGetPublicRequests])

    return (
        <div className='container'>
            <Filter />
            <div className='row'>
                <Map requests={publicViewRequests} />
                <AccessRequestList requests={publicViewRequests}/>
            </div>
            
        </div>
        
    );
}

export default PublicView;