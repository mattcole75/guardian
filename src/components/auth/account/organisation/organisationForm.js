import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const OrganisationForm = (props) => {

    const { organisation, save, toggle } = props;

    const { register, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues: { organisation: organisation }
    });

    const onSave = useCallback((data) => {
        save({ ...data });
        toggle();

    }, [save, toggle]);

    return (
        <div className='form-auth'>
            <form className='was-validated'>
                <h1 className='h3 mb-3 fw-normal'>Organisation</h1>

                <div className="form-floating mb-3">
                    <input 
                        type="text"
                        className="form-control"
                        id="organisation"
                        placeholder="Your organisation"
                        required
                        autoComplete='off'
                        minLength={3}
                        maxLength={32}
                        {...register("organisation", { required: true, minLength: 3, maxLength: 32 })}
                    />
                    <label htmlFor="organisation" className="form-label">Organisation</label>
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

export default OrganisationForm;