import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const PasswordForm = (props) => {

    const { toggle, save } = props;
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onBlur' });
    
    const [applyValidationCss, setApplyValidationCss] = useState(false);

    useEffect(() => {
        if(errors.password || errors.passwordRepeat)
            setApplyValidationCss(true);
        
    }, [errors]);
    
    const inputRef = useRef({});
    inputRef.current = watch('password');

    const onSave = useCallback((data) => {
        save({ ...data });
        toggle();

    }, [save, toggle]);

    return (
        <div className='form-auth'>
            <form className={ applyValidationCss ? 'was-validated' : '' }>
                <h1 className='h3 mb-3 fw-normal'>Password</h1>

                <div className='form-floating'>
                    <input type='text' className='form-control form-password form-ele-top' id='password' placeholder='Password' autoComplete='off' required pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" ref={ inputRef }
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

                { errors.passwordRepeat && <p className='form-error mt-1'>{errors.passwordRepeat.message}</p> }
                { errors.password && <p className='form-error '>{errors.password.message}</p> }

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

export default PasswordForm;