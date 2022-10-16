import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const Finance = (props) => {

    const { request, save, editable } = props;

    const { register, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: ((request == null || request.finance == null) ? null : request.finance)

    });

    const onSave = useCallback((data) => {
        save({ finance: data }, 'SAVE_REQUEST');
    }, [save]);

    return (
        <div>
            <div>
                {/* finance */}
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='estimateReferenceNumber' autoComplete='off' placeholder='Request title' required
                        disabled={!editable}
                        {...register('estimateReferenceNumber', { required: true, minLength: 3 })} />
                    <label htmlFor='estimateReferenceNumber' className='form-label'>Estimate Reference Number</label>
                </div>
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='purchaseOrderReferenceNumber' autoComplete='off' placeholder='Request title' required='false'
                        disabled={!editable}
                        {...register('purchaseOrderReferenceNumber', { required: false, minLength: 3 })} />
                    <label htmlFor='purchaseOrderReferenceNumber' className='form-label'>Purchase Order Reference Number</label>
                </div>
            </div>

            {editable 
                ? <div>
                    <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={handleSubmit(onSave)}>Save Finance Details</button>
                </div>
                : null
            }
        </div>
    );
}

export default Finance;