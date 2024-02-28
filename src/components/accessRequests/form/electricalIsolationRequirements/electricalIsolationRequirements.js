import React, { useEffect} from "react";
import { useForm } from 'react-hook-form';

const ElectricalIsolationRequirements = (props) => {

    const { electricalIsolationRequirements, update, recordLocked } = props;
    const { register, reset, getValues } = useForm({ mode: 'onBlur' });

    useEffect(() => {
        if(electricalIsolationRequirements) {
            reset(electricalIsolationRequirements);
        }
    }, [reset, electricalIsolationRequirements]);

    const onUpdate = () => {
        update(getValues());
    }

    return (
        <div className="mb-3">
            <div className='text-start'>
                <h4 className='h4 fw-normal'>e) Electrical Isolation Requirements</h4>
            </div>
            {/* OLE encroach */}
            <div className='list-group'>

                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='OLEencroachment' disabled={recordLocked}
                            { ...register('OLEencroachment', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        OLE Encroachment
                        <small className='d-block text-muted'>Could any part of the work site, plant, tools, suspended load or persons encroach within 3 meters of the Overhead Line Equipment?</small>
                    </span>
                </label>
            
                {/* OLE encroach */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='HVIntegrityRisk' disabled={recordLocked}
                            { ...register('HVIntegrityRisk', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Risk to High Voltage Integrity
                        <small className='d-block text-muted'>Will the work import any risk that rail continuity or any bonding cables will be broken or disturbed?</small>
                    </span>
                </label>
            
                {/* OLE encroach */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='Plant' disabled={recordLocked}
                            { ...register('Plant', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Plant
                        <small className='d-block text-muted'>Is any plant to be used below the Overhead Line Equipment?</small>
                    </span>
                </label>

            
            </div>
        </div>
    );
}

export default ElectricalIsolationRequirements;