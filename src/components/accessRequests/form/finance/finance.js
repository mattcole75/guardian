import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const Finance = (props) => {

    const { accessRequest, save, recordLocked } = props;

    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: ((accessRequest == null || accessRequest.finance == null) ? null : accessRequest.finance)

    });

    const onSave = debounce(() => {
        save({ finance: getValues() }, 'SAVE_ACCESS_REQUEST');
    }, 2000);
    
    
    // useCallback((data) => {
    //     save({ finance: data }, 'SAVE_REQUEST');
    // }, [save]);

    return (
        <div>
            <div>
                {/* finance */}
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='estimateReferenceNumber' autoComplete='off' placeholder='Request title' required
                        disabled={recordLocked}
                        {...register('estimateReferenceNumber', { required: true, minLength: 3, onChange: onSave })} />
                    <label htmlFor='estimateReferenceNumber' className='form-label'>Estimate Reference Number</label>
                </div>
                <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='purchaseOrderReferenceNumber' autoComplete='off' placeholder='Request title' required={false}
                        disabled={recordLocked}
                        {...register('purchaseOrderReferenceNumber', { required: false, minLength: 3, onChange: onSave })} />
                    <label htmlFor='purchaseOrderReferenceNumber' className='form-label'>Purchase Order Reference Number</label>
                </div>
            </div>

            {/* {!recordLocked 
                ? <div>
                    <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={handleSubmit(onSave)}>Save Finance Details</button>
                </div>
                : null
            } */}
        </div>
    );
}

export default Finance;