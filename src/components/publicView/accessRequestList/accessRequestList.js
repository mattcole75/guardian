import React from 'react';
import AccessRequestListItem from './accessRequestListItem/accessRequestListItem';

const accessRequestList = (props) => {

    const { requests, roles } = props;

    return (
        <div className="list-group col">
            { requests.length > 0
                 ?  requests.map((item, index) => (
                        <AccessRequestListItem key={index} item={item} roles={roles}/>
                    ))
                :   <div className='alert alert-warning text-sm-center' role='alert'>No Access Requests have been registered for this week</div>
            }
        </div>
    )
}

export default accessRequestList;