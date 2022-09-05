import React from 'react';
import { useForm } from 'react-hook-form';

const Filter = () => {

    const { register, handleSubmit, formState, getValues } = useForm({ 
        mode: 'onChange'
    });

    return (
        <header className="py-3 mb-4 border-bottom">
            <div className="container d-flex flex-wrap justify-content-center">
            <div className="d-flex align-items-center mb-3 mb-lg-0 me-lg-5 text-dark text-decoration-none">
                <p className="h4"> Date Range:</p>
            </div>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
                <div className='row g-2 bg-light'>
                        <div className='form-floating  col-sm-6'>
                            <input type='date' className='form-control' id='filterStartDate' placeholder='Date'
                                {...register('filterStartDate', { required: false })} />
                            <label htmlFor='filterStartDate' className='form-label'>Start Date</label>
                        </div>
                        <div className='form-floating col-sm-6 mb-1'>
                            <input type='date' className='form-control' id='filterEndDate' placeholder='Date'
                                {...register('filterEndDate', { required: false })} />
                            <label htmlFor='filterEndDate' className='form-label'>End Date</label>
                        </div>
                </div>
            </form>
            </div>
        </header>
    )
}

export default Filter;