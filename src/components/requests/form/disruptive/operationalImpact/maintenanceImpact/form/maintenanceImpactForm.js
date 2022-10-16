import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { departments, workType } from '../../../../../../../data/maintenanceDepartments';

const MaintenanceImpactForm = (props) => {

    const { request, index, editable, save, toggle, setIndex } = props;

    const { register, handleSubmit } = useForm({ 
        mode: 'onChange', 
        defaultValues: ((request == null || request.maintenanceDisruptionItems == null) ? null : request.maintenanceDisruptionItems[index])
    });

    // const roles = useSelector(state => state.auth.roles);

    // const [locations, setLocations] = useState([]);


    const onSave = useCallback((data) => {

        let updatedMaintnenanceDisruptionItems = [];

        // add new tram service disruption item to existing access request
        if(request && index === null) {
            if(request.maintenanceDisruptionItems && request.maintenanceDisruptionItems.length > 0)
            updatedMaintnenanceDisruptionItems = [ ...request.maintenanceDisruptionItems ];

            updatedMaintnenanceDisruptionItems.push(data);
            save({ maintenanceDisruptionItems: updatedMaintnenanceDisruptionItems });
        }
        
        // update existing tram service disruption item
        if (request && index !== null) {
            updatedMaintnenanceDisruptionItems = [ ...request.maintenanceDisruptionItems ];
            updatedMaintnenanceDisruptionItems[index] = data;
            save({ maintenanceDisruptionItems: updatedMaintnenanceDisruptionItems });
        }

        toggle();
        setIndex(null);

    }, [index, request, save, setIndex, toggle]);

    // const onDelete = useCallback(() => {
    //     request.locationLimitItems.splice(index, 1);
    //     let updatedLocationLimitItems = request.locationLimitItems;
    //     save({locationLimitItems: updatedLocationLimitItems}, 'SAVE_LOCATION_LIMIT');
    //     toggle();

    // }, [index, request, save, toggle]);

    return (
        <div className='form-location my-1'>
            <form className=''>
                <h1 className='h3 mb-3 fw-normal text-start'>Maintenance Disruption</h1>

                {/* maintnenance department and work type */}
                <div className='input-group mb-3'>

                    <div className='w-100'>

                        <div className='form-floating mb-1'>
                            <select className='form-select' id='maintenanceDepartmentDisrupted' required disabled={!editable}
                                {...register('maintenanceDepartmentDisrupted', { required: true })}>
                                <option value=''>Choose...</option>
                                {
                                    departments.map(item => {
                                        return (<option key={item.name} value={item.name}>{item.name}</option>)
                                    })
                                }
                            </select>
                            <label htmlFor='serviceDisruptedRoute'>Department Disrupted</label>
                        </div>

                        <div className='form-floating mb-1'>
                            <select className='form-select' id='workTypeDisrupted' required disabled={!editable}
                                {...register('workTypeDisrupted', { required: true })}>
                                <option value=''>Choose...</option>
                                {
                                    workType.map(item => {
                                        return (<option key={item.name} value={item.name}>{item.name}</option>)
                                    })
                                }
                            </select>
                            <label htmlFor='serviceDisruptedRoute'>Work Type Disrupted</label>
                        </div>

                        <div className='form-floating'>
                            <textarea className='form-control' id='maintenanceDisruptionDescription'  
                                rows='5' minLength={5} style={{height:'auto'}} placeholder='Describe the service route disruption' 
                                disabled={!editable} required
                                {...register('maintenanceDisruptionDescription', { required: true, minLength: 5 })}
                            />
                            <label htmlFor='maintenanceDisruptionDescription' className='form-label'>Maintenance Disruption Description</label>
                        </div>
                    </div>
                            
                </div>
                
                
                {editable
                    ?   <div className='form-floating mb-3'>
                            <button className='w-100 btn btn-lg btn-primary' type='button' onClick={handleSubmit(onSave)}>Save Changes</button>
                        </div>
                    :   null
                }
                <div className='form-floating mb-5'>
                    <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={ toggle }>Close</button>
                </div>
                {request && editable
                    ?   <div className='form-floating'>
                        <button className='w-100 btn btn-lg btn-danger' type='button' onClick={handleSubmit(() => {})}>Delete</button>
                    </div>
                    :   null
                }
            </form>
        </div>
    )
}

export default MaintenanceImpactForm;