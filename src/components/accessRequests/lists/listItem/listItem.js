import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = (props) => {
    
const { item, isPlanner, closeRequestHandler, deleteRequestHandler, displayName } = props;
const accessRequest  = item[Object.keys(item)];

const onDelete = () => {
    deleteRequestHandler(Object.keys(item)[0]);
}

const onClose = () => {
    closeRequestHandler(Object.keys(item)[0])
}


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
            <td className='ps-3 pe-3'>{ <small className={statusCSS.join(' ')}>{accessRequest.status}</small> }</td>
            <td className='ps-3 pe-3'>
            {isPlanner && accessRequest.requestor.name !== displayName
                    ?   <div>
                            <div className='dropdown text-end'>
                                <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    <span className='bi-three-dots-vertical fs-5' />
                                </div>
                                <ul className='dropdown-menu'>
                                    <li><Link className='dropdown-item' to={ `/accessrequest/${Object.keys(item)}` }>View</Link></li>
                                    <li><button className='dropdown-item' onClick={ onClose }>Close</button></li>
                                    <li><hr /></li>
                                    <li><button className='dropdown-item' onClick={ onDelete }>Delete</button></li>
                                </ul>
                            </div>
                        </div>
                    :   <Link className='btn btn-outline-primary btn-sm' to={`/accessrequest/${Object.keys(item)}` }>View</Link>
                }
                
                
                
                
            </td>
        </tr>

        // <div className="list-group-item list-group-item-action">
        //     <div className="d-flex w-100 justify-content-between">
        //         <h5 className="h5 mb-1">{accessRequests.summary.accessRequestTitle}</h5>

        //         {isPlanner && accessRequests.requestor.requestorName !== displayName
        //             ?   <div>
        //                     <div className='dropdown text-end'>
        //                         <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
        //                             <span className='bi-three-dots-vertical fs-5' />
        //                         </div>
        //                         <ul className='dropdown-menu'>
        //                             <li><Link className='dropdown-item' to={`/accessrequest/${Object.keys(item)}`}>Open</Link></li>
        //                             <li><button className='dropdown-item' onClick={onDelete}>Delete</button></li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             :   <Link className='btn btn-sm btn-primary' to={`/accessrequest/${Object.keys(item)}`}>Open</Link>
        //         }
        //     </div>
        //     <p className="mb-1">Registered: <small className="text-muted">{moment(accessRequests.created).format('MMMM Do YYYY HH:mm')}</small></p>
        //     <p className="mb-1">Date(s): <small className="text-muted">{displayDates}</small></p>
        //     <p className="mb-1">Location(s): <small className="text-muted">{displayLocation}</small></p>
        //     {(accessRequests && accessRequests.administration && accessRequests.administration.assignedPlanner)
        //         ?   <p className="mb-1">Assigned Planner: <small className="text-muted">{accessRequests.administration.assignedPlanner}</small></p>
        //         :   null
        //     }
        //     <small className={statusCSS.join(' ')}>{accessRequests.status}</small>
        //     <small> - Last updated: {moment(accessRequests.updated).fromNow()}</small>
        // </div>
    );
}

export default ListItem;