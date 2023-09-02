import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const PhoneNumberForm = (props) => {

    const { phoneNumber, save, toggle } = props;

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: { phoneNumber: phoneNumber }
    });

    const [applyValidationCss, setApplyValidationCss] = useState(false);

    useEffect(() => {
        if(errors.phoneNumber)
            setApplyValidationCss(true);
        
    }, [errors]);

    const onSave = useCallback((data) => {
        save({ ...data });
        toggle();

    }, [save, toggle]);

    return (
        <div className='form-auth'>
            <form className={ applyValidationCss ? 'was-validated' : '' }>
                <h1 className='h3 mb-3 fw-normal'>Phone number</h1>

                <div className="form-floating mb-3">
                    <input type='tel'className='form-control form-ele-mid1' id='phoneNumber' placeholder='+440' required autoComplete='off' pattern='^\+?(?:\d\s?){10,12}$'
                        {...register('phoneNumber', { required: 'You must provide a telephone number', pattern: { value: /^\+?(?:\d\s?){10,12}$/, message: "The telephone number's format is incorrect" } })}
                    />
                    <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                </div>

                { errors.phoneNumber && <p className='form-error mt-1'>{errors.phoneNumber.message}</p> }

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

export default PhoneNumberForm  ;