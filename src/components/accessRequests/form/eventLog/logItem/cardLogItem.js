import React from 'react';
import moment from 'moment';

const CardLogItem = (props) => {
    
    const { item } = props;

    return (
        <div className='card p-3 mt-0 mb-2'>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div className='text-start'>
                    <p className='mb-0 opacity-75'>Date: <small className='text-body-secondary'>{ moment(item.logged).format('DD/MM/YYYY HH:mm') }</small></p>
                    <p className='mb-0 opacity-75'>User: <small className='text-body-secondary'>{ item.user }</small></p>
                    <p className='mb-0 opacity-75'>Event: <small className='text-body-secondary'>{ item.event }</small></p>
                </div>
                {/* <div><span className={statusCSS.join(' ')}>{ accessRequest.status }</span></div> */}
            </div>    
        </div>
    );
}

export default CardLogItem;