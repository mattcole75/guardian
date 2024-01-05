import React from 'react';
import moment from 'moment';

const locationItem = (props) => {

    const { select, item, index } = props;

    const onSelect = () => {
        select(index, item);
    }

    return (
        <div className='list-group-item list-group-item-action d-flex gap-3 py-3' aria-current='true' onClick={ onSelect }>
            <i className='bi-geo-alt access-icon access-icon-pending'></i>
            <div className='d-flex gap-2 w-100 justify-content-between' role='button'>
                <div>
                    <p className='mb-0 opacity-75'><strong>Locations: </strong>{ item.locationList.join(', ') }</p>
                    <p className='mb-0 opacity-75'><strong>Dates: </strong>{ moment(item.startDate + ' ' + item.startTime).format("DD/MM/YYYY HH:mm") + ' to ' + moment(item.endDate + ' ' + item.endTime).format("DD/MM/YYYY HH:mm") }</p>
                    <p className='mb-0 opacity-75'><strong>Shifts: </strong>{ item.shifts}</p>
                </div>
            </div>
        </div>
    );
}

export default locationItem;