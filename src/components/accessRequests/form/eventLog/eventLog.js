import React from 'react';
import TableLogItem from './logItem/tableLogItem';
import CardLogItem from './logItem/cardLogItem';
import './eventLog.css';

const EventLog = (props) => {

    const { eventLog } = props;


    return (  
        <div>
            {/* for larger screens show a table */}
            <div className='event_table text-start'>
                <table className='w-100 table table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                    <thead className='border-bottom'>
                        <tr>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Date</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>User</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Event</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        { eventLog && eventLog.map((item, index) => (
                            <TableLogItem
                                key={ index }
                                item={ item }
                            />
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* For smaller screens show a list of cards */}
            <div className='container event_card p-0'>
                <div>
                    { eventLog && eventLog.map((item, index) => (
                        <CardLogItem
                            key={ index }
                            item={ item }
                        />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EventLog;