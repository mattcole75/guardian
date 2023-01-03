import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

const SystemDisruption = (props) => {

    const { id, save, roles, systemDisruption, status } = props;
    // const { systemDisruptionItems, disruptiveStatus } = request;

    const isPlanner = roles.includes('planner');

    let isLocked = false;
    if(status === 'Submitted' || status === 'Approved'){
        isLocked = true;
    }

    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: systemDisruption ? systemDisruption : null
    });

    const onUpdate = debounce(() => {
        save(id, { systemDisruption: getValues() });
    }, 1000);

    return (
        <div>

            <h3 className='h5 mb-3 mt-3 text-muted text-start'>System Disruption</h3>
             
            <div className='table-responsive'>
                <table className='w-100 table table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                    <thead className='border-bottom'>
                        <tr>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Signalling</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Telecoms</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>TVM</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>CCTV</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>PA</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>PIDS</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>Lighting</div></th>
                            <th className='ps-3 pe-3'><div className='table-item_col'>UTC</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-bottom'>
                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='signallingDisruption'
                                         disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('signallingDisruption', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='telecomsDisruption'
                                         disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('telecomsDisruption', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>
    
                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='tvmDisruption'
                                         disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('tvmDisruption', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='cctvDisruption'
                                         disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('cctvDisruption', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='paDisruption'
                                        disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('paDisruption', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='pidsDisruption'
                                        disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('pidsDisruption', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='lightingDisruption'
                                         disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('lightingDisruption', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>

                            <td className='ps-3 pe-3'>
                                <div className='form-check form-switch text-center fs-5'>
                                    <input className='form-check-input' type='checkbox' role='switch' id='utcDisruption'
                                         disabled={ (!isPlanner && !isLocked) || isLocked }
                                        { ...register('utcDisruption', { onChange: onUpdate }) }
                                    />
                                </div>
                            </td>
                        
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default SystemDisruption;