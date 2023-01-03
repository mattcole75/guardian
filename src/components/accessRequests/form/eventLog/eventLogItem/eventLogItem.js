import React from 'react';
import moment from 'moment';

const EventLogItem = (props) => {

    const { item } = props;

    return (
        <tr className='border-bottom'>
            <td className='ps-3 pe-3'>
                <div className='table-item_col'>
                    <p className='mb-0'>{ moment(item.logged).format('DD/MM/YYYY HH:mm') }</p>
                </div>
            </td>

            <td className='ps-3 pe-3'>
                <div className='table-item_col'>
                <p className='mb-0'>{ item.user }</p>
                </div>
            </td>

            <td className='ps-3 pe-3'>
                <div className='table-item_col'>
                <p className='mb-0'>{ item.event }</p>
                </div>
            </td>
        </tr>
    );
}

export default EventLogItem;