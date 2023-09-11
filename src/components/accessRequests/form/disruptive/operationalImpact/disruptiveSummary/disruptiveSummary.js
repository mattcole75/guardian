import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const DisruptiveSummary = (props) => {

    const { roles, id, summary, save, status } = props;

    const isPlanner = roles.includes('planner');

    let isLocked = false;
    if(status === 'Submitted' || status === 'Approved'){
        isLocked = true;
    }

    const { register, getValues, formState: { errors, isDirty, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: summary && summary.title,
            startDate: summary && summary.startDate,
            endDate:  summary && summary.endDate
        }
    });

    const onUpdate = debounce(() => {
        if(isValid)
            save(id, { summary: { ...getValues() } }, 'SAVE_DISRUPTIVE');
    }, 2000);

    useEffect(() => {
        if(isValid) {
            onUpdate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid, isDirty, getValues]);

    return (
            <form className=''>
                <fieldset disabled={ !isPlanner }>
                    <div className='row g-2 p-1 text-start'>
                        <h3 className='h5 text-muted'>Summary</h3>
                    </div>

                    <div className='form-floating mb-3'>
                        <input type='text' className='form-control' id='title' autoComplete='off' placeholder='Disruptive Title' required 
                            disabled={ (!isPlanner && !isLocked) || isLocked }
                            {...register('title', {
                                required: "You must specify a title",
                            minLength: {
                                value: 5,
                                message: "The Title must have at least 5 characters"
                            },
                            maxLength: {
                                value: 50,
                                message: 'The Title must have less than 50 characters'
                            },
                            onChange: onUpdate
                            })} />
                        <label htmlFor='title' className='form-label'>Title</label>
                    </div>
                    { errors.title && <p className='form-error mt-1 text-start'>{errors.title.message}</p> }
                    <div className='row g-2 mb-3'>
                        <div className='form-floating  col-sm-6'>
                            <input type='date' className='form-control' id='startDate' placeholder='First day of the disruptive' disabled={ (!isPlanner && !isLocked) || isLocked }
                                {...register('startDate', {
                                    required: 'You must provide a start date',
                                    onChange: onUpdate
                                })} />
                            <label htmlFor='startDate' className='form-label'>Disruptive First day</label>
                        </div>
                        <div className='form-floating col-sm-6 mb-1'>
                            <input type='date' className='form-control' id='endDate' placeholder='Last day of the disruptive' disabled={ (!isPlanner && !isLocked) || isLocked }
                                {...register('endDate', {
                                    required: 'You must provide an end date',
                                    onChange: onUpdate
                                })} />
                            <label htmlFor='endDate' className='form-label'>Disruptive Last day</label>
                        </div>
                    </div>
                    { errors.startDate && <p className='form-error mt-1 text-start'>{errors.startDate.message}</p> }
                    { errors.endDate && <p className='form-error mt-1 text-start'>{errors.endDate.message}</p> }
                </fieldset>
            </form>
    );
}

export default DisruptiveSummary;