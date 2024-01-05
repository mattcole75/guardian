import React from 'react';
import TableListItem from './listItem/tableListItem';
import CardListItem from './listItem/cardListItem';
import '../accessRequests.css';

const List = (props) => {

    const { accessRequests } = props;


    return (
        <div>
            {/* for larger screens show a table */}
            <div className='access-request_table'>
                <table className='w-100 table table-hover table-borderless table-sm align-middle bg-light border-start border-end shadow-sm fs-7'>
                    <thead className='border-bottom'>
                        <tr className='w-auto'>
                            <th className='ps-3 pe-3 table-verticle_cente'><div className='table-item_col'>Site Description</div></th>
                            <th className='ps-3 pe-3 table-verticle_center'><div className='table-item_col'>First Day</div></th>
                            <th className='ps-3 pe-3 table-verticle_center'><div className='table-item_col'>Last Day</div></th>
                            <th className='ps-3 pe-3 table-verticle_center'><div className='table-item_col'>Last Updated</div></th>
                            <th className='ps-3 pe-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { accessRequests.map((item, index) => (
                            <TableListItem
                                key={ index }
                                item={ item }
                            />
                            ))
                        }
                    </tbody>
                    
                </table>
            </div>

            {/* For smaller screens show a list of cards */}
            <div className='container access-request_card mt-3 p-0'>
                <div>
                    { accessRequests.map((item, index) => (
                        <CardListItem
                            key={ index }
                            item={ item }
                        />    
                    )) }
                </div>
            </div>
            
            
            { accessRequests.length === 0
                ?   <div className='alert alert-warning text-sm-center' role='alert'>There are no Access Requests</div>
                :   null
            }
        </div>
    );
}

export default List;