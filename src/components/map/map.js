import React, { useEffect, useCallback }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/actions/index';
import MapItem from './mapItem';
import locationList from './../../data/locations';

const Map = () => {

    const dispatch = useDispatch();
    const idToken = useSelector(state => state.auth.idToken);
    const mapItems = useSelector(state => state.map.mapItems);
    const onGetMapItems = useCallback((identifier) => dispatch(action.getMapRequests(idToken, identifier)), [dispatch, idToken])

    useEffect(() => {
        onGetMapItems('GET_MAP_ITEMS');
    },[onGetMapItems])

    return (
        <div>
            <div className="text-center m-3">
                <input type="date" />
            </div>
            <div className="map-container">
                {   
                    locationList.map(item => {
                        return <MapItem key={item.code} name={item.name} code={item.code} mapItems={mapItems}/>
                    })
                }
            </div>
        </div>
    )
};

export default Map;