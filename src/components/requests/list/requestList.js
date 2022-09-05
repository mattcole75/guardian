import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '../listItem/listItem';

const Requests = (props) => {

    const { requests, select } = props;
    const roles = useSelector(state => state.auth.roles);

    let listTitle = 'Your Access Requests';

    if(roles.includes('coordinator'))
        listTitle = 'Access Requests Requiring Allocation';
    
    if(roles.includes('planner'))
        listTitle = 'Active Access Requests';
    
    return (
        <div className='mb-2'>
            <p className='h3 text-muted'>{listTitle}</p>
            <div className="list-group">
                {requests && requests.map((item, index) => (
                    <ListItem key={index} item={item} select={select} />
                ))}
            </div>
        </div>
    );
}

export default Requests;