import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';

const PermitRequirements = (props) => {

    const { permitRequirements, update, recordLocked } = props;
    const { register, reset, getValues } = useForm({ mode: 'onBlur' });

    useEffect(() => {
        if(permitRequirements) {
            reset(permitRequirements);
        }
    }, [reset, permitRequirements]);

    const onUpdate = () => {
        update(getValues());
    }

    return (
        <div className="mb-3">
            <div className='text-start'>
                <h4 className='h4 fw-normal'>Permit Requirements</h4>
            </div>
            {/* Hazard Zone */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='hazardZone' disabled={recordLocked}
                            { ...register('hazardZone', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Metrolink Hazard Zone
                        <small className='d-block text-muted'>Could any part of the work site, plant, tools, suspended load or persons encroach within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
            
                {/* Pedestrians */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='pedestrians' disabled={recordLocked}
                            { ...register('pedestrians', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Pedestrians
                        <small className='d-block text-muted'>Will pedestrians be diverted into the Metrolink Hazard Zone?</small>
                    </span>
                </label>
                {/* piling */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='piling' disabled={recordLocked}
                            { ...register('piling', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Piling
                        <small className='d-block text-muted'>Does the work involve piling within 4 meters of the Metrolink Hazard Zone?</small>
                    </span>
                </label>
                {/* Crane or load suspension equipment */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='crane' disabled={recordLocked}
                            { ...register('crane', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Crane or load suspension equipment
                        <small className='d-block text-muted'>Does the work involve a crane or any load suspension equipment within 4 meters of the Metrolink Hazard Zone?</small>
                    </span>
                </label>
                {/* Deep Excavation */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='deepExcavation' disabled={recordLocked}
                            { ...register('deepExcavation', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Excavation over 2 meters in depth
                        <small className='d-block text-muted'>Does the work involve any excavation over 2 meters in depth within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
                {/* Scaffold */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='scaffold' disabled={recordLocked}
                            { ...register('scaffold', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Erecting / dismantling of scaffold
                        <small className='d-block text-muted'>Does the work involve erecting / dismantling of scaffold within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
                {/* Demolition */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='demolition' disabled={recordLocked}
                            { ...register('demolition', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Demolition work of any kind
                        <small className='d-block text-muted'>Does the work involve demolition work of any kind within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
                {/* OLE Excavation */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='OLEexcavation' disabled={recordLocked}
                            { ...register('OLEexcavation', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Excavation near OLE Supporting Structures
                        <small className='d-block text-muted'>Does the work involve any excavation within 3 meters of any pole supporting overhead wires?</small>
                    </span>
                </label>
                {/* OLE Structures */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='OLEstructures' disabled={recordLocked}
                            { ...register('OLEstructures', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Working on OLE Supporting Structures
                        <small className='d-block text-muted'>Does the work involve work on any building or structure with supporting attachments to the overhead wires?</small>
                    </span>
                </label>
                {/* Access Routes */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='accessRoutes' disabled={recordLocked}
                            { ...register('accessRoutes', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Access Routes
                        <small className='d-block text-muted'>Does any part of the access route to the work site (for persons or plant) encroach within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
                {/* Access Routes */}
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='operationsAffected' disabled={recordLocked}
                            { ...register('operationsAffected', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Infrastructure / Operations Affected
                        <small className='d-block text-muted'>Could any part of the works affect the Metrolink infrastructure or operation of the Metrolink Network?</small>
                    </span>
                </label>
            </div>
        </div>
    )
}

export default PermitRequirements;