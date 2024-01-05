import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import picop_list from '../../../../configuration/lists/picop.json';
import pic_list from '../../../../configuration/lists/pic.json';
import lines from '../../../../configuration/lists/lines.json';
import isolationTypes from '../../../../configuration/lists/isolationTypes.json';
import rrvTypes from '../../../../configuration/lists/rrv.json';
import trolleyTypes from '../../../../configuration/lists/trolley.json';
import heavyMachineTypes from '../../../../configuration/lists/heavyMachines.json';

const PlannerInformation = (props) => {
    const { plannerInformation, update, save, isPlanner } = props;
    const { register, reset, getValues, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });

    const [ redirect, setRedirect ] = useState(null);

    useEffect(() => {
        if(plannerInformation) {
            reset(plannerInformation);
        }
    }, [reset, plannerInformation]);

    const onUpdate = () => {
        update(getValues());
    }

    const onClose = () => {
        setRedirect(<Navigate to='/planning' />);
    }

    const onSave = (action) => {
        console.log('do something');
        switch (action) {
            case 'UPDATE':
                save('Under Review');
                break;
            case 'DENY':
                save('Denied');
                onClose();
                break;
            case 'GRANT':
                save('Granted');
                onClose();
                break;
            case 'COMPLETE':
                save('Completed');
                onClose();
                break;
            case 'DELETE':
                save('Deleted');
                onClose();
                break;
            default:
                return;
        }
    }

    return (
        <form className="mb-3">
            { redirect }
            <div className='text-start'>
                <h4 className='h4 fw-normal'>Planning</h4>
            </div>
            {/* Possession Details */}
            <div className='form-floating mb-2'>
                <input type='text' className='form-control' id='possessionDetails' autoComplete='off' placeholder='Possession Details' minLength={5} maxLength={101} required disabled={ !isPlanner }
                    { ...register('possessionDetails', { onChange: onUpdate, 
                        required: "You must provide possession details",
                        minLength: {
                            value: 5,
                            message: "Possession details must have at least 5 characters"
                        },
                        maxLength: {
                            value: 100,
                            message: 'Possession details must have 100 characters or less'
                        }
                    }) }
                />
                <label htmlFor='possessionDetails' className='form-label'>Possession Details</label>
                { errors.possessionDetails && <p className='form-error mt-1 text-start'>{errors.possessionDetails.message}</p> }
            </div>
            {/* PICOP & PIC */}
            <div className='row g-2'>

                    <div className='form-floating col-sm-6 mb-2'>
                        <select className='form-select' id='picop' required disabled={ !isPlanner }
                            { ...register('picop', { onChange: onUpdate, required: 'A start location must be selected' }) }>
                            <option value=''>Choose...</option>
                            {
                                picop_list.map(item => {
                                    return (<option key={ item.name } value={ item.name + ' - ' + item.phone }>{ item.name + ' - ' + item.phone  }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='picop'>PICOP</label>
                        { errors.picop && <p className='form-error mt-1 text-start'>{ errors.picop.message }</p> }
                    </div>

                    <div className='form-floating  col-sm-6 mb-2'>
                        <select className='form-select' id='pic' required disabled={ !isPlanner }
                            {...register('pic', { onChange: onUpdate, required: 'A location must be selected' })}>
                            <option value=''>Choose...</option>
                            {
                                pic_list.map(item => {
                                    return (<option key={ item.name } value={ item.name + ' - ' + item.phone }>{ item.name + ' - ' + item.phone  }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='pic'>PIC</label>
                        { errors.pic && <p className='form-error mt-1 text-start'>{ errors.pic.message }</p> }
                    </div>
                </div>
                {/* adjacent to NWR */}
                <div className='list-group mb-2'>
                    <label className='list-group-item d-flex gap-2'>
                        <div className='form-check form-switch'>
                            <input className='form-check-input' type='checkbox' role='switch' id='nwrAdjacent' disabled={ !isPlanner }
                                { ...register('nwrAdjacent', { onChange:  onUpdate })}
                            />
                        </div>
                        <span className='text-start'>
                            NWR Adjacent
                            <small className='d-block text-muted'>Is the worksite adjacent to Network Rail Infrastructure?</small>
                        </span>
                    </label>
                </div>
                {/* Co Locate and Line */}
                <div className='list-group mb-2'>
                    <label className='list-group-item d-flex gap-2'>
                        <div className='form-check form-switch'>
                            <input className='form-check-input' type='checkbox' role='switch' id='coLocate' disabled={ !isPlanner }
                                { ...register('coLocate', { onChange:  onUpdate })}
                            />
                        </div>
                        <span className='text-start'>
                            Co-Locatable
                            <small className='d-block text-muted'>Can the worksite be co-located with more than one organisation?</small>
                        </span>
                    </label>
                </div>
                 <div className='row g-2'>
                    <div className='form-floating col-sm-6 mb-2'>
                        <select className='form-select' id='line' required disabled={ !isPlanner }
                            {...register('line', { onChange: onUpdate, required: 'A location must be selected' })}>
                            <option value=''>Choose...</option>
                            {
                                lines.map(item => {
                                    return (<option key={ item.code } value={ item.line }>{ item.line }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='line'>Line</label>
                        { errors.line && <p className='form-error mt-1 text-start'>{ errors.line.message }</p> }
                    </div>
                    {/* Worksite limits */}
                    <div className='form-floating col-sm-6 mb-2'>
                        <input type='text' className='form-control' id='worksiteLimits' autoComplete='off' placeholder='Worksite Limits' minLength={5} maxLength={101} required disabled={ !isPlanner }
                            { ...register('worksiteLimits', { onChange: onUpdate, 
                                required: "You must detail the worksite limits",
                                minLength: {
                                    value: 5,
                                    message: "Worksite limits must have at least 5 characters"
                                },
                                maxLength: {
                                    value: 100,
                                    message: 'Worksite limits must have 100 characters or less'
                                }
                            }) }
                        />
                        <label htmlFor='worksiteLimits' className='form-label'>Worksite Limits</label>
                        { errors.worksiteLimits && <p className='form-error mt-1 text-start'>{errors.worksiteLimits.message}</p> }
                    </div>
                </div>
                {/* Isolation Details */}
                <div className='row g-2'>
                    <div className='form-floating col-sm-6 mb-2'>
                        <select className='form-select' id='isolationType' required disabled={ !isPlanner }
                            {...register('isolationType', { onChange: onUpdate, required: 'An isolation type must be selected' })}>
                            <option value=''>Choose...</option>
                            {
                                isolationTypes.map(item => {
                                    return (<option key={ item.type } value={ item.type }>{ item.type }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='isolationType'>Isolation Type</label>
                        { errors.isolationType && <p className='form-error mt-1 text-start'>{ errors.isolationType.message }</p> }
                    </div>
                    <div className='form-floating col-sm-6 mb-2'>
                        <input type='text' className='form-control' id='isolationDetails' autoComplete='off' placeholder='Isolation Details' minLength={5} maxLength={51} disabled={ !isPlanner }
                            { ...register('isolationDetails', { onChange: onUpdate,
                                minLength: {
                                    value: 5,
                                    message: "Isolation details must have at least 5 characters"
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Isolation details must have 50 characters or less'
                                }
                            }) }
                        />
                        <label htmlFor='isolationDetails' className='form-label'>Isolation Details</label>
                        { errors.isolationDetails && <p className='form-error mt-1 text-start'>{errors.isolationDetails.message}</p> }
                    </div>
                </div>
                {/* on track machines */}
                <div className='row g-2'>
                    <div className='form-floating col-sm-6 mb-2'>
                        <input type='number' className='form-control' id='onTrackMachineCount' autoComplete='off' placeholder='On Track Machine Count' min={0} max={10} disabled={ !isPlanner }
                            { ...register('onTrackMachineCount', { onChange: onUpdate,
                                min: {
                                    value: 0,
                                    message: "The minimum count is 0"
                                },
                                max: {
                                    value: 10,
                                    message: 'The maximum count is 10'
                                }
                            }) }
                        />
                        <label htmlFor='onTrackMachineCount' className='form-label'>On Track Machine Count</label>
                        { errors.onTrackMachineCount && <p className='form-error mt-1 text-start'>{errors.onTrackMachineCount.message}</p> }
                    </div>
                    <div className='form-floating col-sm-6 mb-2'>
                        <select className='form-select' id='rrvType' required disabled={ !isPlanner }
                            {...register('rrvType', { onChange: onUpdate, required: 'A RRV type must be selected' })}>
                            <option value=''>Choose...</option>
                            {
                                rrvTypes.map(item => {
                                    return (<option key={ item.type } value={ item.type }>{ item.type }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='rrvType'>RRV Type</label>
                        { errors.rrvType && <p className='form-error mt-1 text-start'>{ errors.rrvType.message }</p> }
                    </div>
                    
                </div>

                <div className='row g-2'>
                    <div className='form-floating col-sm-6 mb-2'>
                        <select className='form-select' id='trolleyType' required disabled={ !isPlanner }
                            {...register('trolleyType', { onChange: onUpdate, required: 'A trolley type must be selected' })}>
                            <option value=''>Choose...</option>
                            {
                                trolleyTypes.map(item => {
                                    return (<option key={ item.type } value={ item.type }>{ item.type }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='trolleyType'>Trolley Type</label>
                        { errors.trolleyType && <p className='form-error mt-1 text-start'>{ errors.trolleyType.message }</p> }
                    </div>
                    <div className='form-floating col-sm-6 mb-2'>
                        <select className='form-select' id='heavyMachineType' required disabled={ !isPlanner }
                            {...register('heavyMachineType', { onChange: onUpdate, required: 'A machine type must be selected' })}>
                            <option value=''>Choose...</option>
                            {
                                heavyMachineTypes.map(item => {
                                    return (<option key={ item.type } value={ item.type }>{ item.type }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='heavyMachineType'>Heavy Machines</label>
                        { errors.heavyMachineType && <p className='form-error mt-1 text-start'>{ errors.heavyMachineType.message }</p> }
                    </div>
                </div>
                {/* site remarks */}
                <div className='form-floating mb-2'>
                    <textarea className='form-control' id='siteRemarks'  
                        rows='5' minLength={5} style={{height:'auto'}} placeholder='Site Remarks' disabled={ !isPlanner}
                        {...register('siteRemarks', { onChange:  onUpdate,
                            minLength: {
                                value: 5,
                                message: "Site remarks must have at least 5 characters"
                            },
                            maxLength: {
                                value: 250,
                                message: "Site remarks must have less than 250 characters"
                            }
                        })}
                    />
                    <label htmlFor='siteRemarks' className='form-label'>Site Remarks (Optional)</label>
                    { errors.siteRemarks && <p className='form-error mt-1 text-start'>{errors.siteRemarks.message}</p> }
                </div>
                
                

            { isPlanner
                ?   <div>
                        <button className='w-100 btn btn-lg btn-primary mb-2' type='button' onClick={ () => onSave('UPDATE') } disabled={ !isValid }>Save Update</button>
                        <button className='w-100 btn btn-lg btn-warning mb-2' type='button' onClick={ () => onSave('DENY') }>Deny Access</button>
                        <button className='w-100 btn btn-lg btn-success mb-2' type='button' onClick={ () => onSave('GRANT') }>Grant Access</button>
                        <button className='w-100 btn btn-lg btn-info mb-2' type='button' onClick={ () => onSave('COMPLETE') }>Complete</button>
                        <button className='w-100 btn btn-lg btn-danger mb-2' type='button' onClick={ () => onSave('DELETE') }>Delete</button>
                        <button className='w-100 btn btn-lg btn-secondary mb-2' type='button' onClick={ onClose }>Return to list</button>
                     </div>
                :   null
            }
            
        </form>
    )

}

export default PlannerInformation;