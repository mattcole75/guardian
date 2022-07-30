import React from 'react';
import { useSelector } from 'react-redux';

const Account = () => {

    const displayName = useSelector(state => state.auth.displayName);
    const phoneNumber = useSelector(state => state.auth.phoneNumber);
    const email = useSelector(state => state.auth.email);
    const organisation = useSelector(state => state.auth.organisation);
    const roles = useSelector(state => state.auth.roles);
    const isAdministrator = roles.includes('administrator', 0);

    return (

        <div className='form-auth my-5'>
                
            <i className='bi-person-bounding-box form-auth-icon'></i>
            <h1 className='h3 mb-3 fw-normal'>Your account info</h1>

            <ul className='list-group mb-3'>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Display name</h6>
                        <small className='text-muted'>{displayName}</small>
                    </div>
                    <button className='btn btn-outline-primary'>edit</button>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Phone number</h6>
                        <small className='text-muted'>{phoneNumber}</small>
                    </div>
                    <button className='btn btn-outline-primary'>edit</button>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Email</h6>
                        <small className='text-muted'>{email}</small>
                    </div>
                    <button className='btn btn-outline-primary'>edit</button>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Organisation</h6>
                        <small className='text-muted'>{organisation}</small>
                    </div>
                    <button className='btn btn-outline-primary'>edit</button>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Roles</h6>
                        <small className='text-muted'>{roles}</small>
                    </div>
                    <button className={isAdministrator ? 'btn btn-outline-primary' : 'btn btn-outline-secondary'} disabled={!isAdministrator}>edit</button>
                </li>

        </ul>
    </div>
    )
}

export default Account;