import React from 'react';

const listItem = (props) => {

    const { item, index, length, save, recordLocked } = props;

    const onDelete = () => {
        save('DELETE', index, null);
    }

    const onMoveUp = () => {
        save('UP', index, null);
    }

    const onMoveDown = () => {
        save('DOWN', index, null);
    }

    return (
        <div className='list-group-item list-group-item-action d-flex gap-3 align-items-center' aria-current='true'>
            <i className='bi-geo-fill access-icon-default'></i>
            <div className='d-flex gap-2 w-100 justify-content-between align-items-center' role='button'>
                <p className='mb-0 opacity-75'><strong>{index + 1}) </strong>{ item }</p>
                { !recordLocked
                    ?   <div>
                            { index > 0
                                ?   <button type='button' className='btn btn-sm btn-light'onClick={ onMoveUp }><span className='bi-arrow-up' /></button>
                                :   null
                            }
                            { index < (length - 1)
                                ?   <button type='button' className='btn btn-sm btn-light'onClick={ onMoveDown }><span className='bi-arrow-down' /></button>
                                :   null
                            }
                            <button type='button' className='btn btn-sm btn-light'onClick={ onDelete }><span className='bi-x' /></button>
                        </div>
                    :    null
                }
            </div>
        </div>
    );
}

export default listItem;