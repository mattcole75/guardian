import React from 'react';
import moment from 'moment';

const comment = (props) => {

    const { commentator, logged, comment} = props.comment;

    return (
        <div className='list-group-item bg-light border-0'>
            <div className='d-flex w-100 justify-content-between'>
                <p className='h-3 mb-1'>{commentator}</p>
                <p className='h-3 mb-1'>{moment(logged).calendar()}</p>
            </div>
            <div className='text-sm-start'>
                <small className='text-muted'>{comment}</small>
            </div>
        </div>
    );
}

export default comment;