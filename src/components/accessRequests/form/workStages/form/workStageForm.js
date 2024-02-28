import React, { useCallback } from "react";
import { useForm } from 'react-hook-form';

const WorkStageForm = (props) => {

    const { recordLocked, save, toggle } = props;

    const { register, getValues, handleSubmit, formState: { errors } } = useForm({ 
        mode: 'onChange', 
    });

    const onSubmit = useCallback(() => {
        save('ADD', null,  { ...getValues() });
    }, [getValues, save]);

    return (
        <form className='form-location my-1 shadow' onSubmit={handleSubmit(onSubmit)}>
            <div className='p-1'>
                <h1 className='h3 mb-3 fw-normal text-start'>Work Stage</h1>
            </div>

            <p className='text-start'><strong>Note:</strong> Indicate key stages of work, i.e: Erecting of scaffold, carry out roof inspection, remove scaffold.</p>

            <div className='form-floating mb-2'>
                <input type='text' className='form-control' id='work_stage' autoComplete='off' placeholder='Work Stage' minLength={5} maxLength={61} required disabled={recordLocked}
                    { ...register('work_stage', {
                        required: "You must provide a work stage description",
                        minLength: {
                            value: 5,
                            message: "The work stage description must have at least 5 characters"
                        },
                        maxLength: {
                            value: 60,
                            message: 'The work stage description must have 60 characters or less'
                        }
                    }) }
                />
                <label htmlFor='work_stage' className='form-label'>Work Stage</label>
                { errors.work_stage && <p className='form-error mt-1 text-start'>{errors.work_stage.message}</p> }
            </div>

            {!recordLocked
                ?   <div className='form-floating mb-3'>
                        <button className='w-100 btn btn-lg btn-primary' type='submit'>Ok</button>
                    </div>
                :   null
            }
            <div className='form-floating mb-5'>
                <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={ toggle }>Close</button>
            </div>

        </form>
    );
}

export default WorkStageForm;