import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const AccessRequestListItem = (props) => {
    
const { item, isPlanner } = props;
const accessRequests  = item[Object.keys(item)];

const dates = useMemo(() => [], []);
const locations = useMemo(() => [], []);

const [displayDates, setDisplayDates] = useState('Date Not Set');
const [displayLocation, setDisplayLocations] = useState('Date Not Set');

useEffect(() => {

    dates.splice(0, dates.length);
    locations.splice(0, locations.length);

    accessRequests.locationLimitItems && accessRequests.locationLimitItems.forEach(item => {
        dates.push(moment(item.locationLimitStartDate).format('MMMM Do YYYY'))
    });
    setDisplayDates(dates.join(' | '));

    accessRequests.locationLimitItems && accessRequests.locationLimitItems.forEach(item => {
        item.locations.forEach(loc => {
            locations.push(loc);
        });
    });
    setDisplayLocations(locations.join(' | '))
    
}, [accessRequests, dates, locations]);


let statusCSS = [];
statusCSS.push('badge d-inline-block mb-2 text-nowrap');

switch(accessRequests.status) {
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
    default:
        break;
}

    return (

        <div className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="h5 mb-1">{accessRequests.summary.accessRequestTitle}</h5>

                {isPlanner
                    ?   <div>
                            <div className='dropdown text-end'>
                                <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    <span className='bi-three-dots-vertical fs-5' />
                                </div>
                                <ul className='dropdown-menu'>
                                    <li><Link className='dropdown-item' to={`/accessrequest/${Object.keys(item)}`}>Open</Link></li>
                                    {accessRequests.summary.isDisruptive === true
                                        ?   <li><Link className='dropdown-item' to={`/disruptive/${Object.keys(item)}`}>Manage Disruptive</Link></li>
                                        :   null
                                    }
                                </ul>
                            </div>
                        </div>
                    :   <Link className='btn btn-sm btn-primary' to={`/accessrequest/${Object.keys(item)}`}>Open</Link>
                }
            </div>
            <p className="mb-1">Registered: <small className="text-muted">{moment(accessRequests.created).format('MMMM Do YYYY HH:mm')}</small></p>
            <p className="mb-1">Date(s): <small className="text-muted">{displayDates}</small></p>
            <p className="mb-1">Location(s): <small className="text-muted">{displayLocation}</small></p>
            {(accessRequests && accessRequests.administration && accessRequests.administration.assignedPlanner)
                ?   <p className="mb-1">Assigned Planner: <small className="text-muted">{accessRequests.administration.assignedPlanner}</small></p>
                :   null
            }
            <small className={statusCSS.join(' ')}>{accessRequests.status}</small>
            <small> - Last updated: {moment(accessRequests.updated).fromNow()}</small>
        </div>
    );
}

export default AccessRequestListItem;