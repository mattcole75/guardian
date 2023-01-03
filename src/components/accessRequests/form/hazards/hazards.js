import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const Hazards = (props) => {

    const { accessRequest, save, recordLocked } = props;
    const { hazards } = accessRequest;

    const { register, getValues } = useForm({ 
        mode: 'onChange',
        defaultValues: {
            additionalHazards: hazards && hazards.additionalHazards,
            additionalHazardsDescription: hazards && hazards.additionalHazardsDescription,
            withinHazardZone: (hazards && hazards.hazardList) && hazards.hazardList.includes('withinHazardZone') ? true : false,
            within275OLE: (hazards && hazards.hazardList) && hazards.hazardList.includes('within275OLE') ? true : false,
            withinSubstation: (hazards && hazards.hazardList) && hazards.hazardList.includes('withinSubstation') ? true : false,
            chapter8Protection: (hazards && hazards.hazardList) && hazards.hazardList.includes('chapter8Protection') ? true : false,
            adjacentToLines: (hazards && hazards.hazardList) && hazards.hazardList.includes('adjacentToLines') ? true : false,
            adjacentToWater: (hazards && hazards.hazardList) && hazards.hazardList.includes('adjacentToWater') ? true : false,
            liftingPlan: (hazards && hazards.hazardList) && hazards.hazardList.includes('liftingPlan') ? true : false,
            trackPlant: (hazards && hazards.hazardList) && hazards.hazardList.includes('trackPlant') ? true : false,
            withinSER: (hazards && hazards.hazardList) && hazards.hazardList.includes('withinSER') ? true : false,
            withinSERWithFireSuppression: (hazards && hazards.hazardList) && hazards.hazardList.includes('withinSERWithFireSuppression') ? true : false,
            onPlatform: (hazards && hazards.hazardList) && hazards.hazardList.includes('onPlatform') ? true : false,
            inDepotWorkshop: (hazards && hazards.hazardList) && hazards.hazardList.includes('inDepotWorkshop') ? true : false,
            onDepotSidings: (hazards && hazards.hazardList) && hazards.hazardList.includes('onDepotSidings') ? true : false,
            tramsInOperation: (hazards && hazards.hazardList) && hazards.hazardList.includes('tramsInOperation') ? true : false,
            workingAtHeight: (hazards && hazards.hazardList) && hazards.hazardList.includes('workingAtHeight') ? true : false,
            poweredAccessEquipment: (hazards && hazards.hazardList) && hazards.hazardList.includes('poweredAccessEquipment') ? true : false,
            prefabricatedAccessPlatforms: (hazards && hazards.hazardList) && hazards.hazardList.includes('prefabricatedAccessPlatforms') ? true : false,
            confinedSpaces: (hazards && hazards.hazardList) && hazards.hazardList.includes('confinedSpaces') ? true : false,
            lvElectrical: (hazards && hazards.hazardList) && hazards.hazardList.includes('lvElectrical') ? true : false,
            excavationRequired: (hazards && hazards.hazardList) && hazards.hazardList.includes('excavationRequired') ? true : false,
            hotWorks: (hazards && hazards.hazardList) && hazards.hazardList.includes('hotWorks') ? true : false,
            testTrams: (hazards && hazards.hazardList) && hazards.hazardList.includes('testTrams') ? true : false,
            accessingChampbersDucts: (hazards && hazards.hazardList) &&  hazards.hazardList.includes('accessingChampbersDucts') ? true : false
        }
    });

    const [additionalHazards, setAdditionalHazards] = useState(hazards && hazards.additionalHazards);

    const toggleAdditionalHazrds = () => {
        setAdditionalHazards(prevState => !prevState);
        onUpdate();
    }

    // eslint-disable-next-line
    const onUpdate = debounce(() => {

            const data = getValues();

            let updatedHazards = [];
            const keys = Object.keys(data);
            keys.forEach((key, index) => {
                if(data[key] && key !== 'additionalHazards' && key !== 'additionalHazardsDescription')
                    updatedHazards.push(key);
            });

            save({
                hazards: {
                    hazardList: updatedHazards,
                    additionalHazards: data.additionalHazards,
                    additionalHazardsDescription: data.additionalHazardsDescription
                }
            }, 'SAVE_HAZARD_DETAILS');

        }, 1000);

    return (
        <div>
            <div className='form-floating mb-3 border p-2 rounded text-start'>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='withinHazardZone'
                        disabled={recordLocked}
                        { ...register('withinHazardZone', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='withinHazardZone'>
                        Working within the Metrolink Hazard Zone
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='within275OLE'
                        disabled={recordLocked}
                        { ...register('within275OLE', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='within275OLE'>
                        Working within 2.75<abbr title='Metric Meters' className='initialism'>m</abbr> of any <abbr title='Overhead Line Equipment' className='initialism'>OLE</abbr>
                    </label>
                </div>
                
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='withinSubstation'
                        disabled={recordLocked}
                        { ...register('withinSubstation', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='withinSubstation'>
                        Working within a Traction Substation
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='chapter8Protection'
                        disabled={recordLocked}
                        { ...register('chapter8Protection', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='chapter8Protection'>
                            Working on street requiring <abbr title='Traffic Signs Manual Chapter 8' className='initialism'>Chapter 8</abbr> signage and protection
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='adjacentToLines'
                        disabled={recordLocked}
                        { ...register('adjacentToLines', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='adjacentToLines'>
                        Adjacent to open <abbr title='e.g. Adjacent to Network Rail Intrastructure' className='initialism'>lines</abbr>
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='adjacentToWater'
                        disabled={recordLocked}
                        { ...register('adjacentToWater', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='adjacentToWater'>
                        Adjacent to or above <abbr title='e.g. adjacent to or above a body of water' className='initialism'>water</abbr>
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='liftingPlan'
                        disabled={recordLocked}
                        { ...register('liftingPlan', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='liftingPlan'>
                        Requires a lifting plan
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='trackPlant'
                        disabled={recordLocked}
                        { ...register('trackPlant', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='trackPlant'>
                        Working with on-track plant
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='withinSER'
                        disabled={recordLocked}
                        { ...register('withinSER', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='withinSER'>
                        Working within a Site Equipment Room
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='withinSERWithFireSuppression'
                        disabled={recordLocked}
                        { ...register('withinSERWithFireSuppression', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='withinSERWithFireSuppression'>
                        Working within an Equipment Room with Fire Suppression
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='onPlatform'
                        disabled={recordLocked}
                        { ...register('onPlatform', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='onPlatform'>
                        Working on a Tram Stop Platform
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='inDepotWorkshop'
                        disabled={recordLocked}
                        { ...register('inDepotWorkshop', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='inDepotWorkshop'>
                        Working in Depot Work Shops
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='onDepotSidings'
                        disabled={recordLocked}
                        { ...register('onDepotSidings', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='onDepotSidings'>
                        Working on Depot Sidings
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='tramsInOperation'
                        disabled={recordLocked}
                        { ...register('tramsInOperation', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='tramsInOperation'>
                        Working while Trams Operational
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='workingAtHeight'
                        disabled={recordLocked}
                        { ...register('workingAtHeight', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='workingAtHeight'>
                        Working at Height
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='poweredAccessEquipment'
                        disabled={recordLocked}
                        { ...register('poweredAccessEquipment', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='poweredAccessEquipment'>
                        Working with Powered Access Equipment <abbr title='International Powered Access Federation' className='initialism'>(IPAF)</abbr>
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='prefabricatedAccessPlatforms'
                        disabled={recordLocked}
                        { ...register('prefabricatedAccessPlatforms', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='prefabricatedAccessPlatforms'>
                        Working with Prefabricated Access Platforms <abbr title="Prefabricated Access Suppliers' and Manufacturers' Association" className='initialism'>(PASMA)</abbr>
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='confinedSpaces'
                        disabled={recordLocked}
                        { ...register('confinedSpaces', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='confinedSpaces'>
                        Working in Confined Spaces
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='lvElectrical'
                        disabled={recordLocked}
                        { ...register('lvElectrical', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='lvElectrical'>
                        Working on <abbr title='Low Volatge' className='initialism'>LV</abbr> Electrical
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='excavationRequired'
                        disabled={recordLocked}
                        { ...register('excavationRequired', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='excavationRequired'>
                        Excavation requiring permission to Dig
                    </label>
                </div>

                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='hotWorks'
                        disabled={recordLocked}
                        { ...register('hotWorks', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='hotWorks'>
                        Hot works (e.g., Welding)
                    </label>
                </div>
                <div className='form-check form-switch primary text-start'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='testTrams'
                        disabled={recordLocked}
                        { ...register('testTrams', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='testTrams'>
                        Working with a Test Tram(s)
                    </label>
                </div>

                <div className='form-check form-switch primary text-start mb-3'>
                    <input 
                        className='form-check-input'
                        type='checkbox'
                        role='switch'
                        id='accessingChampbersDucts'
                        disabled={recordLocked}
                        { ...register('accessingChampbersDucts', { required: false, onChange: onUpdate })}
                    />
                    <label className='form-check-label' htmlFor='accessingChampbersDucts'>
                        Accessing Chambers - Duct / Cable routes
                    </label>
                </div>

                {/* Additional Hazards Section */}
                <div className='border rounded p-1 mb-1 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='additionalHazards' 
                                    disabled={recordLocked}
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
                                    disabled={recordLocked} required={additionalHazards}
                                    {...register('additionalHazardsDescription', { minLength: 5, required: additionalHazards, onChange: onUpdate })}
                                />
                                <label htmlFor='additionalHazardsDescription' className='form-label'>
                                    Additional Hazards Descriptions
                                </label>
                            </div>
                        :   null
                    }
                </div>
            </div>
        </div>
    );
}

export default Hazards;