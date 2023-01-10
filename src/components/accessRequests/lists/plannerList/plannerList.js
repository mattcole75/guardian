import React from 'react';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccessRequestListItem from '../listItems/accessRequestListItem';

const PlannerList = (props) => {

    const { accessRequests, deleteRequestHandler, displayName } = props;
    const roles = useSelector(state => state.auth.roles);

    const isPlanner = roles.includes('planner');

    return (
        <div className='mb-2 mt-3'>
            <div className='row g-2 border-bottom mb-3'>
                <div className='form-floating  col-sm-6'>
                    <h3 className='h3 text-muted'>Access Requests for Review</h3>
                </div>
                {/* <div className='form-floating  col-sm-6 mt-3 mb-3'>
                    <div className='btn-group float-end' role="group" aria-label='Basic example'>
                        <Link className='btn btn-primary rounded-5 me-3' to={`/accessrequest/new`}>New Access Request</Link>
                    </div>
                </div> */}
            </div>
        
            { accessRequests.length > 0
                ?   <div className='list-group shadow'>
                        {accessRequests.map((item, index) => (
                            <AccessRequestListItem key={index} item={item} isPlanner={isPlanner} deleteRequestHandler={deleteRequestHandler} displayName={displayName} />
                        ))}
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>There are no access requests to review</div>
            }
        </div>
    );
}

export default PlannerList;