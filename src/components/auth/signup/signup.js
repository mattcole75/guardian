import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import * as action from '../../../store/actions/index';

import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const Signup = () => {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    // const identifier = useSelector(state => state.auth.identifier);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

    const onSignUp = useCallback((authData, identifier) => dispatch(action.signup(authData, identifier)), [dispatch]);

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

    const signupHandler = useCallback((data) => {
        onSignUp({...data, returnSecureToken: true}, 'SIGNUP');
    }, [onSignUp]);

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    return (
        <div className="form-auth my-5">
            <Backdrop show={loading} />
                {spinner}
            {isAuthenticated && <Redirect to={authRedirectPath} />}
            {error &&
                <div className="alert alert-danger" role="alert">
                    {error.message}
                </div>
            }
            <form className="was-validated" onSubmit={handleSubmit(signupHandler)}>
                <i className="bi-person-plus form-auth-icon"></i>
                <h1 className="h3 mb-3 fw-normal">Sign-up for an account</h1>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                    <label htmlFor="email" className="form-label">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" required minLength={6} maxLength={255} {...register("password", { required: true, minLength: 6, maxLength: 255 })} />
                    <label htmlFor="password" className="form-label">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={!formState.isValid}>Sign-up</button>
            </form>
        </div>
    );
};

export default Signup;