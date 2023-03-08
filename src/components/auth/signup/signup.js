import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as action from '../../../store/actions/index';

import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const Signup = () => {

    const dispatch = useDispatch();

    const { loading, error, identifier } = useSelector(state => state.auth)
    
    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [countryCode, setCountryCode] = useState('+44');

    const onSignUp = useCallback((authData, identifier) => dispatch(action.signup(authData, identifier)), [dispatch]);

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

    const signupHandler = useCallback((data) => {
        onSignUp({...data, phoneNumber: countryCode + data.phoneNumber, returnSecureToken: true}, 'SIGNUP');
    }, [countryCode, onSignUp]);

    const toggle = () => {
        setRedirect(prevState => !prevState);
    }

    useEffect(() => {
        if(loading === true && error === null && identifier === 'SIGNUP')
            setShowModal(true);
    }, [error, loading, identifier]);

    let modal = null;
    if(showModal === true) {
        modal = <Modal
            show={showModal}
            modalClosed={ toggle }
            content={
                <div className='modal-content form-auth rounded-4 shadow bg-white'>
                    {/* <div className='modal-header border-bottom-0 text-center'> */}
                    <div className='modal-body py-0 mb-3 mt-3'>
                        <h1 className='modal-title fs-5'>Success... New account created</h1>
                        {/*     <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={ toggle }></button> */}
                    </div>
                    <div className='modal-body py-0'>
                        <p>Your new account has been created but is currently disabled. Our administrator will review your account and get back to you within 24 hours.</p>
                    </div>
                    <div className='modal-footer flex-column border-top-0'>
                        <button type='button' className='btn btn-lg btn-light w-100 mx-0' data-bs-dismiss='modal' onClick={ toggle }>Close</button>
                    </div>
                </div>
            } />;
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    return (
        <div className='form-auth my-5'>
            <Backdrop show={loading} />
                {spinner}
            {redirect && <Navigate to='/login' />}
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            }
            {modal}

            <form className='was-validated' onSubmit={handleSubmit(signupHandler)}>
                <i className='bi-person-plus form-auth-icon'></i>
                <h1 className='h3 mb-3 fw-normal'>Sign-up</h1>

                <div className='form-floating'>
                    <input 
                        type='text'
                        className='form-control form-auth-ele-top'
                        id='displayName'
                        placeholder='Your name'
                        required
                        autoComplete='off'
                        minLength={3}
                        maxLength={32}
                        {...register('displayName', { required: true, minLength: 3, maxLength: 32 })}
                    />
                    <label htmlFor='displayName' className='form-label'>Display Name</label>
                </div>

                <div className='input-group'>

                    <div className='form-floating col-md-3'>
                        <select className='form-select form-auth-ele-mid' id='countryCode'
                            onChange={event => setCountryCode(event.target.value)} value={countryCode}>
                            <option value='+44'>+44 UK</option>
                            <option value='+33'>+33 France</option>
                            <option value='+61'>+61 Australia</option>
                        </select>
                        <label htmlFor='countryCode' className='form-label'>Code</label>
                    </div>

                    <div className='form-floating col-md-9'>
                        <input 
                            type='tel'
                            className='form-control form-auth-ele-mid1'
                            id='phoneNumber'
                            placeholder='+440'
                            required
                            autoComplete='off'
                            pattern='^\+?(?:\d\s?){10,12}$'
                            // pattern='^\+[1-9]\d{11,14}$'
                            {...register('phoneNumber', { required: true, pattern: /^\+?(?:\d\s?){10,12}$/ })}
                            // {...register('phoneNumber', { required: true, pattern: /^\+[1-9]\d{11,14}$/ })}
                        />
                        <label htmlFor='phoneNumber' className='form-label'>Phone Number</label>
                    </div>
                </div>

                <div className='form-floating'>
                    <input 
                        type='email'
                        className='form-control form-auth-ele-mid'
                        id='email'
                        placeholder='name@example.com'
                        required
                        autoComplete='off'
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                    <label htmlFor='email' className='form-label'>Email Address</label>
                </div>

                <div className='form-floating'>
                    <input 
                        type='text'
                        className='form-control form-auth-ele-mid'
                        id='organisation'
                        placeholder='Your organisation'
                        required
                        autoComplete='off'
                        minLength={3}
                        maxLength={32}
                        {...register('organisation', { required: true, minLength: 3, maxLength: 32 })}
                    />
                    <label htmlFor='organisation' className='form-label'>Organisation</label>
                </div>

                <div className='form-floating mb-3'>
                    <input
                        type='password'
                        className='form-control form-auth-ele-bot'
                        id='password'
                        placeholder='Password'
                        required
                        autoComplete='off'
                        minLength={6}
                        maxLength={255}
                        {...register('password', { required: true, minLength: 6, maxLength: 255 })} />
                    <label htmlFor='password' className='form-label'>Password</label>
                </div>

                <button className='w-100 btn btn-lg btn-primary' type='submit' disabled={!formState.isValid}>Sign-up</button>
            </form>
        </div>
    );
};

export default Signup;