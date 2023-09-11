import React from 'react';

const Requestor = (props) => {

    const { requestor } = props;

    const { name, phoneNumber, email, organisation } = requestor;

    return (
        <div>
            <ul className='list-group'>
                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Name</h6>
                        <small className='text-muted'>{ name }</small>
                    </div>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Phone Number</h6>
                        <small className='text-muted'>{ phoneNumber }</small>
                    </div>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Email</h6>
                        <small className='text-muted'>{ email }</small>
                    </div>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Organisation</h6>
                        <small className='text-muted'>{ organisation }</small>
                    </div>
                </li>

            </ul>
        </div>
    );
}

export default Requestor;