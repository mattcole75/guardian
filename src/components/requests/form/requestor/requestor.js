import React from 'react';

const Requestor = (props) => {

    const { request } = props;

    const { requestorName, requestorPhoneNumber, requestorEmail, requestorOrganisation } = request;

    return (
        <div>
            <ul className='list-group'>
                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Name</h6>
                        <small className='text-muted'>{requestorName}</small>
                    </div>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Phone Number</h6>
                        <small className='text-muted'>{requestorPhoneNumber}</small>
                    </div>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Email</h6>
                        <small className='text-muted'>{requestorEmail}</small>
                    </div>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Organisation</h6>
                        <small className='text-muted'>{requestorOrganisation}</small>
                    </div>
                </li>

            </ul>
        </div>
    );
}

export default Requestor;