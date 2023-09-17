import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ListItem = (props) => {
    const { item, closeHandler } = props;
    const speedRestriction = item[Object.keys(item)];

    const onClose = () => {
        closeHandler(Object.keys(item)[0]);
    }

    let statusCSS = [];
    statusCSS.push('badge d-inline-block mb-2 text-nowrap');

    switch(speedRestriction.status) {
        case 'New':
            statusCSS.push('bg-danger');
            break;
        case 'Under Review':
            statusCSS.push('bg-primary');
            break;
        case 'Reviewed':
            statusCSS.push('bg-success');
            break;
        default:
            break;
    }

    return (
        <tr className='border-bottom'>
            <td className='ps-3 pe-3'><div>{ moment(speedRestriction.startDate + ' ' + speedRestriction.startTime).format('DD/MM/YYYY HH:mm') }</div></td>
            <td className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>{ speedRestriction.type ? speedRestriction.type : 'Not Set' }</div></td>
            <td className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>{ speedRestriction.location }</div></td>
            <td className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>{ speedRestriction.direction }</div></td>
            <td className='ps-3 pe-3 table-item_hide'><div className='table-item_col'>{ speedRestriction.speedRestriction }</div></td>
            <td className='ps-3 pe-3'>{ <small className={statusCSS.join(' ')}>{speedRestriction.status}</small> }</td>

            <td className='ps-3 pe-3'>
                <div>
                    <div className='dropdown text-end'>
                        <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                            <span className='bi-three-dots-vertical fs-5' />
                        </div>
                        <ul className='dropdown-menu'>
                            <li><Link className='dropdown-item' to={ `/speedrestriction/${Object.keys(item)}` }>Edit</Link></li>
                            <li><button className='dropdown-item' onClick={ onClose }>Close</button></li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default ListItem;