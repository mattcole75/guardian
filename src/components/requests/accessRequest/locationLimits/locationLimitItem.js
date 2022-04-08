import React from 'react';

const locationLimitItem = (props) => {

    const { select, toggle, item, index } = props;

    const onSelect = () => {
        select(index);
        toggle();
    }

    let iconStyle = ['bi-wrench access-icon access-icon'];
    let badgeStyle = ['badge rounded-pill'];

    switch (item.locationLimitStatus) {
        case 'pending':
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
            break;
        case 'declined':
            iconStyle.push('access-icon-decline');
            badgeStyle.push('bg-danger');
            break;
        case 'approved':
            iconStyle.push('access-icon-approved');
            badgeStyle.push('bg-success');
            break;
        default:
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
    }

    return (
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={onSelect}>
            <i className={iconStyle.join(' ')}></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div>
                    <p className="mb-0 opacity-75"><strong>Location(s): </strong>{item.locations.join(', ')}</p>
                    <p className="mb-0 opacity-75"><strong>Date/Time: </strong>{item.locationLimitDate}</p>
                    <p className="mb-0 opacity-75"><strong>Type: </strong>{item.locationLimitType}</p>
                    <p className="mb-0 opacity-75"><strong>Duration: </strong>{item.locationLimitDuration}{item.durationType}</p>
                </div>
                <div className="p-1">
                    <small className={badgeStyle.join(' ')}>{item.locationLimitStatus}</small>
                </div>
                
            </div>
        </div>
    );
}

export default locationLimitItem;