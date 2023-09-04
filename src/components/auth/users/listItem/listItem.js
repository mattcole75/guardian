import React from 'react';

const ListItem = (props) => {

    const { item, selectUser } = props;
    // const   = item[Object.keys(item)];
    const { displayName, email, disabled } = item;
    
    return (

        <tr className='border-bottom'>
            <td className='ps-3 pe-3'><div>{ displayName }</div></td>
            <td className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>{email}</div></td>
            <td className='ps-3 pe-3'>{disabled 
                    ? <span className='badge text-nowrap bg-danger'>Disabled</span>
                    : <span className='badge text-nowrap bg-success'>Active</span>
                }
            </td>
            <td className='ps-3 pe-3'>
                <button className='btn btn-outline-primary btn-sm' onClick={ () => { selectUser(item) } }>Edit</button>
            </td>
        </tr>
    );
}

export default ListItem;