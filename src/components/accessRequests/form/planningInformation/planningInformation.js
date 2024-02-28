import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import '../../accessRequests.css';

import picop_list from '../../../../configuration/lists/picop.json';
import pic_list from '../../../../configuration/lists/pic.json';
import lines from '../../../../configuration/lists/lines.json';
import isolationTypes from '../../../../configuration/lists/isolationTypes.json';
import onTrackPlantTypes from '../../../../configuration/lists/onTrackPlantTypes.json';
import trolleyTypes from '../../../../configuration/lists/trolley.json';
import onTrackMachineTypes from '../../../../configuration/lists/onTrackMachineTypes.json';
import possessionCategories from '../../../../configuration/lists/possessionCategories.json';
import tramConfigurationTypes from '../../../../configuration/lists/tramConfigurationTypes.json';
import organisations from '../../../../configuration/lists/organisations.json';

const PlanningInformation = (props) => {
    
    const { planningInformation, update, save, isPlanner, status, identifier, planners } = props;
    const { register, reset, getValues, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

    const [ redirect, setRedirect ] = useState(null);
    const [ isDirty, setIsDirty ] = useState(false);

    useEffect(() => {
        if(planningInformation) {
            reset(planningInformation);
        }
    }, [reset, planningInformation]);

    useEffect(() => {
        if(identifier === 'PLANNER_UPDATE_ACCESS_REQUEST')
            onClose();
    }, [identifier]);

    const onUpdate = () => {
        update(getValues());
        setIsDirty(true);
    }

    const onClose = () => {
        setRedirect(<Navigate to='/planning' />);
    }

    const onSave = (action) => {
        switch (action) {
            case 'UPDATE':
                save('Under Review');
                break;
            case 'DENY':
                save('Denied');
                break;
            case 'GRANT':
                save('Granted');
                break;
            case 'COMPLETE':
                save('Completed');
                break;
            case 'CANCEL':
                save('Cancelled');
                break;
            default:
                break;
        }

        setIsDirty(false);
    }

    let categoryCSS = [];
    categoryCSS.push('badge d-inline-block text-nowrap');

    switch(planningInformation && planningInformation.possessionCategory) {
        case 'Standard':
            categoryCSS.push('text-dark');
            break;
        case 'Third Party Works':
            categoryCSS.push('bg-ThirdPartyWorks text-dark');
            break;
        case 'Disruptive Possession':
            categoryCSS.push('bg-DisruptivePossession text-dark');
            break;
        case 'Wheels Free Required':
            categoryCSS.push('bg-WheelsFreeRequired');
            break;
        case 'Conflict/Conflicting Information':
            categoryCSS.push('bg-ConflictConflictingInformation');
            break;
        case 'Cancelled Works':
            categoryCSS.push('bg-CancelledWorks text-danger');
            break;
        case 'Changed Works':
            categoryCSS.push('bg-ChangedWorks');
            break;
        case 'Day Works':
            categoryCSS.push('bg-DayWorks text-dark')
            break;
        case 'No Possession Req/Blue Permit Works':
            categoryCSS.push('bg-NoPossessionReqBluePermitWorks')
            break;
        default:
            break;
    }

    return (
        <form className="mb-3">
            { redirect }
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div>
                    <h4 className='h4 fw-normal'>a) Planning</h4>
                </div>
                <div>
                    <span className={categoryCSS.join(' ')}>{ planningInformation && planningInformation.possessionCategory }</span>
                </div>
            </div>

            <div className='form-floating col-sm-6 mb-2'>
                <select className='form-select' id='planner' required disabled={ !isPlanner }
                    {...register('planner', { onChange: onUpdate, required: 'A planner must be selected' })}>
                    <option value=''>Choose...</option>
                    {
                        planners.map(item => {
                            return (<option className='success' key={ item } value={ item }>{ item }</option>)
                        })
                    }
                </select>
                <label htmlFor='planner'>Planner</label>
                { errors.planner && <p className='form-error mt-1 text-start'>{ errors.planner.message }</p> }
            </div>

            {/* Possession Details */}
            <p className='text-start h4'>b) Possession</p>
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
            {/* category and escalation date */}
            <div className='row g-2'>
                <div className='form-floating col-sm-6 mb-2'>
                    <select className='form-select' id='possessionCategory' required disabled={ !isPlanner }
                        {...register('possessionCategory', { onChange: onUpdate, required: 'A possession category must be selected' })}>
                        <option value=''>Choose...</option>
                        {
                            possessionCategories.map(item => {
                                return (<option className='success' key={ item.category } value={ item.category }>{ item.category }</option>)
                            })
                        }
                    </select>
                    <label htmlFor='possessionCategory'>Possession Category</label>
                    { errors.possessionCategory && <p className='form-error mt-1 text-start'>{ errors.possessionCategory.message }</p> }
                </div>
                <div className='form-floating  col-sm-6 mb-2'>
                    <input type='date' className='form-control' id='escalatedDate' placeholder='Date' disabled={ !isPlanner }
                        { ...register('escalatedDate', { onChange: onUpdate }) } />
                    <label htmlFor='escalatedDate' className='form-label'>Escalated Date</label>
                </div>
            </div>
            {/* PICOP & PIC */}
            <div className='row g-2'>
                <div className='form-floating col-sm-6 mb-2'>
                    <select className='form-select' id='picop' required disabled={ !isPlanner }
                        { ...register('picop', { onChange: onUpdate, required: 'A start location must be selected' }) }>
                        <option value=''>Choose...</option>
                        {
                            picop_list.map(item => {
                                return (<option key={ item.name } value={ item.name }>{ item.name + ' - ' + item.phone  }</option>)
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
                                return (<option key={ item.name } value={ item.name }>{ item.name + ' - ' + item.phone  }</option>)
                            })
                        }
                    </select>
                    <label htmlFor='pic'>PIC</label>
                    { errors.pic && <p className='form-error mt-1 text-start'>{ errors.pic.message }</p> }
                </div>
            </div>
            
            {/* possession concerns */}
            <div className='list-group mb-2'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='safetyResourceRequired' disabled={ !isPlanner }
                            { ...register('safetyResourceRequired', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Safety Resource Required
                        <small className='d-block text-muted'>Is safety resouce required for this possession?</small>
                    </span>
                </label>
            </div>
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
            {/* worksite within disruptive Possession */}
            <div className='list-group mb-2'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='withinDisruptivePossession' disabled={ !isPlanner }
                            { ...register('withinDisruptivePossession', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Worksite within disruptive possession
                        <small className='d-block text-muted'>is this worksite within a disruptive possession?</small>
                    </span>
                </label>
            </div>

            {/* organisation & location */}
            <p className='text-start h4'> c) Site Details</p>
            {/* organisation */}
            <div className='row g-2'>
                <div className='form-floating col-sm-6 mb-2'>
                    <select className='form-select' id='organisation' required disabled={ !isPlanner }
                        { ...register('organisation', { onChange: onUpdate, required: 'An organisation must be selected' }) }>
                        <option value=''>Choose...</option>
                        {
                            organisations.map(item => {
                                return (<option key={ item.organisation } value={ item.organisation }>{ item.organisation }</option>)
                            })
                        }
                    </select>
                    <label htmlFor='organisation'>Organisation</label>
                    { errors.organisation && <p className='form-error mt-1 text-start'>{ errors.organisation.message }</p> }
                </div>
                <div className='form-floating col-sm-6 mb-2'>
                    <select className='form-select' id='line' required disabled={ !isPlanner }
                        {...register('line', { onChange: onUpdate, required: 'A line must be selected' })}>
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
            </div>
            <div className='row g-2'>
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
                {/* Trams */}
                <div className='form-floating col-sm-6 mb-2'>
                    <select className='form-select' id='tramConfigurationType' required disabled={ !isPlanner }
                        {...register('tramConfigurationType', { onChange: onUpdate, required: 'A tram configuration must be selected' })}>
                        <option value=''>Choose...</option>
                        {
                            tramConfigurationTypes.map(item => {
                                return (<option className='success' key={ item.type } value={ item.type }>{ item.type }</option>)
                            })
                        }
                    </select>
                    <label htmlFor='tramConfigurationType'>Tram Configuration Type</label>
                    { errors.tramConfigurationType && <p className='form-error mt-1 text-start'>{ errors.tramConfigurationType.message }</p> }
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
                    <input type='text' className='form-control' id='switchingProgram' autoComplete='off' placeholder='Isolation Details' minLength={5} maxLength={51} disabled={ !isPlanner }
                        { ...register('switchingProgram', { onChange: onUpdate,
                            minLength: {
                                value: 3,
                                message: "Isolation details must have at least 5 characters"
                            },
                            maxLength: {
                                value: 50,
                                message: 'Isolation details must have 50 characters or less'
                            }
                        }) }
                    />
                    <label htmlFor='switchingProgram' className='form-label'>Switching Program</label>
                    { errors.switchingProgram && <p className='form-error mt-1 text-start'>{errors.switchingProgram.message}</p> }
                </div>
                <div className='form-floating mb-3'>
                    <textarea className='form-control' id='isolationDetails'  
                        rows='5' minLength={5} style={{height:'auto'}} placeholder='Isolation Details' disabled={ !isPlanner}
                        {...register('isolationDetails', { onChange:  onUpdate, required: 'An isolation details must be provided',
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
                    <select className='form-select' id='onTrackMachine' required disabled={ !isPlanner }
                        {...register('onTrackMachine', { onChange: onUpdate, required: 'A machine type must be selected' })}>
                        <option value=''>Choose...</option>
                        {
                            onTrackMachineTypes.map(item => {
                                return (<option key={ item.type } value={ item.type }>{ item.type }</option>)
                            })
                        }
                    </select>
                    <label htmlFor='onTrackMachine'>On Track Machines</label>
                    { errors.onTrackMachine && <p className='form-error mt-1 text-start'>{ errors.onTrackMachine.message }</p> }
                    
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
                <select className='form-select' id='onTrackPlant' required disabled={ !isPlanner }
                        {...register('onTrackPlant', { onChange: onUpdate, required: 'A plant type must be selected' })}>
                        <option value=''>Choose...</option>
                        {
                            onTrackPlantTypes.map(item => {
                                return (<option key={ item.type } value={ item.type }>{ item.type }</option>)
                            })
                        }
                    </select>
                    <label htmlFor='onTrackPlant'>On Track Plant</label>
                    { errors.onTrackPlant && <p className='form-error mt-1 text-start'>{ errors.rrvTonTrackPlantype.message }</p> }
                </div>
            </div>
            
            {/* site remarks */}
            <div className='form-floating mb-3'>
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
                        { isDirty || status === 'Cancelled'
                            ?   <button className='w-100 btn btn-lg btn-primary mb-2' type='button' onClick={ () => onSave('UPDATE') } disabled={ !isValid }>Save Update</button>
                            :   null
                        }
                        { status === 'Submitted' || status === 'Under Review' || status === 'Granted'
                            ?   <button className='w-100 btn btn-lg btn-danger mb-2' type='button' onClick={ () => onSave('DENY') }>Deny Access Request</button>
                            :   null
                        }
                        
                        { status === 'Submitted' || status === 'Under Review' || status === 'Denied'
                            ?   <button className='w-100 btn btn-lg btn-success mb-2' type='button' onClick={ () => onSave('GRANT') }>Grant Access Request</button>
                            :   null
                        }
                        { status === 'Granted'
                            ?   <button className='w-100 btn btn-lg btn-info mb-2' type='button' onClick={ () => onSave('COMPLETE') }>Complete Access Request</button>
                            :   null
                        }
                        { status !== 'Cancelled'
                            ?   <button className='w-100 btn btn-lg btn-warning mb-2' type='button' onClick={ () => onSave('CANCEL') }>Cancel Access Request</button>
                            :   null
                        }
                        
                        {/* <button className='w-100 btn btn-lg btn-secondary mb-2' type='button' onClick={ onClose }>Return to list</button> */}
                     </div>
                :   null
            }
            <div className='text-start mt-3'>
                <button className='btn btn-outline-secondary btn-sm' type='button' onClick={ onClose }>Return to list</button>
            </div>
        </form>
    )

}

export default PlanningInformation;