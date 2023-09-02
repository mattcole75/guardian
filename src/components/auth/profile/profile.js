import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as action from '../../../store/actions/index';
import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';
import DisplayNameForm from './displayName/displayNameForm';
import PhoneNumberForm from './phoneNumber/phoneNumberForm';
import EmailForm from './email/emailForm';
import OrganisationForm from './organisation/organisationForm';
import PasswordForm from './password/passwordForm';

const Profile = () => {

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

    // indicates whether the user is editing any aspect of their profile
    const [editingDisplayName, setEditingDisplayName] = useState(false);
    const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingOrganisation, setEditingOrganisation] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

    // editing toggles
    const toggleDisplayNameEditing = () => {
        setEditingDisplayName(prevState => !prevState);
    };
    const togglePhoneNumberEditing = () => {
        setEditingPhoneNumber(prevState => !prevState);
    };
    const toggleEmailEditing = () => {
        setEditingEmail(prevState => !prevState);
    };
    const toggleOrganisationEditing = () => {
        setEditingOrganisation(prevState => !prevState);
    };
    const togglePasswordEditing = () => {
        setEditingPassword(precState => !precState);
    };

    const onSave = useCallback((method, data, identifier) => {
        dispatch(action.authSendRequest('/user', method, data, idToken,localId, identifier, null))
    }, [dispatch, idToken, localId]);

    const saveHandler = useCallback(data => {
        onSave('PATCH', data, 'PATCH_USER');
    }, [onSave]);

    const savePassword = useCallback((data) => {
        dispatch(action.authUpdatePassword({
            idToken: idToken,
            password: data.password,
            returnSecureToken: true
        }, 'PATCH_PASSWORD'))
    }, [dispatch, idToken]);

    // modal edit forms
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
    if(editingPhoneNumber) {
        modal = <Modal
            show={editingPhoneNumber}
            modalClosed={togglePhoneNumberEditing}
            content={
                <PhoneNumberForm
                    toggle={togglePhoneNumberEditing}
                    save={saveHandler}
                    phoneNumber={phoneNumber}
                />
            } />;
    }
    if(editingEmail) {
        modal = <Modal
            show={editingEmail}
            modalClosed={toggleEmailEditing}
            content={
                <EmailForm
                    toggle={toggleEmailEditing}
                    save={saveHandler}
                    email={email}
                />
            } />;
    }
    if(editingOrganisation) {
        modal = <Modal
            show={editingOrganisation}
            modalClosed={toggleOrganisationEditing}
            content={
                <OrganisationForm
                    toggle={toggleOrganisationEditing}
                    save={saveHandler}
                    organisation={organisation}
                />
            } />;
    }
    if(editingPassword) {
        modal = <Modal
            show={editingPassword}
            modalClosed={togglePasswordEditing}
            content={
                <PasswordForm
                    toggle={togglePasswordEditing}
                    save={savePassword}
                />
            } />;
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    return (

        <div className='form-auth my-5 mt-5'>
            
            <Backdrop show={loading} />
            {spinner}
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error.response.data.message}
                </div>
            }
            {modal}

            <i className='bi-person-bounding-box form-auth-icon'></i>
            <h1 className='h3 mb-3 fw-normal'>Your Profile</h1>

            <ul className='list-group mb-3'>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Display Name</h6>
                        <small className='text-muted'>{displayName}</small>
                    </div>
                    <button className='btn btn-outline-primary' onClick={toggleDisplayNameEditing}>edit</button>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Phone Number</h6>
                        <small className='text-muted'>{phoneNumber}</small>
                    </div>
                    <button className='btn btn-outline-primary' onClick={togglePhoneNumberEditing}>edit</button>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Email</h6>
                        <small className='text-muted'>{email}</small>
                    </div>
                    <button className='btn btn-outline-primary' onClick={toggleEmailEditing}>edit</button>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Organisation</h6>
                        <small className='text-muted'>{organisation}</small>
                    </div>
                    <button className='btn btn-outline-primary' onClick={toggleOrganisationEditing}>edit</button>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Password</h6>
                        <small className='text-muted form-password'>1234567890</small>
                    </div>
                    <button className='btn btn-outline-primary' onClick={togglePasswordEditing}>edit</button>
                </li>

                <li className='list-group-item d-flex justify-content-between lh-sm'>
                    <div className='text-start'>
                        <h6 className='my-0'>Roles</h6>
                        <small className='text-muted'>{Array.isArray(roles) ? roles.join(', ') : roles}</small>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Profile;