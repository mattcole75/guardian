import React from 'react';

const mapItem = (props) => {

    const { name, code, mapItems } = props;

    let styles = ['badge rounded-pill bg-secondary', 'map-item_' + code.toLowerCase()];
    let tooltip = [];

    mapItems.forEach(element => {
        element.locationLimitItems.forEach(item => {
            item.locations.forEach(loc => {
                if(loc === name) {
                    styles.push('location-shadow');
                    styles.push('bg-warning text-dark');
                    tooltip.push('Date: ' + item.locationLimitDate);
                    tooltip.push('Title: ' + element.accessRequestTitle);
                    tooltip.push('Disruptive: ' + element.accessTypeDisruptive);
                    tooltip.push('Status: ' + item.locationLimitStatus);
                    tooltip.push('Type: ' + item.locationLimitType);
                    tooltip.push('Locations: ' + item.locations);
                } else {
                    styles.push('bg-secondary');
                }
            });
        });
    });

    return (
        <div className={styles.join(' ')}>
            <div data-bs-toggle="tooltip" data-bs-placement="right" title={tooltip.join('\n')} >
                <span className="map-item_name">{name}</span>
                <span className="map-item_code">{code}</span>
            </div>
        </div>
    )
}

export default mapItem;