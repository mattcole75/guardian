import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';

const AdminForm = (props) => {

    const { user, save, toggle } = props;

    const { register, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: { 
            user: user.roles.includes('user') ? true : false,
            planner: user.roles.includes('planner') ? true : false,
            administrator: user.roles.includes('administrator') ? true : false,
            disabled: !user.disabled
        }
    });

    const [ accountStatus, setAccountStatus ] = useState(user.disabled);

    const onSave = useCallback((data) => {
        let updatedRoles = [];
        const keys = Object.keys(data);
        keys.forEach((key, index) => {
            if(data[key] && key !== 'disabled') // removing the account status from roles array 'disabled')
                updatedRoles.push(key);
        });
        
        save({ localId: user.uid, roles: updatedRoles, disabled: !data.disabled });

        toggle();

    }, [save, toggle, user.uid]);

    const toggleUserAccountStatus = () => {
        setAccountStatus(prevState => !prevState);
    }

    return (
        <div className='form-auth'>
            <h1 className='h3 mb-3 fw-normal text-start'>Details</h1>
            <ul className='list-group mb-3'>
                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Display Name</h6>
                        <small className='text-muted'>{user.displayName}</small>
                    </div>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Phone Number</h6>
                        <small className='text-muted'>{user.phoneNumber}</small>
                    </div>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div className='text-start'>
                            <h6 className="mb-0">Email</h6>
                            <small className='text-muted'>{user.email}</small>
                        </div>
                        <small className="opacity-75 text-nowrap">
                            {
                                !user.emailVerified 
                                    ? <span className='badge text-end bg-danger'>Not Verified</span>
                                    : <span className='badge text-end bg-success'>Verified</span>
                            }
                        </small>
                    </div>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Organisation</h6>
                        <small className='text-muted'>{user.organisation}</small>
                    </div>
                </li>
                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Last Logged In</h6>
                        <small className='text-muted'>{moment(user.lastSignInTime).format('MMMM Do YYYY, h:mm:ss a')}</small>
                    </div>
                </li>

            </ul>
            <form className=''>

                <div className='d-flex gap-2 w-100 justify-content-between'>
                        <div className='text-start'>
                            <h1 className='h3 mb-3 fw-normal text-start'>Account Status</h1>
                        </div>
                        <small className="opacity-75 text-nowrap">
                            {
                                user.disabled 
                                    ? <span className='badge text-end bg-danger'>Disabled</span>
                                    : <span className='badge text-end bg-success'>Enabled</span>
                            }
                        </small>
                    </div>

                <div className='form-floating mb-3 border border-secondary p-2 rounded-2'>
                    <div className="form-check form-switch primary text-start">
                        <input 
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="disabled"
                            { ...register('disabled', { onChange: toggleUserAccountStatus, required: false })}
                        />
                        <label className="form-check-label" htmlFor="disabled">{accountStatus ? 'Enable Account' : 'Disable Account'}</label>
                    </div>
                </div>

                <h1 className='h3 mb-3 fw-normal text-start'>Roles</h1>
                <div className='form-floating mb-3 border border-secondary p-2 rounded-2'>
                    <div className="form-check form-switch primary text-start">
                        <input 
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="user"
                            disabled
                            { ...register('user', { required: false })}
                        />
                        <label className="form-check-label" htmlFor="user">User</label>
                    </div>

                    <div className="form-check form-switch primary text-start">
                        <input 
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="planner"
                            { ...register('planner', { required: false })}
                        />
                        <label className="form-check-label" htmlFor="planner">Planner</label>
                    </div>

                    <div className="form-check form-switch primary text-start">
                        <input 
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="administrator"
                            { ...register('administrator', { required: false })}
                        />
                        <label className="form-check-label" htmlFor="administrator">Administrator</label>
                    </div>
                </div>

                <div className='form-floating mb-3'>
                    <button
                        className='w-100 btn btn-primary'
                        type='button'
                        onClick={handleSubmit(onSave)}>Save</button>
                </div>

                <div className='form-floating mb-3'>
                    <button
                        className='w-100 btn btn-secondary'
                        type='button'
                        onClick={toggle}>Close</button>
                </div>

            </form>
        </div>
    );
}

export default AdminForm;