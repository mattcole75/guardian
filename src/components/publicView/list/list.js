import React from 'react';
import ListItem from './listItem/listItem';

const List = (props) => {

    const { requests, roles } = props;

    return (
        <div className='list-group col px-1'>
            { requests.length > 0
                 ?  requests.map((item, index) => (
                        <ListItem key={ index } item={ item } roles={ roles }/>
                    ))
                :   <div className='alert alert-warning text-sm-center' role='alert'>No Access Requests have been registered for this week</div>
            }
        </div>
    )
}

export default List;