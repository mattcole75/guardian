import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as action from '../../../store/actions/index';
import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';
import DisplayNameForm from './displayName/displayNameForm';

const Account = () => {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const displayName = useSelector(state => state.auth.displayName);
    const phoneNumber = useSelector(state => state.auth.phoneNumber);
    const email = useSelector(state => state.auth.email);
    const organisation = useSelector(state => state.auth.organisation);
    const roles = useSelector(state => state.auth.roles);
    const isAdministrator = roles.includes('administrator', 0);

    const [editingDisplayName, setEditingDisplayName] = useState(false);

    const toggleDisplayNameEditing = () => {
        setEditingDisplayName(prevState => !prevState);
    }

    const onSave = useCallback((method, data, identifier) => {
        dispatch(action.authSendRequest('/user', method, data, idToken,localId, identifier, null))
    }, [dispatch, idToken, localId]);

    const saveHandler = useCallback(data => {
        onSave('PATCH', {...data}, 'PATCH_USER');
    }, [onSave]);

    let modal = null;
    if(editingDisplayName) {
        modal = <Modal
            show={editingDisplayName}
            modalClosed={toggleDisplayNameEditing}
            content={
                <DisplayNameForm
                    toggle={toggleDisplayNameEditing}
                    save={saveHandler}
                    displayName={displayName}
                />
            } />;
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    return (

        <div className='form-auth my-5'>
            
            <Backdrop show={loading} />
            {spinner}
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>    
            }
            {modal}

            <i className='bi-person-bounding-box form-auth-icon'></i>
            <h1 className='h3 mb-3 fw-normal'>Your account info</h1>

            <ul className='list-group mb-3'>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Display name</h6>
                        <small className='text-muted'>{displayName}</small>
                    </div>
                    <button className='btn btn-outline-primary' onClick={toggleDisplayNameEditing}>edit</button>
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