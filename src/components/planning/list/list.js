import React from 'react';
import ListItem from './listItem/listItem';
// import '../accessRequests.css';

const List = (props) => {

    const { accessRequests } = props;


    return (
        <div className='table-responsive text-nowrap'>
            {/* <table className='w-100 table table-hover table-borderless table-sm align-middle bg-light border-start border-end shadow-sm fs-7'> */}
            <table className='table table-bordered'>
                <thead className='border-bottom'>
                    <tr>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Organisation</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Escalated</th>
                        <th>Posession Details</th>
                        <th>Co-Locatable</th>
                        <th>PICOP</th>
                        <th>PIC</th>
                        <th>NWR Adjacent</th>
                        <th>Line</th>
                        <th>Nature of Work</th>
                        <th>Isolation Type</th>
                        <th>Isolation Details</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Worksite Limits</th>
                        <th>S&T Support</th>
                        <th>E&M Support</th>
                        <th>Test Trams Required</th>
                        <th>Tram Configuration</th>
                        <th>OTM Count</th>
                        <th>RRV</th>
                        <th>Ironmen/Trolly</th>
                        <th>Tamper/Reg</th>
                        <th>Within Disruptive Possession</th>
                        <th>Site Remarks</th>
                        <th>Last Updated</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    { accessRequests.map((item, index) => (
                        <ListItem
                            key={ index }
                            item={ item }
                        />
                        ))
                    }
                </tbody>
                
            </table>
            
            { accessRequests.length === 0
                ?   <div className='alert alert-warning text-sm-center' role='alert'>There are no Access Requests</div>
                :   null
            }
        </div>
    );
}

export default List;