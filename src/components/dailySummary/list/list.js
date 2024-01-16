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
                        <th>Posession Details</th>
                        <th>PICOP</th>
                        <th>Organisation</th>
                        <th>Worksite Limits</th>
                        <th>Nature of Work</th>
                        <th>Ironmen/Trolly</th>
                        <th>RRV</th>
                        <th>Tamper/Reg</th>
                        <th>PIC</th>
                        <th>Status</th>
                        <th>Category</th>
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