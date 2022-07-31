import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const DisplayNameForm = (props) => {

    const { displayName, save, toggle } = props;

    const { register, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues: { displayName: displayName }
    });

    const onSave = useCallback((data) => {

        save({data});
        toggle();

    }, [save, toggle]);

    return (
        <div className='form-auth my-5'>
            <form className='was-validated'>
                <h1 className='h3 mb-3 fw-normal'>Display name</h1>

                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        id='displayName'
                        placeholder='Your display name'
                        required
                        minLength={3}
                        maxLength={32}
                        { ...register('displayName', { required: true, minLength: 3, maxLength: 32 })}
                    />
                    <label htmlFor='displayName' className='form-label'>Display name</label>
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

export default DisplayNameForm  ;