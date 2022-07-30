import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as action from '../../../store/actions/index';

import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const Signup = () => {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    
    const [redirect, setRedirect] = useState(false);

    const onSignUp = useCallback((authData, identifier) => dispatch(action.signup(authData, identifier)), [dispatch]);

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

    const signupHandler = useCallback((data) => {
        onSignUp({...data, returnSecureToken: true}, 'SIGNUP');
        setRedirect(true);
    }, [onSignUp]);

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    return (
        <div className="form-auth my-5">
            <Backdrop show={loading} />
                {spinner}
            {redirect && <Navigate to='/login' />}
            {error &&
                <div className="alert alert-danger" role="alert">
                    {error.message}
                </div>
            }
            <form className="was-validated" onSubmit={handleSubmit(signupHandler)}>
                <i className="bi-person-plus form-auth-icon"></i>
                <h1 className="h3 mb-3 fw-normal">Sign-up for an account</h1>

                <div className="form-floating mb-3">
                    <input 
                        type="text"
                        className="form-control"
                        id="displayName"
                        placeholder="Your name"
                        required
                        minLength={3}
                        maxLength={32}
                        {...register("displayName", { required: true, minLength: 3, maxLength: 32 })}
                    />
                    <label htmlFor="displayName" className="form-label">Display name</label>
                </div>

                <div className="form-floating mb-3">
                    <input 
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="+447911123456"
                        required
                        pattern='^\+[1-9]\d{1,14}$'
                        {...register("phoneNumber", { required: true, pattern: /^\+?[1-9]\d{1,14}/i })}
                    />
                    <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                </div>

                <div className="form-floating mb-3">
                    <input 
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        required 
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                    <label htmlFor="email" className="form-label">Email address</label>
                </div>

                <div className="form-floating mb-3">
                    <input 
                        type="text"
                        className="form-control"
                        id="organisation"
                        placeholder="Your organisation"
                        required
                        minLength={3}
                        maxLength={32}
                        {...register("organisation", { required: true, minLength: 3, maxLength: 32 })}
                    />
                    <label htmlFor="organisation" className="form-label">Organisation</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        minLength={6}
                        maxLength={255}
                        {...register("password", { required: true, minLength: 6, maxLength: 255 })} />
                    <label htmlFor="password" className="form-label">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={!formState.isValid}>Sign-up</button>
            </form>
        </div>
    );
};

export default Signup;