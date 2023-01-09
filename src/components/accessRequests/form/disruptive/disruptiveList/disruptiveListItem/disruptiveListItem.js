import React from 'react';
import moment from 'moment';

const DisruptiveListItem = (props) => {

    const { item, toggle, select } = props;

    const key = Object.keys(item)[0];
    const disruptive = item[key];

    const onSelect = () => {
        select(item);
        toggle();
    }

    let iconStyle = ['bi-cone-striped access-icon access-icon'];
    let badgeStyle = ['badge rounded-pill'];

    switch (disruptive.status) {
        case 'Draft':
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
            break;
        case 'Submitted':
            iconStyle.push('access-icon-submitted');
            badgeStyle.push('bg-warning text-dark');
            break;
        case 'Declined':
            iconStyle.push('access-icon-decline');
            badgeStyle.push('bg-danger');
            break;
        case 'Approved':
            iconStyle.push('access-icon-approved');
            badgeStyle.push('bg-success');
            break;
        default:
            iconStyle.push('access-icon-pending');
            badgeStyle.push('bg-primary');
    }

    return (
        <div className='list-group-item list-group-item-action d-flex gap-3 py-3' aria-current='true' onClick={ onSelect }>
            <i className={iconStyle.join(' ')}></i>
            <div className='d-flex gap-2 w-100 justify-content-between' role='button'>
                <div>
                    <p className='mb-0 opacity-75'><strong>Title: </strong>{disruptive.summary.disruptiveTitle}</p>
                    <p className='mb-0 opacity-75'><strong>Raised by: </strong>{disruptive.createdBy}</p>
                    <p className='mb-0 opacity-75'><strong>Begins: </strong>{moment(disruptive.summary.disruptiveStartDate).format('DD/MM/YYYY')}</p>
                    <p className='mb-0 opacity-75'><strong>Ends: </strong>{moment(disruptive.summary.disruptiveEndDate).format('DD/MM/YYYY')}</p>
                    <small className='text-muted'>Raised: { moment(disruptive.created).format('DD/MM/YYYY') }  -  </small>
                    <small className='text-muted'>Last updated: { moment(disruptive.updated).fromNow() }</small>
                </div>
                <div className='p-1'>
                    <small className={badgeStyle.join(' ')}>{disruptive.status}</small>
                </div>
            </div>
        </div>
    );
}

export default DisruptiveListItem;