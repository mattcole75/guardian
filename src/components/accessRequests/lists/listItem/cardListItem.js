import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CardListItem = (props) => {
    
    const { item } = props;
    const accessRequest  = item[Object.keys(item)];

    let statusCSS = [];
    statusCSS.push('badge d-inline-block mb-2 text-nowrap');

    switch(accessRequest && accessRequest.status) {
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
        case 'Completed':
            statusCSS.push('bg-secondary')
            break;
        default:
            break;
    }

    return (
        <div className='card p-3 mt-0 mb-2'>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    <h6 className='mb-1'>{ accessRequest && accessRequest.siteDetails.siteDescription }</h6>
                    <p className='mb-0 opacity-75'>First Day: <small className='text-body-secondary'>{ accessRequest && accessRequest.siteDetails.accessFirstDay }</small></p>
                    <p className='mb-0 opacity-75'>Last Day: <small className='text-body-secondary'>{ accessRequest && accessRequest.siteDetails.accessLastDay }</small></p>
                    <p className='mb-0 opacity-75 mb-2'>Last Updated: <small className='text-body-secondary'>{ accessRequest && moment(accessRequest.updated).fromNow() }</small></p>
                    <Link className='btn btn-outline-primary btn-sm' to={`/accessrequest/${Object.keys(item)}` }>View</Link>
                </div>
                <div><span className={statusCSS.join(' ')}>{ accessRequest && accessRequest.status }</span></div>
            </div>    
        </div>
    );
}

export default CardListItem;