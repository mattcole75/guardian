import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

import routes from '../../../../../../../data/routes';

const TramImpactListItem = (props) => {

    const { item, index, isPlanner, isLocked, deleteTramImpactItem, updateTramImpactItem } = props;
    
    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: item
    });

    const onUpdate = debounce(() => {
        updateTramImpactItem(getValues(), index);
    }, 1000);

    const onDelete = () => {
        deleteTramImpactItem(index);
    };

    return (
        <tr className='border-bottom'>
            <td className='ps-3 pe-3'>
                <div className='table-item_col'>
                    <select className='form-select form-select-sm' id='routeDisrupted'
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        { ...register('routeDisrupted', { onChange: onUpdate })}>
                        <option value=''>Choose...</option>
                        {
                            routes.map(item => {
                                return (<option key={item.name} value={item.name}>{item.name}</option>)
                            })
                        }
                    </select>
                </div>
            </td>

            <td className='ps-3 pe-3'>
                <div className='form-check form-switch text-center fs-5'>
                    <input className='form-check-input' type='checkbox' role='switch' id='timetableDisrupted'
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        { ...register('timetableDisrupted', { onChange: onUpdate }) }
                    />
                </div>
            </td>

            <td className='ps-3 pe-3'>
                <div className='form-check form-switch text-center fs-5'>
                    <input className='form-check-input' type='checkbox' role='switch' id='peakServiceDisrupted'
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        { ...register('peakServiceDisrupted', { onChange: onUpdate }) }
                    />
                </div>
            </td>
            <td className='ps-3 pe-3'>
                <div className='form-check form-switch text-center fs-5'>
                    <input className='form-check-input' type='checkbox' role='switch' id='busReplacement'
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        { ...register('busReplacement', { onChange: onUpdate }) }
                    />
                </div>
            </td>

            <td className='ps-3 pe-3 w-15'>
                <div className='text-center'>
                    <input className='form-control' type='number' id='frequency'
                        disabled={ (!isPlanner && !isLocked) || isLocked }
                        { ...register('frequency', { onChange: onUpdate }) }
                    />
                </div>
            </td>

            <td className='ps-3 pe-3 text-end'>
                {(isPlanner && !isLocked)
                    ?   <div className='table-item_col'>
                            <div className='btn' role='button' onClick={ onDelete }>
                                <span className='bi-trash fs-5 trash-icon' />
                            </div>
                        </div>
                    :   null
                }
            </td>
        </tr>
    );
}

export default TramImpactListItem;