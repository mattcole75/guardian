import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const DisruptiveListItem = (props) => {
    
const { item } = props;
const disruptive  = item[Object.keys(item)];


let statusCSS = [];
statusCSS.push('badge d-inline-block mb-2 text-nowrap');

switch(disruptive.status) {
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
    case 'Approved':
        statusCSS.push('bg-success');
        break;
    default:
        break;
}

    return (
        <div className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="h5 mb-1">{disruptive.summary.disruptiveTitle}</h5>
                <Link className='btn btn-sm btn-primary' to={`/accessrequest/${disruptive.accessRequestId}`}>Open</Link>
            </div>
            <div className='row g-2'>
                <p className="mb-1 form-floating col-sm-6">Raised: <small className="text-muted">{moment(disruptive.created).format('DD/MM/YYYY HH:mm')}</small></p>
                <p className="mb-1 form-floating  col-sm-6">Start Date: <small className="text-muted">{moment(disruptive.summary.disruptiveStartDate).format('DD/MM/YYYY')}</small></p>
            </div>
            <div className='row g-2 mb-3'>
                <p className="mb-1 form-floating  col-sm-6">Raised by: <small className="text-muted">{disruptive.createdBy}</small></p>
                <p className="mb-1 form-floating  col-sm-6">End Date: <small className="text-muted">{moment(disruptive.summary.disruptiveEndDate).format('DD/MM/YYYY')}</small></p>
            </div>
            
            <small className={statusCSS.join(' ')}>{disruptive.status}</small>
            <small> - Last updated: {moment(disruptive.updated).fromNow()}</small>
        </div>
    );
}

export default DisruptiveListItem;