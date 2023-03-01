import React from 'react';
import EventLogItem from './eventLogItem/eventLogItem';

const EventLog = (props) => {

    const { eventLog } = props;


    return (
        
        // <div className='form-floating text-start'>

            <div className='text-start table-responsive'>
                {/* <table className='w-100 table table-sm table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7 mb-0'> */}
                <table className='w-100 table table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                    <thead className='border-bottom'>
                        <tr>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Date</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>User</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Event</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eventLog != null && eventLog.map((item, index) => {
                                return(<EventLogItem
                                            key={(item.routeDisrupted + String(index))}
                                            item={item}
                                        />);
                            })
                        }
                    </tbody>
                </table>
            </div>
        // </div>
    )
}

export default EventLog;