import React  from 'react';

import MapItem from './mapItem/mapItem';
// import locationList from '../../../data/locations';
import locationList from '../../../configuration/lists/locations.json';

const Map = (props) => {

    const { requests } = props;

    return (
        <div className='col mb-5'>
            
            <p className='h4 text-center'>Metrolink Network Map</p>
            
            <div className='map-item_container'>
                {   
                    locationList.map(item => {
                        return <MapItem key={item.code} location={item.location} code={item.code} requests={requests}/>
                    })
                }
            </div>
        </div>
    )
};

export default Map;