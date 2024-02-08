import React from 'react';
import { loadDocument } from '../../../../../../shared/firebaseUtility';

const ListItem = (props) => {

    const { uid, item, deleteDocument, recordLocked } = props;
    
    
    return (
        <div className='list-group-item list-group-item-action d-flex gap-3 py-3' aria-current='true'>
            <i className='bi-file-pdf fs-2 text-primary'></i>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div className='p-2'>
                    { item && item.name
                        ?   <p className='opacity-75 m-0'>{ item.name }</p>
                        :   <p className='opacity-75 m-0'>Permit to work</p>
                    }
                </div>
            </div>
            <div className='btn-group mt-2' role='group' aria-label='Basic example'>
                <button type='button' className='btn btn-secondary' onClick={ () => loadDocument(uid, item.name) }>View</button>
                    { recordLocked
                        ?   null
                        :   <button type='button' className='btn btn-danger' onClick={ () => deleteDocument(item.name) }>Delete</button>
                    }
                
                
            </div>
        </div>  
    );
}

export default ListItem;