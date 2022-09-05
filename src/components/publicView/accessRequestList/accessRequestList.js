import React from 'react';
import AccessRequestListItem from './accessRequestListItem/accessRequestListItem';

const accessRequestList = (props) => {

    const { requests } = props;

    return (
        <div className="list-group col">
            {
                requests && requests.map((item, index) => (
                    <AccessRequestListItem key={index} item={item} />
                ))
            }
        </div>
    )
}

export default accessRequestList;