import React from 'react';
import { useSelector } from 'react-redux';
import ClosedAccessRequestListItem from '../listItems/closedAccessRequestListItem';

const ClosedList = (props) => {

    const { accessRequests, displayName, closeRequestHandler } = props;
    const roles = useSelector(state => state.auth.roles);

    const isPlanner = roles.includes('planner');

    return (
        <div className='mb-2 mt-3'>
            <div className='row g-2 border-bottom mb-3'>
                <div className='form-floating  col-sm-6'>
                    <h3 className='h3 text-muted'>Past Access Requests for Closing</h3>
                </div>
            </div>
        
            { accessRequests.length > 0
                ?   <div className='list-group shadow'>
                        {accessRequests.map((item, index) => (
                            <ClosedAccessRequestListItem key={index} item={item} isPlanner={isPlanner} displayName={displayName} closeRequestHandler={closeRequestHandler}  />
                        ))}
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>You have no Access Requests</div>
            }
        </div>
    );
}

export default ClosedList;