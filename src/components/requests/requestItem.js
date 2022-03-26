import React from 'react';

const requestItem = (props) => {

const select = () => {
    props.select(props.item);
};

    return (

        <div className="col-md-6" onClick={select}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary">{props.item.accessRequestStatus}</strong>
                    <h3 className="mb-0">{props.item.accessRequestTitle}</h3>
                    <div className="mb-1 text-muted">Nov 12</div>
                    <p className="card-text"><strong>Organisation: </strong>{props.item.projectOrganisation}</p>
                    <p className="card-text"><strong>Project title: </strong>{props.item.projectTitle}</p>
                    <p className="card-text"><strong>Requestor name: </strong>{props.item.requestorName}</p>
                    {/* <p className="card-text"><strong>Description: </strong>{props.item.accessRequestDescription}</p> */}
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    );
}

export default requestItem;