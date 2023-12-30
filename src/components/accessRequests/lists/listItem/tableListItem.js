import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ListItem = (props) => {
    
const { item } = props;
const accessRequest  = item[Object.keys(item)];


let statusCSS = [];
statusCSS.push('badge d-inline-block mb-2 text-nowrap');

switch(accessRequest.status) {
    case 'Draft':
        statusCSS.push('bg-secondary');
        break;
    case 'Submitted':
        statusCSS.push('bg-warning text-dark');
        break;
    case 'Under Review':
        statusCSS.push('bg-warning text-dark');
        break;
    case 'Denied':
        statusCSS.push('bg-danger');
        break;
    case 'Granted':
        statusCSS.push('bg-success');
        break;
    case 'Closed':
        statusCSS.push('bg-secondary')
        break;
    default:
        break;
}

    return (
        <tr className='border-bottom'>
            <td className='ps-3 pe-3'><div>{ accessRequest.siteDetails.siteDescription }</div></td>
            <td className='ps-3 pe-3'>{ accessRequest.siteDetails.accessFirstDay ? accessRequest.siteDetails.accessFirstDay : 'Not Set'  }</td>
            <td className='ps-3 pe-3'>{ accessRequest.siteDetails.accessLastDay ? accessRequest.siteDetails.accessLastDay : 'Not Set'  }</td>
            <td className='ps-3 pe-3'>{ moment(accessRequest.updated).fromNow() }</td>
            <td className='ps-3 pe-3'>{ <small className={statusCSS.join(' ')}>{accessRequest.status}</small> }</td>
            <td className='ps-3 pe-3'>
            <Link className='btn btn-outline-primary btn-sm' to={`/accessrequest/${Object.keys(item)}` }>View</Link>
            </td>
        </tr>
    );
}

export default ListItem;