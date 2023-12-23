import React from 'react';
import moment from 'moment';

const locationItem = (props) => {

    const { select, item, index } = props;

    const onSelect = () => {
        select(index, item);
    }

    let iconStyle = ['bi-geo-alt access-icon access-icon'];
    let badgeStyle = ['badge rounded-pill'];

    switch (item.status) {
        case 'Pending':
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
            break;
        case 'Unavailable':
            iconStyle.push('access-icon-decline');
            badgeStyle.push('bg-danger');
            break;
        case 'Confirmed':
            iconStyle.push('access-icon-approved');
            badgeStyle.push('bg-success');
            break;
        default:
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
    }

    return (
        <div className='list-group-item list-group-item-action d-flex gap-3 py-3' aria-current='true' onClick={onSelect}>
            <i className={iconStyle.join(' ')}></i>
            <div className='d-flex gap-2 w-100 justify-content-between' role='button'>
                <div>
                    <p className='mb-0 opacity-75'><strong>Start: </strong>{ item.startLocation + ' ' + moment(item.startDate + ' ' + item.startTime).format("YYYY/MM/DD HH:mm") }</p>
                    <p className='mb-0 opacity-75'><strong>End: </strong>{ item.endLocation + ' ' + moment(item.endDate + ' ' + item.endTime).format("YYYY/MM/DD HH:mm") }</p>
                </div>

                <div className='p-1'>
                    <small className={badgeStyle.join(' ')}>{item.status}</small>
                </div>
                
            </div>
        </div>
    );
}

export default locationItem;