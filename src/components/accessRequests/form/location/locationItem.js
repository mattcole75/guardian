import React from 'react';

const locationItem = (props) => {

    const { select, toggle, item, index } = props;

    const onSelect = () => {
        select(index);
        toggle();
    }

    let maintenanceResource = [];
    if(item.electricalIsolationRequired)
        maintenanceResource.push('E&M Team');
    
    if(item.signallingResourceRequired)
        maintenanceResource.push('S&T Team');
    
    if(item.testTramsRequired)
        maintenanceResource.push('Test Trams Required');

    let iconStyle = ['bi-wrench access-icon access-icon'];
    let badgeStyle = ['badge rounded-pill'];

    switch (item.locationStatus) {
        case 'Pending':
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
            break;
        case 'Unavailable':
            iconStyle.push('access-icon-decline');
            badgeStyle.push('bg-danger');
            break;
        case 'Confirmed':
            iconStyle.push('access-icon-approved');
            badgeStyle.push('bg-success');
            break;
        default:
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
    }

    return (
        <div className='list-group-item list-group-item-action d-flex gap-3 py-3' aria-current='true' onClick={onSelect}>
            <i className={iconStyle.join(' ')}></i>
            <div className='d-flex gap-2 w-100 justify-content-between' role='button'>
                <div>
                    <p className='mb-0 opacity-75'><strong>Location: </strong>{item.location}</p>
                    <p className='mb-0 opacity-75'><strong>Date: </strong>{item.startDate}</p>
                    <p className='mb-0 opacity-75'><strong>Type: </strong>{item.accessType}</p>
                    <p className='mb-0 opacity-75'><strong>Maintenance Resource: </strong>
                        { maintenanceResource.length > 0 
                            ? maintenanceResource.join(' | ')
                            :   'No Maintenance Resource Required'
                        }
                    </p>
                </div>
                <div className='p-1'>
                    <small className={badgeStyle.join(' ')}>{item.locationStatus}</small>
                </div>
                
            </div>
        </div>
    );
}

export default locationItem;