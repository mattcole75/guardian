import React from 'react';

const mapItem = (props) => {

    const {name, code } = props;

    let style = ['badge rounded-pill bg-secondary', 'map-item_' + code.toLowerCase()];
    return (
        <div className={style.join(' ')}>
            <span className="map-item_name">{name}</span>
            <span className="map-item_code">{code}</span>
        </div>
    )
}

export default mapItem;