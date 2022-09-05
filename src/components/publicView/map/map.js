import React  from 'react';

import MapItem from './mapItem/mapItem';
import locationList from '../../../data/locations';

const Map = (props) => {

    const { requests } = props;

    return (
        <div className='col'>
            <div className="map-container">
                {   
                    locationList.map(item => {
                        return <MapItem key={item.code} name={item.name} code={item.code} requests={requests}/>
                    })
                }
            </div>
        </div>
    )
};

export default Map;