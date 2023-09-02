import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const OrganisationForm = (props) => {

    const { organisation, save, toggle } = props;

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        defaultValues: { organisation: organisation }
    });

    const [applyValidationCss, setApplyValidationCss] = useState(false);

    useEffect(() => {
        if(errors.organisation)
            setApplyValidationCss(true);
        
    }, [errors]);

    const onSave = useCallback((data) => {
        save({ ...data });
        toggle();

    }, [save, toggle]);

    return (
        <div className='form-auth'>
            <form className={ applyValidationCss ? 'was-validated' : '' }>
                <h1 className='h3 mb-3 fw-normal'>Organisation</h1>

                <div className="form-floating mb-3">
                    <input 
                        type='text' className='form-control form-ele-mid' id='organisation' placeholder='Your organisation' required autoComplete='off' minLength={3} maxLength={64}
                        {...register('organisation', {
                            required: "You must specify an Organisation Name",
                            minLength: {
                                value: 3,
                                message: "Your Organisation Name must have at least 3 characters"
                            },
                            maxLength: {
                                value: 64,
                                message: 'Your Organisation Name must have less than 64 characters'
                            }
                        }) }
                    />
                    <label htmlFor="organisation" className="form-label">Organisation</label>
                </div>

                { errors.organisation && <p className='form-error mt-1'>{errors.organisation.message}</p> }

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

export default OrganisationForm;