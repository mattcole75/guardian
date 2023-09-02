import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as action from '../../../store/actions/index';

import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const RecoverPassword = () => {

    const dispatch = useDispatch();

    const [ infoMsg, setInfoMsg ] = useState(null);

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const email = useSelector(state => state.auth.email);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

    const onRecoverPassword = useCallback((authData, identifier) => dispatch(action.recoverPassword(authData, identifier)), [dispatch]);

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: 'onBlur' });

    const [applyValidationCss, setApplyValidationCss] = useState(false);

    useEffect(() => {
        if(errors.email)
            setApplyValidationCss(true);
        
    }, [errors]);

    const recoverPasswordHandler = useCallback((data) => {
        onRecoverPassword({...data, requestType: 'PASSWORD_RESET'}, 'PASSWORD_RESET');
    }, [onRecoverPassword]);

    let spinner = null;
    if(loading){
        spinner = <Spinner />;
    }

    useEffect(() => {
        if((!loading && !error && email === getValues('email')) || error) {
            setInfoMsg('Request for password reset recieved. If your email is registered on the system you will recieve an email link that will enable you to reset your password.')
        }
    }, [loading, error, email, getValues]);

    return (
        <div className='form-auth my-5'>
            {isAuthenticated && <Navigate to={authRedirectPath} />}
            <Backdrop show={loading} />
                {spinner}
                {error &&
                <div className='alert alert-danger' role='alert'>
                    {error.response.data.message}
                </div>
            }
            {infoMsg &&
                <div class="alert alert-primary" role="alert">
                    {infoMsg}
                </div>
            }
            <form className={ applyValidationCss ? 'was-validated' : '' } onSubmit={handleSubmit(recoverPasswordHandler)}>
                
                <i className='bi-file-person form-auth-icon'></i>
                <h1 className='h3 mb-3 fw-normal'>Recover Password</h1>
                <div className='form-floating mb-3'>
                <input type='email' className='form-control' id='email' placeholder='name@example.com' autoComplete='off' required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
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

                { errors.email && <p className='form-error mt-1'>{errors.email.message}</p> }

                <button className='w-100 btn btn-lg btn-primary' type='submit'>Request Link</button>
            </form>
        </div>
    );
};

export default RecoverPassword;