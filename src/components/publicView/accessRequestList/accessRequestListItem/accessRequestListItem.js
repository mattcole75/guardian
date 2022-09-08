import React from 'react';
import moment from 'moment';

const accessRequestListItem = (props) => {

    const { startDate, endDate, locations, status, electricalIsolationRequired, signallingResourceRequired, testTramsRequired } = props.item;

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
                <h5 className='mb-1'>{locations.join(' | ')}</h5>
                {/* <h5 className='mb-1'>{title}</h5> */}
                <span className={statusStyle.join(' ')}>{status}</span>
                
            </div>
            {/* <p className='mb-1'>{locations.join(' | ')}</p> */}
            <small>Approx. {moment(startDate).endOf('day').fromNow()}</small>
            <p>
                Start:
                <small className='text-muted'> {moment(startDate).format('Do MMMM YYYY')} </small>
                End:
                <small className='text-muted'> {moment(endDate).format('Do MMMM YYYY')}</small>
            </p>
            <div className='d-flex justify-content-evenly'>
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
            
        </div>
    )
}

export default accessRequestListItem;