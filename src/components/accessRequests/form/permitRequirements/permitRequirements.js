import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';

const PermitRequirements = (props) => {

    const { permitRequirements, update } = props;
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
                        <input className='form-check-input' type='checkbox' role='switch' id='hazardZone' 
                            { ...register('hazardZone', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Metrolink Hazard Zone
                        <small className='d-block text-muted'>Could any part of the work site, plant, tools, suspended load or persons encroach within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
            </div>
            {/* Pedestrians */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='pedestrians' 
                            { ...register('pedestrians', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Pedestrians
                        <small className='d-block text-muted'>Will pedestrians be diverted into the Metrolink Hazard Zone?</small>
                    </span>
                </label>
            </div>
            {/* piling */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='piling' 
                            { ...register('piling', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Piling
                        <small className='d-block text-muted'>Does the work involve piling within 4 meters of the Metrolink Hazard Zone?</small>
                    </span>
                </label>
            </div>
            {/* Crane or load suspension equipment */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='crane' 
                            { ...register('crane', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Crane or load suspension equipment
                        <small className='d-block text-muted'>Does the work involve a crane or any load suspension equipment within 4 meters of the Metrolink Hazard Zone?</small>
                    </span>
                </label>
            </div>
            {/* Deep Excavation */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='deepExcavation' 
                            { ...register('deepExcavation', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Excavation over 2 meters in depth
                        <small className='d-block text-muted'>Does the work involve any excavation over 2 meters in depth within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
            </div>
            {/* Scaffold */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='scaffold' 
                            { ...register('scaffold', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Erecting / dismantling of scaffold
                        <small className='d-block text-muted'>Does the work involve erecting / dismantling of scaffold within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
            </div>
            {/* Demolition */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='demolition' 
                            { ...register('demolition', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Demolition work of any kind
                        <small className='d-block text-muted'>Does the work involve demolition work of any kind within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
            </div>
            {/* OLE Excavation */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='OLEexcavation' 
                            { ...register('OLEexcavation', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Excavation near OLE Supporting Structures
                        <small className='d-block text-muted'>Does the work involve any excavation within 3 meters of any pole supporting overhead wires?</small>
                    </span>
                </label>
            </div>
            {/* OLE Structures */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='OLEstructures' 
                            { ...register('OLEstructures', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Working on OLE Supporting Structures
                        <small className='d-block text-muted'>Does the work involve work on any building or structure with supporting attachments to the overhead wires?</small>
                    </span>
                </label>
            </div>
            {/* Access Routes */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='accessRoutes' 
                            { ...register('accessRoutes', { onChange:  onUpdate })}
                        />
                    </div>
                    <span className='text-start'>
                        Access Routes
                        <small className='d-block text-muted'>Does any part of the access route to the work site (for persons or plant) encroach within the Metrolink Hazard Zone?</small>
                    </span>
                </label>
            </div>
            {/* Access Routes */}
            <div className='list-group'>
                <label className='list-group-item d-flex gap-2'>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' id='operationsAffected' 
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