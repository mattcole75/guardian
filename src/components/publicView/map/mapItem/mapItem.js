import React from 'react';

const mapItem = (props) => {

    const { location, code, requests } = props;

    let styles = ['badge rounded-pill bg-secondary', 'map-item_' + code.toLowerCase()];

    requests.forEach(req => {


        // req.location && req.location.forEach(loc => {
            if(req.startLocation === location || req.endLocation === location) {
                styles.push('location-shadow');
                styles.push('bg-warning text-dark');
            } else {
                styles.push('bg-secondary');
            }
        // });
    });

    return (
        <div className={styles.join(' ')}>
            <div data-bs-toggle='tooltip' data-bs-placement='right' title={location}>
                <span className='map-item_name'>{location}</span>
                <span className='map-item_code'>{code}</span>
            </div>
        </div>
    )
}

export default mapItem;