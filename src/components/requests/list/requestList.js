import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItem from '../listItem/listItem';

const Requests = (props) => {

    const navigate = useNavigate();

    const { requests, select } = props;
    const roles = useSelector(state => state.auth.roles);

    let listTitle = 'Your Access Requests';

    if(roles.includes('coordinator'))
        listTitle = 'Access Requests Requiring Allocation';
    
    if(roles.includes('planner'))
        listTitle = 'Active Access Requests';

    const navigateToRequestItem = () => {
        navigate('/request');
    }
    
    return (
        <div className='mb-2'>
            <div className='row g-2 border-bottom mb-3'>
                <div className='form-floating  col-sm-6'>
                    <h3 className='h3 text-muted'>{listTitle}</h3>
                </div>
                {!roles.includes('coordinator')
                    ?   <div className='form-floating  col-sm-6'>
                            <div className='btn-group float-end' role="group" aria-label='Basic example'>
                                <button type='button' className='btn btn-success' onClick={navigateToRequestItem}>New Access Request</button>
                            </div>
                        </div>
                    :   null
                }
            </div>
            
            <div className='list-group'>
                {requests && requests.map((item, index) => (
                    <ListItem key={index} item={item} select={select} />
                ))}
            </div>
        </div>
    );
}

export default Requests;