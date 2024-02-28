import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';


const AdditionalInformation = (props) => {

    const { additionalInformation, update, recordLocked } = props;
    const { register, reset, getValues, formState: { errors } } = useForm({ mode: 'onBlur' });

    useEffect(() => {
        if(additionalInformation) {
            reset(additionalInformation);
        }
    }, [reset, additionalInformation]);

    const onUpdate = () => {
        update(getValues());
    }

    return (
        <div>
            <div className='text-start'>
                <h4 className='h4 fw-normal'>f) Additional Information</h4>
            </div>
            <div className='form-floating'>
                <textarea className='form-control' id='additionalInformation'  
                    rows='5' minLength={5} style={{height:'auto'}} placeholder='Additional Information' disabled={recordLocked}
                    {...register('additionalInformation', { onChange:  onUpdate,
                        minLength: {
                            value: 5,
                            message: "The requirement must have at least 5 characters"
                        },
                        maxLength: {
                            value: 250,
                            message: "The requirement must have less than 250 characters"
                        }
                    })}
                />
                <label htmlFor='additionalInformation' className='form-label'>Additional Information (Optional)</label>
                { errors.additionalInformation && <p className='form-error mt-1 text-start'>{errors.additionalInformation.message}</p> }
            </div>
        </div>
    );
}

export default AdditionalInformation;