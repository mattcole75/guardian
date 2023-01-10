import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ClosedAccessRequestListItem = (props) => {
    
const { item, isPlanner, closeRequestHandler, displayName } = props;
const accessRequest  = item[Object.keys(item)];

const dates = useMemo(() => [], []);
const locations = useMemo(() => [], []);

const [displayLocation, setDisplayLocations] = useState('Date Not Set');

useEffect(() => {

    dates.splice(0, dates.length);
    locations.splice(0, locations.length);

    accessRequest.locationLimitItems && accessRequest.locationLimitItems.forEach(item => {
        dates.push(moment(item.locationLimitStartDate).format('MMMM Do YYYY'))
    });

    accessRequest.locationLimitItems && accessRequest.locationLimitItems.forEach(item => {
        item.locations.forEach(loc => {
            locations.push(loc);
        });
    });
    setDisplayLocations(locations.join(' | '))
    
}, [accessRequest, dates, locations]);

const onClose = () => {
    closeRequestHandler(Object.keys(item)[0]);
}

let statusCSS = [];
statusCSS.push('badge d-inline-block mb-2 text-nowrap');

switch(accessRequest.status) {
    case 'Closed':
        statusCSS.push('bg-primary');
        break;
    case 'Granted':
        statusCSS.push('bg-success');
        break;
    default:
        break;
}

    return (
        <div className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="h5 mb-1">{accessRequest.summary.accessRequestTitle}</h5>

                {isPlanner && accessRequest.requestor.requestorName !== displayName
                    ?   <div>
                            <div className='dropdown text-end'>
                                <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    <span className='bi-three-dots-vertical fs-5' />
                                </div>
                                <ul className='dropdown-menu'>
                                    <li><Link className='dropdown-item' to={`/accessrequest/${Object.keys(item)}`}>Open</Link></li>
                                    <li><button className='dropdown-item' onClick={ onClose }>Close</button></li>
                                </ul>
                            </div>
                        </div>
                    :   <Link className='btn btn-sm btn-primary' to={`/accessrequest/${Object.keys(item)}`}>Open</Link>
                }
            </div>
            <p className="mb-1">Registered: <small className="text-muted">{moment(accessRequest.created).format('MMMM Do YYYY HH:mm')}</small></p>
            <p className="mb-1">Requestor: <small className="text-muted">{accessRequest.requestor.requestorName}</small></p>
            <p className="mb-1">Organisation: <small className="text-muted">{accessRequest.requestor.requestorOrganisation}</small></p>
            <p className="mb-1">Last Day: <small className="text-muted">{moment(accessRequest.summary.accessLastDay).format('DD/MM/YYYY')}</small></p>
            <p className="mb-1">Location(s): <small className="text-muted">{displayLocation}</small></p>
            {(accessRequest && accessRequest.administration && accessRequest.administration.assignedPlanner)
                ?   <p className="mb-1">Assigned Planner: <small className="text-muted">{accessRequest.administration.assignedPlanner}</small></p>
                :   null
            }
            <small className={statusCSS.join(' ')}>{accessRequest.status}</small>
            <small> - Completed: {moment(accessRequest.summary.accessLastDay).fromNow()}</small>
        </div>
    );
}

export default ClosedAccessRequestListItem;