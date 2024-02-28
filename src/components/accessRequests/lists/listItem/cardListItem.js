import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CardListItem = (props) => {
    
    const { item } = props;
    const accessRequest  = item[Object.keys(item)];

    const [hasPermit, setHasPermit] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        accessRequest.permit?.map((permit) => {
          if (permit.date === new Date().toISOString().slice(0, 10)) {
            setHasPermit(true);
          }
        });
      }, [accessRequest]);

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
            statusCSS.push('bg-info');
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
        case 'Cancelled':
            statusCSS.push('bg-info')
            break;
        default:
            break;
    }

    return (
        <div className='card p-3 mt-0 mb-2'>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    <h6 className='mb-1'>{ accessRequest && accessRequest.siteDetails.natureOfWork }</h6>
                    <p className='mb-0 opacity-75'>First Day: <small className='text-body-secondary'>{ accessRequest && accessRequest.siteDetails.accessFirstDay }</small></p>
                    <p className='mb-0 opacity-75'>Last Day: <small className='text-body-secondary'>{ accessRequest && accessRequest.siteDetails.accessLastDay }</small></p>
                    <p className='mb-0 opacity-75 mb-2'>Last Updated: <small className='text-body-secondary'>{ accessRequest && moment(accessRequest.updated).fromNow() }</small></p>
                    <Link className='btn btn-outline-primary btn-sm me-2' to={`/accessrequest/${Object.keys(item)}` }>View</Link>
                    { accessRequest.status === 'Granted' && hasPermit
                        ?   <Link className='btn btn-outline-primary btn-sm' to={`/accessrequest/permit/${Object.keys(item)}` }>View Permit</Link>
                        :   <small className='badge d-inline-block text-nowrap bg-info'>Permit Not available</small>
                    }
                </div>
                <div><span className={statusCSS.join(' ')}>{ accessRequest && accessRequest.status }</span></div>
            </div>    
        </div>
    );
}

export default CardListItem;