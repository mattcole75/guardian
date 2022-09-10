import React from 'react';

const mapItem = (props) => {

    const { name, code, requests } = props;

    let styles = ['badge rounded-pill bg-secondary', 'map-item_' + code.toLowerCase()];

    requests.forEach(req => {
        req.locations && req.locations.forEach(loc => {

            if(loc === name) {
                styles.push('location-shadow');
                styles.push('bg-warning text-dark');
            } else {
                styles.push('bg-secondary');
            }
        });
    });

    return (
        <div className={styles.join(' ')}>
            <div data-bs-toggle='tooltip' data-bs-placement='right' title={name} >
                <span className='map-item_name'>{name}</span>
                <span className='map-item_code'>{code}</span>
            </div>
        </div>
    )
}

export default mapItem;