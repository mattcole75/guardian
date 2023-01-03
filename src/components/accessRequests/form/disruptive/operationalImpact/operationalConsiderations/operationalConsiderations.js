import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const OperationalConsiderations = (props) => {

    const { id, save, roles, operationalConsiderations, status } = props;

    // const { operationalConsiderationDisriptionItem, disruptiveStatus } = request;

    const isPlanner = roles.includes('planner');

    let isLocked = false;
    if(status === 'Submitted' || status === 'Approved') {
        isLocked = true;
    }

    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: operationalConsiderations ? operationalConsiderations : null
    });

    const onUpdate = debounce(() => {
        save(id, { operationalConsiderations: getValues() });
    }, 2000);

    return (
        <div className=''>
            <div className='row g-2 p-1 text-start'>
                <h3 className='h5 text-muted'>Operational Considerations</h3>
            </div>

            <div className='row g-2'>
    
                {/* Special Events */}
                <div className='form-floating mb-1 col-sm-6'>
                    <select className='form-select' id='specialEventType'
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        {...register('specialEventType', { onChange: onUpdate })}
                        >
                        <option value=''>Choose...</option>
                        <option>Consert</option>
                        <option>Festival</option>
                        <option>Political</option>
                        <option>Protest</option>
                        <option>Sporting</option>
                        <option>Other</option>
                    </select>
                    <label htmlFor='specialEventType'>Event Type</label>
                </div>
                <div className='form-floating col-sm-6 mb-1'>
                    <input type='text' className='form-control' id='specialEvent'
                        disabled={ (!isPlanner && !isLocked) || isLocked } 
                        {...register('specialEvent', { onChange: onUpdate })}
                    />
                    <label htmlFor='specialEvent' className='form-label'>Special Event</label>
                </div>

                {/* Depot Access and Egress */}
                <div className='form-floating mb-1'>
                    <textarea className='form-control' id='depotAccessEgressDetails'  rows='3' style={{height:'auto'}} 
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        {...register('depotAccessEgressDetails', { minLength: 5, onChange: onUpdate })} 
                    />
                    <label htmlFor='depotAccessEgressDetails' className='form-label'>Depot Access/Egress</label>
                </div>

                {/* Rail Replacement */}
                <div className='form-floating mb-1'>
                    <textarea className='form-control' id='railReplacementDetails'  rows='3' style={{height:'auto'}}
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        {...register('railReplacementDetails', { minLength: 5, onChange: onUpdate })} 
                    />
                    <label htmlFor='railReplacementDetails' className='form-label'>Rail Replacment Details</label>
                </div>

                {/* Speed Restrictions */}
                <div className='form-floating mb-1'>
                    <textarea className='form-control' id='speedRestrictionDetails'  rows='3' style={{height:'auto'}} 
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        {...register('speedRestrictionDetails', { minLength: 5, onChange: onUpdate })} 
                    />
                    <label htmlFor='speedRestrictionDetails' className='form-label'>Speed Restriction Details</label>
                </div>

                {/* Additional Considerations */}
                <div className='form-floating mb-1'>
                    <textarea className='form-control' id='additionalConsiderations'  rows='3' style={{height:'auto'}} 
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        {...register('additionalConsiderations', { minLength: 5, onChange: onUpdate })} 
                    />
                    <label htmlFor='additionalConsiderations' className='form-label'>Additional Considerations</label>
                </div>
            </div>
        </div>
    )
}

export default OperationalConsiderations;