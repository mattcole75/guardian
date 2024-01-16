import React from 'react';

import List from './list/list';

const Documentation = (props) => {

    const { toggle, uid, documents, deleteDocument } = props;

    return (
        <div>
            <div className='d-flex gap-2 w-100 justify-content-between mb-3'>
                <div className='text-start'>
                    <h4 className='h4 fw-normal'>Documentation</h4>
                </div>
                <button type='button' className='btn btn-primary btn-sm' onClick={ toggle }>Upload new file</button>
            </div>

            <List uid={ uid } documents={ documents } deleteDocument={ deleteDocument } />

        </div>
        
    );
}

export default Documentation;