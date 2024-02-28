import React, { useEffect, useState } from "react";

import { useForm } from 'react-hook-form';

const SiteDetails = (props) => {

    const { siteDetails, update, recordLocked, siteDetailsIsValid, status } = props;
    const { register, reset, getValues, formState: { isValid, errors } } = useForm({ mode: 'onBlur' });

    const [thirdPartiesOnSite, setThirdPartiesOnSite] = useState(false);

    useEffect(() => {
        // console.log(siteDetails);
        console.log(thirdPartiesOnSite);
        if(siteDetails) {
            reset(siteDetails);
        }

        if(siteDetails?.thirdPartiesOnSite === true) {
            setThirdPartiesOnSite(true);
        } else {
            setThirdPartiesOnSite(false);
        }
    }, [reset, siteDetails, thirdPartiesOnSite]);

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
                    <h4 className='h4 fw-normal'>a) Site Details</h4>
                </div>
                <div>
                    <span className={statusCSS.join(' ')}>{ status }</span>
                </div>
            </div>
            <div className='form-floating mb-2'>
                <input type='text' className='form-control' id='natureOfWork' autoComplete='off' placeholder='Site Description' minLength={5} maxLength={50} required disabled={ recordLocked }
                    { ...register('natureOfWork', { onChange: onUpdate, 
                        required: "You must describe the nature of work",
                        minLength: {
                            value: 5,
                            message: "The Nature of Work must have at least 5 characters"
                        },
                        maxLength: {
                            value: 50,
                            message: 'The Nature of Work must have 50 characters or less'
                        }
                    }) }
                />
                <label htmlFor='natureOfWork' className='form-label'>Nature of work</label>
                { errors.natureOfWork && <p className='form-error mt-1 text-start'>{errors.natureOfWork.message}</p> }
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
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='electricalResourceRequired' disabled={ recordLocked }
                            { ...register('electricalResourceRequired', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Electrical Resource Required
                        <small className='d-block text-muted'>Indicate if this access request will require an electrical resource</small>
                    </span>
                </label>
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
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='thirdPartiesOnSite' disabled={ recordLocked }
                            {...register('thirdPartiesOnSite', { onChange: onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Will there be third party contractors on site?
                        <small className='d-block text-muted'>Indicate if there will be on side third parties under requesters control</small>
                    </span>
                </label>

                { thirdPartiesOnSite === true
                    ?   <div className='list-group-item d-flex gap-2'>
                            <div className='form-floating w-100'>
                                <input type='text' className='form-control' id='onSiteThirdParties' autoComplete='off' placeholder='On site third parties' minLength={0} maxLength={61} disabled={ recordLocked }
                                    { ...register('onSiteThirdParties', { onChange: onUpdate }) }
                                />
                                <label htmlFor='natureOfWork' className='form-label'>On site third parties</label>
                            </div>
                        </div>
                    :   null
                }
            </div>
        </div>
    );
}

export default SiteDetails;