import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const DisplayNameForm = (props) => {

    const { displayName, save, toggle } = props;

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: { displayName: displayName }
    });

    const [applyValidationCss, setApplyValidationCss] = useState(false);

    useEffect(() => {
        if(errors.displayName)
            setApplyValidationCss(true);
        
    }, [errors]);

    const onSave = useCallback((data) => {
        save({ ...data });
        toggle();

    }, [save, toggle]);

    return (
        <div className='form-auth'>
            <form className={ applyValidationCss ? 'was-validated' : '' }>
                <h1 className='h3 mb-3 fw-normal'>Display name</h1>

                <div className='form-floating mb-3'>
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
                    <label htmlFor='displayName' className='form-label'>Display name</label>
                </div>

                { errors.displayName && <p className='form-error mt-1'>{errors.displayName.message}</p> }

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

export default DisplayNameForm;