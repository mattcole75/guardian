import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const EmailForm = (props) => {

    const { email, save, toggle } = props;

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: { email: email }
    });

    const [applyValidationCss, setApplyValidationCss] = useState(false);

    useEffect(() => {
        if(errors.email)
            setApplyValidationCss(true);
        
    }, [errors]);

    const onSave = useCallback((data) => {
        save({ ...data });
        toggle();

    }, [save, toggle]);

    return (
        <div className='form-auth'>
            <form className={ applyValidationCss ? 'was-validated' : '' }>
                <h1 className='h3 mb-3 fw-normal'>Email</h1>

                <div className="form-floating mb-3">
                    <input type='email' className='form-control form-ele-mid' id='email' placeholder='name@example.com' autoComplete='off' required pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                    { ...register('email', {
                        required: "You must specify an Email address",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email Address"
                        }
                    })}
                    />
                    <label htmlFor="email" className="form-label">Email address</label>
                </div>

                { errors.email && <p className='form-error mt-1'>{errors.email.message}</p> }

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

export default EmailForm;