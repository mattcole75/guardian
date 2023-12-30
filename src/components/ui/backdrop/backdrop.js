import React from 'react';
import './backdrop.css';

const backdrop = (props) => (
    props.show === true
        ? <div className='modal-backdrop' onClick={props.clicked}></div>
        : null
);

export default backdrop;