import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { mapBoxKey } from '../../../configuration/config';

const LocationView = (props) => {

    const { name, locationType, mapLocation } = props;

    // set up the mapbox components
    mapboxgl.accessToken = mapBoxKey;
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if(map.current)
            return;
        

        // if(mapLocation.map) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                // style: 'mapbox://styles/mapbox/light-v11', // style URL
                style: 'mapbox://styles/mattcole75/clfifj5rj005701o0ibg3a3ip',
                // center: mapLocation.map.features[0].geometry.coordinates[0]
                // center: [-2.228999539811838, 53.41701012183114]
                // center: [lng, lat], // starting position
                zoom: 16 // starting zoom
            });
        // }
        
        // disable map zoom when using scroll
        map.current.scrollZoom.disable();
        
        
        // Add zoom and rotation controls to the map.
        map.current.addControl(new mapboxgl.NavigationControl());

    },[mapLocation]);

    useEffect(() => {
        
        if(!map.current)
            return;

        if(mapLocation !== null) {

            map.current.on('load', () => {

                // map.current.flyTo({ center: map.current.getCenter().ru });
                // map.current.
                // center: mapLocation.map.features[0].geometry.coordinates[0]

                let coordinates = [];
                mapLocation.map.features[0].geometry.coordinates.forEach(co => {
                    coordinates.push(co);
                });

                const bounds = coordinates.reduce((bounds, coord) => {
                    return bounds.extend(coord);
                }, new mapboxgl.LngLatBounds(coordinates));

                map.current.jumpTo({ center: mapLocation.map.features[0].geometry.coordinates[0]});

                map.current.fitBounds(bounds, {
                    padding: 40,
                    maxZoom: 16
                });
                map.current.addSource(name, { type: 'geojson', data: mapLocation.map });

                // Add an outline around the polygon.
                map.current.addLayer({
                    'id': 'outline',
                    'type': 'line',
                    'source': name,
                    'layout': {},
                    'paint': {
                        'line-color': 'red',
                        'line-width': 3
                    }
                });
            });
        }

        // Clean up on unmount
        return () => {
            map.current.remove();
            map.current = null;
        };

    }, [mapLocation, locationType, name]);

    return (
        <div className='container ps-0 pe-0'>
            <div ref={ mapContainer } className='map-container border rounded mt-0 mb-0' />
        </div>
    );
}

export default LocationView;