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

    const { register, formState, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            disruptiveTitle: summary && summary.disruptiveTitle,
            disruptiveStartDate: summary && summary.disruptiveStartDate,
            disruptiveEndDate:  summary && summary.disruptiveEndDate
        }
    });

    useEffect(() => {
        const onUpdate = debounce(() => {
            save(id, { summary: { ...getValues() } });
        }, 2000);

        if(formState.isValid && formState.isDirty) {
            onUpdate();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState.isValid, formState.isDirty]);

    return (
            <form className=''>
                <fieldset disabled={ !isPlanner }>
                    <div className='row g-2 p-1 text-start'>
                        <h3 className='h5 text-muted'>Summary</h3>
                    </div>

                    <div className='form-floating mb-3'>
                        <input type='text' className='form-control' id='disruptiveTitle' autoComplete='off' placeholder='Request title' required 
                            disabled={ (!isPlanner && !isLocked) || isLocked }
                            {...register('disruptiveTitle', { required: true, minLength: 3 })} />
                        <label htmlFor='disruptiveTitle' className='form-label'>Title</label>
                    </div>
                    <div className='row g-2 mb-3'>
                        <div className='form-floating  col-sm-6'>
                            <input type='date' className='form-control' id='disruptiveStartDate' placeholder='First day of the disruptive' disabled={ (!isPlanner && !isLocked) || isLocked }
                                {...register('disruptiveStartDate', { required: true })} />
                            <label htmlFor='disruptiveStartDate' className='form-label'>Disruptive First day</label>
                        </div>
                        <div className='form-floating col-sm-6 mb-1'>
                            <input type='date' className='form-control' id='disruptiveEndDate' placeholder='Last day of the disruptive' disabled={ (!isPlanner && !isLocked) || isLocked }
                                {...register('disruptiveEndDate', { required: true })} />
                            <label htmlFor='disruptiveEndDate' className='form-label'>Disruptive Last day</label>
                        </div>
                    </div>
                </fieldset>
            </form>
    );
}

export default DisruptiveSummary;