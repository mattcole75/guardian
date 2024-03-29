import React from 'react';
import moment from 'moment';
import '../../publicView.css';

const accessRequestListItem = (props) => {

    const { item, roles } = props;

    const { organisation, siteDescription, startDate, endDate, locations, status, isolationType, electricalResourceRequired, signallingResourceRequired, testTramsRequired, coLocate } = item;

    let statusStyle = ['badge d-inline-block mb-2 text-nowrap h-100 ms-lg-1'];

    switch(status) {
        case 'Draft':
            statusStyle.push('bg-secondary');
            break;
        case 'Submitted':
            statusStyle.push('bg-warning text-dark');
            break;
        case 'Under Review':
            statusStyle.push('bg-info');
            break;
        case 'Denied':
            statusStyle.push('bg-danger');
            break;
        case 'Granted':
            statusStyle.push('bg-success');
            break;
        case 'Completed':
            statusStyle.push('bg-secondary')
            break;
        case 'Cancelled':
            statusStyle.push('bg-info')
            break;
        default:
            break;
    }

    return (
        <div className='list-group-item list-group-item-action'>
            <div className='d-flex w-100 justify-content-between'>
                { roles.includes('planner')
                    ? <h5 className='mb-1'>{ siteDescription }</h5>
                    : null
                }
                { roles.includes('planner')
                    ? <p className='mb-1'>{ locations.join(', ')}</p>
                    : <h5 className='mb-1'>{ locations.join(', ') }</h5>
                }
                <span className={statusStyle.join(' ')}>{ status }</span>
            </div>
            { roles.includes('planner')
                ? <p className='mb-0'>Organisation: <small className='text-muted'>{ organisation }</small></p>
                : null
            }
            <small>Approx. { moment(startDate).endOf('day').fromNow() }</small>
            <p>Dates: <small className='text-muted'> { moment(startDate).format('Do MMMM YYYY') + ' to ' + moment(endDate).format('Do MMMM YYYY') } </small></p>
            <p>Note: <small className='text-muted'>{ coLocate ? 'Site can be co-located' : 'site cannot be co-located' }</small></p>
            {roles.length !== 0
                ?   <div className='d-flex justify-content-evenly'>
                        { isolationType === 'Isolation'
                            ?   <span className='badge d-inline-block bg-isolation text-nowrap'>{ isolationType }</span>
                            :   null
                        }
                        { electricalResourceRequired
                            ?   <span className='badge d-inline-block bg-electricalResource text-dark text-nowrap'>Electrical Resource</span>
                            :   null
                        }
                        { signallingResourceRequired
                            ?   <span className='badge d-inline-block bg-signallingResource text-dark text-nowrap'>Signalling Resource</span>
                            :   null
                        }
                        {testTramsRequired
                            ?   <span className='badge d-inline-block bg-tramAny text-dark text-nowrap'>Test Trams</span>
                            :   null
                        }                
                    </div>
                : null
            }
        </div>
    )
}

export default accessRequestListItem;