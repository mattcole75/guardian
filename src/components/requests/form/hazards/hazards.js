import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const Hazards = (props) => {

    const { request, save, editable } = props;

    const { register, handleSubmit, formState } = useForm({ 
        mode: 'onChange',
        defaultValues: {
            additionalHazards: request && request.additionalHazards,
            additionalHazardsDescription: request && request.additionalHazardsDescription,
            withinHazardZone: (request && request.hazards) && request.hazards.includes('withinHazardZone') ? true : false,
            within275OLE: (request && request.hazards) && request.hazards.includes('within275OLE') ? true : false,
            withinSubstation: (request && request.hazards) && request.hazards.includes('withinSubstation') ? true : false,
            chapter8Protection: (request && request.hazards) && request.hazards.includes('chapter8Protection') ? true : false,
            trackPlant: (request && request.hazards) && request.hazards.includes('trackPlant') ? true : false,
            withinSER: (request && request.hazards) && request.hazards.includes('withinSER') ? true : false,
            withinSERWithFireSuppression: (request && request.hazards) && request.hazards.includes('withinSERWithFireSuppression') ? true : false,
            onPlatform: (request && request.hazards) && request.hazards.includes('onPlatform') ? true : false,
            inDepotWorkshop: (request && request.hazards) && request.hazards.includes('inDepotWorkshop') ? true : false,
            onDepotSidings: (request && request.hazards) && request.hazards.includes('onDepotSidings') ? true : false,
            tramsInOperation: (request && request.hazards) && request.hazards.includes('tramsInOperation') ? true : false,
            manualHandling: (request && request.hazards) && request.hazards.includes('manualHandling') ? true : false,
            workingAtHeight: (request && request.hazards) && request.hazards.includes('workingAtHeight') ? true : false,
            poweredAccessEquipment: (request && request.hazards) && request.hazards.includes('poweredAccessEquipment') ? true : false,
            prefabricatedAccessPlatforms: (request && request.hazards) && request.hazards.includes('prefabricatedAccessPlatforms') ? true : false,
            confinedSpaces: (request && request.hazards) && request.hazards.includes('confinedSpaces') ? true : false,
            lvElectrical: (request && request.hazards) && request.hazards.includes('lvElectrical') ? true : false,
            excavationRequired: (request && request.hazards) && request.hazards.includes('excavationRequired') ? true : false,
            hotWorks: (request && request.hazards) && request.hazards.includes('hotWorks') ? true : false,
            testTrams: (request && request.hazards) && request.hazards.includes('testTrams') ? true : false,
            accessingChampbersDucts: (request && request.hazards) &&  request.hazards.includes('accessingChampbersDucts') ? true : false
        }
    });

    const [additionalHazards, setAdditionalHazards] = useState(request && request.additionalHazards);

    const toggleAdditionalHazrds = () => {
        setAdditionalHazards(prevState => !prevState);
    }

    const onSave = useCallback((data) => {

        let updatedHazards = [];
        const keys = Object.keys(data);
        keys.forEach((key, index) => {
            if(data[key] && key !== 'additionalHazards' && key !== 'additionalHazardsDescription')
                updatedHazards.push(key);
        });

        save({
            hazards: updatedHazards,
            additionalHazards: data.additionalHazards,
            additionalHazardsDescription: data.additionalHazardsDescription
        }, 'SAVE_HAZARD_DETAILS');

    }, [save]);

    return (
        <div>
            <div className='form-floating mb-3 border  p-2 rounded'>
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='withinHazardZone'
                        disabled={!editable}
                        { ...register('withinHazardZone', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='withinHazardZone'>Working within the Metrolink Hazard Zone</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='within275OLE'
                        disabled={!editable}
                        { ...register('within275OLE', { required: false })}
                    />
                    <label 
                        className='form-check-label' 
                        htmlFor='within275OLE'>Working within 2.75<abbr title='Metric Meters' className='initialism'>m</abbr> of any <abbr title='Overhead Line Equipment' className='initialism'>OLE</abbr>
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='withinSubstation'
                        disabled={!editable}
                        { ...register('withinSubstation', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='withinSubstation'>Working within a Traction Substation</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='chapter8Protection'
                        disabled={!editable}
                        { ...register('chapter8Protection', { required: false })}
                    />
                    <label 
                        className='form-check-label' htmlFor='chapter8Protection'>Working on street requiring <abbr title='Traffic Signs Manual Chapter 8' className='initialism'>Chapter 8</abbr> signage and protection</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='trackPlant'
                        disabled={!editable}
                        { ...register('trackPlant', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='trackPlant'>Working with on-track plant</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='withinSER'
                        disabled={!editable}
                        { ...register('withinSER', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='withinSER'>Working within an Site Equipment Room</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='withinSERWithFireSuppression'
                        disabled={!editable}
                        { ...register('withinSERWithFireSuppression', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='withinSERWithFireSuppression'>Working within an Equipment Room with Fire Suppression</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='onPlatform'
                        disabled={!editable}
                        { ...register('onPlatform', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='onPlatform'>Working on a Tram Stop Platform</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='inDepotWorkshop'
                        disabled={!editable}
                        { ...register('inDepotWorkshop', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='inDepotWorkshop'>Working in Depot Work Shops</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='onDepotSidings'
                        disabled={!editable}
                        { ...register('onDepotSidings', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='onDepotSidings'>Working on Depot Sidings</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='tramsInOperation'
                        disabled={!editable}
                        { ...register('tramsInOperation', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='tramsInOperation'>Working while Trams Operational</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='manualHandling'
                        disabled={!editable}
                        { ...register('manualHandling', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='manualHandling'>Manual Handling</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='workingAtHeight'
                        disabled={!editable}
                        { ...register('workingAtHeight', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='workingAtHeight'>Working at Height</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='poweredAccessEquipment'
                        disabled={!editable}
                        { ...register('poweredAccessEquipment', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='poweredAccessEquipment'>Working with Powered Access Equipment <abbr title='International Powered Access Federation' className='initialism'>(IPAF)</abbr></label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='prefabricatedAccessPlatforms'
                        disabled={!editable}
                        { ...register('prefabricatedAccessPlatforms', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='prefabricatedAccessPlatforms'>Working with Prefabricated Access Platforms <abbr title="Prefabricated Access Suppliers' and Manufacturers' Association" className='initialism'>(PASMA)</abbr></label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='confinedSpaces'
                        disabled={!editable}
                        { ...register('confinedSpaces', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='confinedSpaces'>Working in Confined Spaces</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='lvElectrical'
                        disabled={!editable}
                        { ...register('lvElectrical', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='lvElectrical'>Working on <abbr title='Low Volatge' className='initialism'>LV</abbr> Electrical</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='excavationRequired'
                        disabled={!editable}
                        { ...register('excavationRequired', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='excavationRequired'>Excavation requiring permission to Dig</label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='hotWorks'
                        disabled={!editable}
                        { ...register('hotWorks', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='hotWorks'>Hot works (e.g., Welding)</label>
                </div>
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='testTrams'
                        disabled={!editable}
                        { ...register('testTrams', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='testTrams'>Working with a Test Tram(s)</label>
                </div>

                <div className='form-check form-switch primary text-start mb-3'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='accessingChampbersDucts'
                        disabled={!editable}
                        { ...register('accessingChampbersDucts', { required: false })}
                    />
                    <label className='form-check-label' htmlFor='accessingChampbersDucts'>Accessing Chambers - Duct / Cable routes</label>
                </div>

                {/* Additional Hazards Section */}
                <div className='border rounded p-1 mb-1 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='additionalHazards' 
                                    disabled={!editable}
                                    {...register('additionalHazards', { onChange:  toggleAdditionalHazrds })}
                                />
                            </div>
                            <span className='text-start'>
                                Additional Hazards
                                <small className='d-block text-muted'>Indicate if there are any additional hazards</small>
                            </span>
                        </label>
                    </div>
                    { additionalHazards
                        ?   <div className='form-floating mt-1'>
                                <textarea className='form-control' id='additionalHazardsDescription'  rows='5' style={{height:'auto'}} placeholder='Electrical Isolation Requirements' 
                                    disabled={!editable} required={additionalHazards}
                                    {...register('additionalHazardsDescription', { minLength: 5, required: additionalHazards })}
                                />
                                <label htmlFor='additionalHazardsDescription' className='form-label'>Additional Hazards Descriptions</label>
                            </div>
                        :   null
                    }
                </div>
            </div>

            {editable 
                ? <div className='border-bottom mb-3'>
                    <button className='w-100 btn btn-lg btn-secondary mb-3' type='button' disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save Hazard Details</button>
                </div>
                : null
            }
        </div>
    );
}

export default Hazards;