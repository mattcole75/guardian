import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const EmailForm = (props) => {

    const { email, save, toggle } = props;

    const { register, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues: { email: email }
    });

    const onSave = useCallback((data) => {
        save({ ...data });
        toggle();

    }, [save, toggle]);

    return (
        <div className='form-auth'>
            <form className='was-validated'>
                <h1 className='h3 mb-3 fw-normal'>Email</h1>

                <div className="form-floating mb-3">
                    <input 
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        required
                        autoComplete='off'
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                    <label htmlFor="email" className="form-label">Email address</label>
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

export default EmailForm;