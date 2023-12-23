import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './listItem/listItem';

const List = (props) => {

    const { accessRequests, closeRequestHandler, deleteRequestHandler, displayName } = props;
    const roles = useSelector(state => state.auth.roles);

    const isPlanner = roles.includes('planner');

    return (
        <div>
            <table className='w-100 table table-hover table-borderless table-sm align-middle bg-light border-start border-end shadow-sm fs-7'>
                <thead className='border-bottom'>
                    <tr className='w-auto'>
                        <th className='ps-3 pe-3 table-verticle_cente'><div className='table-item_col'>Site Description</div></th>
                        <th className='ps-3 pe-3 table-verticle_center'><div className='table-item_col'>First Day</div></th>
                        <th className='ps-3 pe-3 table-verticle_center'><div className='table-item_col'>Last Day</div></th>
                        <th className='ps-3 pe-3'>Status</th>
                        <th className='ps-3 pe-3'></th>
                    </tr>
                </thead>
                <tbody>
                    {   accessRequests.map((item, index) => (
                            <ListItem key={ index } item={ item } isPlanner={ isPlanner } closeRequestHandler={ closeRequestHandler } deleteRequestHandler={ deleteRequestHandler } displayName={ displayName } />
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