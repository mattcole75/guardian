import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { mapBoxKey } from '../../../configuration/config';

const MapEdit = (props) => {

    const { name, locationType, mapLocation, save, close } = props;

    // set up the mapbox components
    mapboxgl.accessToken = mapBoxKey;
    const mapContainer = useRef(null);
    const map = useRef(null);
    const draw = useRef(null);
    
    const saveHandler = () => {
        save({map: draw.current.getAll()});
        close();
    }

    useEffect(() => {
        if(map.current)
            return;
        
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mattcole75/clfifj5rj005701o0ibg3a3ip',
            center: [-2.238967, 53.481557],
            zoom: 16 // starting zoom
        });

        draw.current = new MapboxDraw(
        {
            styles: [
                {
                    "id": "gl-draw-line",
                    "type": "line",
                    "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                    "layout": {
                      "line-cap": "round",
                      "line-join": "round"
                    },
                    "paint": {
                      "line-color": "#D20C0C",
                      "line-dasharray": [0.2, 2],
                      "line-width": 4
                    }
                },
                // polygon fill
                {
                  "id": "gl-draw-polygon-fill",
                  "type": "fill",
                  "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                  "paint": {
                    "fill-color": "#D20C0C",
                    "fill-outline-color": "#D20C0C",
                    "fill-opacity": 0.1
                  }
                },
                // polygon mid points
                {
                  'id': 'gl-draw-polygon-midpoint',
                  'type': 'circle',
                  'filter': ['all',
                    ['==', '$type', 'Point'],
                    ['==', 'meta', 'midpoint']],
                  'paint': {
                    'circle-radius': 3,
                    'circle-color': '#fbb03b'
                  }
                },
                // polygon outline stroke
                // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
                {
                  "id": "gl-draw-polygon-stroke-active",
                  "type": "line",
                  "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                  "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                  },
                  "paint": {
                    "line-color": "#D20C0C",
                    "line-dasharray": [0.2, 2],
                    "line-width": 2
                  }
                },
                // vertex point halos
                {
                  "id": "gl-draw-polygon-and-line-vertex-halo-active",
                  "type": "circle",
                  "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                  "paint": {
                    "circle-radius": 5,
                    "circle-color": "#FFF"
                  }
                },
                // vertex points
                {
                  "id": "gl-draw-polygon-and-line-vertex-active",
                  "type": "circle",
                  "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                  "paint": {
                    "circle-radius": 3,
                    "circle-color": "#D20C0C",
                  }
                },
            
                // INACTIVE (static, already drawn)
                // line stroke
                {
                    "id": "gl-draw-line-static",
                    "type": "line",
                    "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
                    "layout": {
                      "line-cap": "round",
                      "line-join": "round"
                    },
                    "paint": {
                      "line-color": "#000",
                      "line-width": 4
                    }
                },
                // polygon fill
                {
                  "id": "gl-draw-polygon-fill-static",
                  "type": "fill",
                  "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
                  "paint": {
                    "fill-color": "#000",
                    "fill-outline-color": "#000",
                    "fill-opacity": 0.1
                  }
                },
                // polygon outline
                {
                  "id": "gl-draw-polygon-stroke-static",
                  "type": "line",
                  "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
                  "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                  },
                  "paint": {
                    "line-color": "#000",
                    "line-width": 3
                  }
                }
            ]
        });
        
        map.current.addControl(draw.current, 'top-right');

    });

    useEffect(() => {
        if(!map.current)
            return;

        
        if(mapLocation !== null) {
            
            map.current.on('load', () => {

                // add polygon to the map
                // map.current.flyTo({ center: map.current.getCenter().ru });

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

                draw.current.add(mapLocation.map);
                
            });
        }

        // Clean up on unmount
        return () => {
            map.current.remove();
            map.current = null;
        };

    }, [mapLocation, locationType, name]);

    return (
        <div className='container form-map ps-0 pe-0'>
            <div ref={ mapContainer } className='map-container mt-0 mb-3' />
            <div className='form-floating mb-3'>
                <button
                    className='w-100 btn btn-primary'
                    type='button'
                    onClick={ saveHandler }>Set</button>
            </div>

            <div className='form-floating'>
                <button
                    className='w-100 btn btn-secondary'
                    type='button'
                    onClick={ close }>Close</button>
            </div>
        </div>
    );

}

export default MapEdit;