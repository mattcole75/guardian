import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItem from './listItem/listItem';

const List = (props) => {

    const { accessRequests } = props;
    const roles = useSelector(state => state.auth.roles);

    const isPlanner = roles.includes('planner');
    const isCoordinator = roles.includes('coordinator');
    const isDisruptionAuthority = roles.includes('disruptionAuthority');

    let listTitle = 'Your Access Requests';

    if(roles.includes('coordinator'))
        listTitle = 'Access Requests Requiring Allocation';
    
    if(roles.includes('planner'))
        listTitle = 'Active Access Requests';
    
    if(roles.includes('disruptionAuthority'))
        listTitle = 'Disruptive Access Requests'
    
    return (
        <div className='mb-2'>
            <div className='row g-2 border-bottom mb-3'>
                <div className='form-floating  col-sm-6'>
                    <h3 className='h3 text-muted'>{listTitle}</h3>
                </div>
                { !isPlanner && !isCoordinator && !isDisruptionAuthority
                    ?    <div className='form-floating  col-sm-6 mt-3 mb-3'>
                            <div className='btn-group float-end' role="group" aria-label='Basic example'>
                                <Link className='btn btn-primary rounded-5 me-3' to={`/accessrequest/new`}>New Access Request</Link>
                            </div>
                        </div>
                    :   null
                }
            </div>
        
            { accessRequests.length > 0
                ?   <div className='list-group shadow'>
                        {accessRequests.map((item, index) => (
                            <ListItem key={index} item={item} isPlanner={isPlanner} />
                        ))}
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>You have no Access Requests</div>
            }
        </div>
    );
}

export default List;