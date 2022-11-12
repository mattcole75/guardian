import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ListItem = (props) => {
    
const { item } = props;
const request  = item[Object.keys(item)];

const onSelect = () => {
    // select(item);
};


const dates = useMemo(() => [], []);
const locations = useMemo(() => [], []);

const [displayDates, setDisplayDates] = useState('Date Not Set');
const [displayLocation, setDisplayLocations] = useState('Date Not Set');

useEffect(() => {

    dates.splice(0, dates.length);
    locations.splice(0, locations.length);

    request.locationLimitItems && request.locationLimitItems.forEach(item => {
        dates.push(moment(item.locationLimitStartDate).format('MMMM Do YYYY'))
    });
    setDisplayDates(dates.join(' | '));

    request.locationLimitItems && request.locationLimitItems.forEach(item => {
        item.locations.forEach(loc => {
            locations.push(loc);
        });
    });
    setDisplayLocations(locations.join(' | '))
    
}, [request, dates, locations]);


let statusCSS = [];
statusCSS.push('badge d-inline-block mb-2 text-nowrap');

switch(request.status) {
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

        <div className="list-group-item list-group-item-action" onClick={onSelect}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="h5 mb-1">{request.accessRequestTitle}</h5>
                <div>
                    <div className='dropdown text-end'>
                        <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                            <span className='bi-three-dots-vertical fs-5' />
                        </div>
                        <ul className='dropdown-menu'>
                            <li><Link className='dropdown-item' to={`/request/${Object.keys(item)}`}>Edit</Link></li>
                            <li><button type='button' className='dropdown-item' onClick={() => {}}>Delete</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className="mb-1">Registered: <small className="text-muted">{moment(request.created).format('MMMM Do YYYY HH:mm')}</small></p>
            <p className="mb-1">Date(s): <small className="text-muted">{displayDates}</small></p>
            <p className="mb-1">Location(s): <small className="text-muted">{displayLocation}</small></p>
            {(request && request.assignedPlanner)
                ?   <p className="mb-1">Assigned Planner: <small className="text-muted">{request.assignedPlanner}</small></p>
                :   null
            }
            <small className={statusCSS.join(' ')}>{request.status}</small>
            <small> - Last updated: {moment(request.updated).fromNow()}</small>
        </div>
    );
}

export default ListItem;