import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const PhoneNumberForm = (props) => {

    const { phoneNumber, save, toggle } = props;

    const { register, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues: { phoneNumber: phoneNumber }
    });

    const onSave = useCallback((data) => {
        save({ ...data });
        toggle();

    }, [save, toggle]);

    return (
        <div className='form-auth'>
            <form className='was-validated'>
                <h1 className='h3 mb-3 fw-normal'>Phone number</h1>

                <div className="form-floating mb-3">
                    <input 
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="+447911123456"
                        required
                        autoComplete='off'
                        pattern='^\+[1-9]\d{11,14}$'
                        {
                            ...register("phoneNumber", { 
                            required: true,
                            pattern: /^\+[1-9]\d{11,14}$/})
                            // pattern: /^\+?[1-9]\d{1,14}/i })
                        }
                    />
                    <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                </div>

                <div className='form-floating mb-3'>
                    <button
                        className='w-100 btn btn-primary'
                        type='button'
                        disabled={!formState.isValid}
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