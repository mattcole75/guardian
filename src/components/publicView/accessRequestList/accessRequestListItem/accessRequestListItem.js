import React from 'react';
import moment from 'moment';

const accessRequestListItem = (props) => {

    const { item, roles } = props;

    const { siteDescription, organisation, startDate, endDate, startLocation, endLocation, status, electricalIsolationRequired, signallingResourceRequired, testTramsRequired, colocate } = item;

    let statusStyle = ['badge d-inline-block mb-2 text-nowrap h-100 ms-lg-1'];

    switch(status) {
        case 'Draft':
            statusStyle.push('bg-secondary');
            break;
        case 'Submitted':
            statusStyle.push('bg-warning text-dark');
            break;
        case 'Under Review':
            statusStyle.push('bg-warning text-dark');
            break;
        case 'Denied':
            statusStyle.push('bg-danger');
            break;
        case 'Granted':
            statusStyle.push('bg-success');
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
                    ? <p className='mb-1'>{ startLocation + ' to ' + endLocation }</p>
                    : <h5 className='mb-1'>{ startLocation + ' to ' + endLocation }</h5>
                }
                <span className={statusStyle.join(' ')}>{status}</span>
            </div>
            { roles.includes('planner')
                    ? <p className='mb-0'>Project Organisation: <small className='text-muted'>{ organisation }</small></p>
                    : null
            }
            <small>Approx. { moment(startDate).endOf('day').fromNow() }</small>
            <p>
                Start:
                <small className='text-muted'> {moment(startDate).format('Do MMMM YYYY')} </small>
                End:
                <small className='text-muted'> {moment(endDate).format('Do MMMM YYYY')}</small>
            </p>
            <p>Note: <small className='text-muted'>{ colocate }</small></p>
            {roles.length !== 0
                ?   <div className='d-flex justify-content-evenly'>
                        {electricalIsolationRequired
                            ?   <span className='badge d-inline-block bg-warning text-dark text-nowrap'>Electrical Isolation</span>
                            :   null
                        }
                        {signallingResourceRequired
                            ?   <span className='badge d-inline-block bg-warning text-dark text-nowrap'>Signalling</span>
                            :   null
                        }
                        {testTramsRequired
                            ?   <span className='badge d-inline-block bg-warning text-dark text-nowrap'>Test Trams</span>
                            :   null
                        }                
                    </div>
                : null
            }
        </div>
    )
}

export default accessRequestListItem;