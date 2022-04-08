import React from 'react';
import moment from 'moment';

const requestItem = (props) => {

const { item, select } = props;

const onSelect = () => {
    select(item);
};

let statusCSS = [];
statusCSS.push('d-inline-block mb-2 text-nowrap');

switch(props.item.requestStatus){
    case 'Draft':
        statusCSS.push('badge bg-secondary');
        break;
    case 'Submitted for approval':
        statusCSS.push('badge bg-warning text-dark');
        break;
    case 'Rejected':
        statusCSS.push('badge bg-danger');
        break;
    case 'Approved':
        statusCSS.push('badge bg-success');
        break;
    default:
        break;
}

    return (

        <div className="col-md-6" onClick={onSelect}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="d-flex gap-2 w-100 justify-content-between">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{item.accessRequestStatus}</strong>
                        <h3 className="mb-0">{item.accessRequestTitle}</h3>
                        <div className="mb-1 text-muted">{moment(props.item.created).format('MMMM Do YYYY, h:mm:ss a')}</div>
                        <p className="card-text"><strong>Organisation: </strong>{item.projectOrganisation}</p>
                        <p className="card-text"><strong>Project title: </strong>{item.projectTitle}</p>
                        <p className="card-text"><strong>Requestor name: </strong>{item.requestorName}</p>
                        <p className="card-text"><small className="text-muted">Last updated: {moment(item.updated).startOf('hour').fromNow()}</small></p> 
                    </div>
                    <div className="p-4">
                        <small className={statusCSS.join(' ')}>{item.requestStatus}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default requestItem;