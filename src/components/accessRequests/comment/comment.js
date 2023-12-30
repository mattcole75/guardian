import React from 'react';
import moment from 'moment';

const comment = (props) => {

    const { commentator, logged, comment} = props.comment;

    return (
        <div className='list-group-item bg-light mb-2 border-0 border-bottom'>
            <div className='d-flex w-100 justify-content-between'>
                <p className='h-3 mb-1'>{ commentator }</p>
                <p className='h-3 mb-1'>{ moment(logged).calendar() }</p>
            </div>
            <div className='text-start'>
                <small className='text-muted text-start'>{ comment }</small>
            </div>
        </div>
    );
}

export default comment;