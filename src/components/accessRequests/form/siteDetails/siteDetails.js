import React, { useEffect } from "react";

import { useForm } from 'react-hook-form';

const SiteDetails = (props) => {

    const { siteDetails, update, recordLocked, siteDetailsIsValid, status } = props;
    const { register, reset, getValues, formState: { isValid, errors } } = useForm({ mode: 'onBlur' });


    useEffect(() => {
        if(siteDetails) {
            reset(siteDetails);
        }
    }, [reset, siteDetails]);

    const onUpdate = () => {
        update(getValues());
        siteDetailsIsValid(isValid);
    }

    let statusCSS = [];
    statusCSS.push('badge d-inline-block text-nowrap');

    switch(status && status) {
        case 'Draft':
            statusCSS.push('bg-secondary');
            break;
        case 'Submitted':
            statusCSS.push('bg-warning text-dark');
            break;
        case 'Under Review':
            statusCSS.push('bg-warning text-dark');
            break;
        case 'Denied':
            statusCSS.push('bg-danger');
            break;
        case 'Granted':
            statusCSS.push('bg-success');
            break;
        case 'Completed':
            statusCSS.push('bg-secondary')
            break;
        case 'Cancelled':
            statusCSS.push('bg-info')
            break;
        default:
            break;
    }

    return (
        <div className="mb-3">
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    <h4 className='h4 fw-normal'>Site Details</h4>
                </div>
                <div>
                    <span className={statusCSS.join(' ')}>{ status }</span>
                </div>
            </div>
            <div className='form-floating mb-2'>
                <input type='text' className='form-control' id='siteDescription' autoComplete='off' placeholder='Site Description' minLength={5} maxLength={50} required disabled={ recordLocked }
                    { ...register('siteDescription', { onChange: onUpdate, 
                        required: "You must provide a Site Description",
                        minLength: {
                            value: 5,
                            message: "The Site Description must have at least 5 characters"
                        },
                        maxLength: {
                            value: 50,
                            message: 'The Site Description must have 50 characters or less'
                        }
                    }) }
                />
                <label htmlFor='siteDescription' className='form-label'>Site Description</label>
                { errors.siteDescription && <p className='form-error mt-1 text-start'>{errors.siteDescription.message}</p> }
            </div>

            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='urgentAccessRequired' disabled={ recordLocked }
                            { ...register('urgentAccessRequired', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        This is an urgent access request
                        <small className='d-block text-muted'>Indicate if this access request is urgent and will not follow agreed timescales</small>
                    </span>
                </label>
            </div>

            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='electricalIsolationRequired' disabled={ recordLocked }
                            { ...register('electricalIsolationRequired', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Electrical Resource Required
                        <small className='d-block text-muted'>Indicate if this access request will require an electrical resource</small>
                    </span>
                </label>
            </div>
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='signallingResourceRequired' disabled={ recordLocked }
                            {...register('signallingResourceRequired', { onChange: onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Signalling Resource Required
                        <small className='d-block text-muted'>Indicate if this access request will require signalling resource (e.g. Axle Counter Reset)</small>
                    </span>
                </label>
            </div>
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='testTramsRequired' disabled={ recordLocked }
                            {...register('testTramsRequired', { onChange: onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Test Trams Required
                        <small className='d-block text-muted'>Indicate if this access request will require test trams</small>
                    </span>
                </label>
            </div>
        </div>
    );
}

export default SiteDetails;