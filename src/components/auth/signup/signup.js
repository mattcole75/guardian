import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from 'react-router-dom';
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

    const { register, watch, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

    const inputRef = useRef({});
    inputRef.current = watch('password');

    const [applyValidationCss, setApplyValidationCss] = useState(false);

    useEffect(() => {
        if(errors.displayName || errors.phoneNumber || errors.organisation || errors.email || errors.password || errors.passwordRepeat)
            setApplyValidationCss(true);
        
    }, [errors]);

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
        <div className='form-auth'>
            <Backdrop show={loading} />
                {spinner}
            {redirect && <Navigate to='/login' />}
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            }
            {modal}

            <form className={ applyValidationCss ? 'was-validated' : '' } onSubmit={handleSubmit(signupHandler)}>
                <i className='bi-person-plus form-auth-icon'></i>
                <h1 className='h3 mb-3 fw-normal'>Sign Up</h1>

                <div className='form-floating'>
                <input type='text' className='form-control form-ele-top' id='displayName' placeholder='Your name' autoComplete='off' required minLength={6} maxLength={32}
                { ...register('displayName', {
                    required: "You must specify a Display Name",
                    minLength: {
                        value: 6,
                        message: "Display Name must have at least 6 characters"
                    },
                    maxLength: {
                        value: 32,
                        message: 'Display Name must have less than 32 characters'
                    }
                }) }
                />
                <label htmlFor='displayName'>Display Name</label>
            </div>

            <div className='input-group'>
                <div className='form-floating col-md-5'>
                    <select className='form-select form-ele-mid' id='countryCode'
                        onChange={event => setCountryCode(event.target.value)} value={countryCode}>
                        <option value='+44'>+44 UK</option>
                        <option value='+33'>+33 France</option>
                        <option value='+61'>+61 Australia</option>
                    </select>
                    <label htmlFor='countryCode' className='form-label'>Code</label>
                </div>

                <div className='form-floating col-md-7'>
                    <input type='tel'className='form-control form-ele-mid1' id='phoneNumber' placeholder='+440' required autoComplete='off' pattern='^\+?(?:\d\s?){10,12}$'
                        {...register('phoneNumber', { required: 'You must provide a telephone number', pattern: { value: /^\+?(?:\d\s?){10,12}$/, message: "The telephone number's format is incorrect" } })}
                    />
                    <label htmlFor='phoneNumber' className='form-label'>Phone Number</label>
                </div>
            </div>

            <div className='form-floating'>
                <input type='email' className='form-control form-ele-mid' id='email' placeholder='name@example.com' autoComplete='off' required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                { ...register('email', {
                    required: "You must specify an Email address",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email Address"
                    }
                })}
                />
                <label htmlFor='email'>Email Address</label>
            </div>

                <div className='form-floating'>
                    <input 
                        type='text' className='form-control form-ele-mid' id='organisation' placeholder='Your organisation' required autoComplete='off' minLength={3} maxLength={64}
                        {...register('organisation', {
                            required: "You must specify an Organisation Name",
                            minLength: {
                                value: 3,
                                message: "Your Organisation Name must have at least 3 characters"
                            },
                            maxLength: {
                                value: 64,
                                message: 'Your Organisation Name must have less than 64 characters'
                            }
                        }) }
                    />
                    <label htmlFor='organisation' className='form-label'>Organisation</label>
                </div>

                <div className='form-floating'>
                    <input type='text' className='form-control form-password form-ele-mid' id='password' placeholder='Password' autoComplete='off' required pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" ref={ inputRef }
                    { ...register('password', {
                        required: "You must specify a password",
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                            message: "Minimum eight characters, at least one letter, one number and one special character"
                        }
                    }) }
                    />
                    <label htmlFor='password'>Password</label>
                </div>
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control form-password form-ele-bot prevent-validation' id='passwordConfirm' placeholder='Password' autoComplete='off' required
                    { ...register('passwordRepeat', {
                        validate: value =>
                        value === inputRef.current || "The passwords do not match"
                    }) }
                    />
                    <label htmlFor='passwordConfirm'>Confirm Password</label>
                </div>

                { errors.displayName && <p className='form-error mt-1'>{errors.displayName.message}</p> }
                { errors.phoneNumber && <p className='form-error mt-1'>{errors.phoneNumber.message}</p> }
                { errors.organisation && <p className='form-error mt-1'>{errors.organisation.message}</p> }
                { errors.email && <p className='form-error mt-1'>{errors.email.message}</p> }
                { errors.passwordRepeat && <p className='form-error mt-1'>{errors.passwordRepeat.message}</p> }
                { errors.password && <p className='form-error '>{errors.password.message}</p> }

                <button className='w-100 btn btn-lg btn-primary' type='submit'>Sign-up</button>
                <hr />
                <div>
                    <figcaption className='blockquote-footer mt-3'>Have an account?</figcaption>
                    <div className='text-center'>
                        <NavLink 
                            to='/login'
                            className='nav-link'>
                            Login
                        </NavLink>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signup;