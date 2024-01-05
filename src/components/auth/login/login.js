import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink } from 'react-router-dom';
import * as action from '../../../store/actions/index';

import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const Login = () => {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

    const onLogin = useCallback((authData, identifier) => dispatch(action.login(authData, identifier)), [dispatch]);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

    const [applyValidationCss, setApplyValidationCss] = useState(false);

    useEffect(() => {
        if(errors.email || errors.password)
            setApplyValidationCss(true);
        
    }, [errors]);

    const loginHandler = useCallback((data) => {
        onLogin({...data, returnSecureToken: true}, 'LOGIN');
    }, [onLogin]);

    let spinner = null;
    if(loading){
        spinner = <Spinner />;
    }

    return (
        <div className='form-auth my-5 mt-5'>
            { isAuthenticated ? <Navigate to={ authRedirectPath } /> : null }
            <Backdrop show={ loading } />
            { spinner }
            { error &&
                <div className='alert alert-danger' role='alert'>
                    { error }
                </div>
            }
            <form className={ applyValidationCss ? 'was-validated' : '' } onSubmit={ handleSubmit(loginHandler) }>
                <div className='text-center'>
                    <i className='bi-person-check form-auth-icon'></i>
                    <h1 className='h3 mb-3 fw-normal'>Log In</h1>
                </div>
                <div className='form-floating'>
                    <input type='email' className='form-control form-ele-top' id='email' placeholder='name@example.com' autoComplete='off' required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                    { ...register('email', {
                        required: "You must specify an Email address",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid Email Address'
                        }
                    })}
                    />
                    <label htmlFor='email'>Email Address</label>
                </div>
                <div className='form-floating mb-3'>
                    <input type='password' className='form-control form-ele-bot' id='password' placeholder='Password' autoComplete="new-password" required
                    { ...register('password', { required: 'You must specify a password' }) }
                    />
                    <label htmlFor='password'>Password</label>
                    { errors.email && <p className='form-error mt-1'>{errors.email.message}</p> }
                    { errors.password && <p className='form-error'>{errors.password.message}</p> }
                </div>
                
                <button className='w-100 btn btn-lg btn-primary' type='submit'>Log In</button>
                
                <hr />
                <div>
                    <figcaption className='blockquote-footer mt-3'>New to Guardian?</figcaption>
                    <NavLink 
                        to='/signup'
                        className='btn btn-secondary btn-sm'>
                        Create a new Guardian account
                    </NavLink>
                    <div className='text-center'>
                        <NavLink 
                            to='/recoverPassword'
                            className='nav-link'>
                            Forgotten password?
                        </NavLink>
                    </div> 
                </div>                
            </form>
        </div>
    );
};

export default Login;