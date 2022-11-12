import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';

import locations from '../../../../../../../data/locations';

const CustomerOperationListItem = (props) => {

    const { item, index, isPlanner, isLocked, deleteCustomerOperationItem, updateCustomerOperationItem } = props;

    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: item
    });

    // eslint-disable-next-line
    const onUpdate = useCallback(
        debounce(() => {
            updateCustomerOperationItem(getValues(), index);
        }, 1000), []
    );

    const onDelete = () => {
        deleteCustomerOperationItem(index);
    }

    return (
        <tr className='border-bottom'>
            <td className='ps-3 pe-3'>
                <div className='table-item_col'>
                    <select className='form-select form-select-sm' id='stopDisrupted'
                        disabled={(isPlanner === false && isLocked === false) || isLocked}
                        { ...register('stopDisrupted', { onChange: onUpdate })}>
                        <option value=''>Choose...</option>
                        {
                            locations.map(item => {
                                return (<option key={item.name} value={item.name}>{item.name}</option>)
                            })
                        }
                    </select>
                </div>
            </td>

            <td className='ps-3 pe-3 w-15'>
                <div className='text-center'>
                    <input className='form-control' type='number' id='numberOfStaff'
                        disabled={(isPlanner === false && isLocked === false) || isLocked}
                        { ...register('numberOfStaff', { onChange: onUpdate }) }
                    />
                </div>
            </td>

            <td className='ps-3 pe-3'>
                <div className='form-check form-switch text-center fs-5'>
                    <input className='form-check-input' type='checkbox' role='switch' id='wellfareRequired'
                        disabled={(isPlanner === false && isLocked === false) || isLocked}
                        { ...register('wellfareRequired', { onChange: onUpdate }) }
                    />
                </div>
            </td>

            <td className='ps-3 pe-3'>
                <div className='form-check form-switch text-center fs-5'>
                    <input className='form-check-input' type='checkbox' role='switch' id='securityRequired'
                        disabled={(isPlanner === false && isLocked === false) || isLocked}
                        { ...register('securityRequired', { onChange: onUpdate }) }
                    />
                </div>
            </td>

            <td className='ps-3 pe-3 text-end'>
                {(isPlanner === true && isLocked === false)
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

export default CustomerOperationListItem;