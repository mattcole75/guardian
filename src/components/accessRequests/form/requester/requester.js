import React from 'react';

const Requester = (props) => (
        <div>
            <div className='text-start'>
                <h4 className='h4 fw-normal'>Your Details</h4>
            </div>

            <div className='mb-3'>
                <div className='row g-2 mb-2'>
                    <div className='form-floating  col-sm-6'>
                        <input type='text' className='form-control' id='name' autoComplete='off' value={ props.displayName } disabled />
                        <label htmlFor='name' className='form-label'>Name</label>
                    </div>

                    <div className='form-floating  col-sm-6'>
                        <input type='text' className='form-control' id='phoneNumber' autoComplete='off' value={ props.phoneNumber } disabled />
                        <label htmlFor='phoneNumber' className='form-label'>Phone Number</label>
                    </div>
                </div>

                <div className='row g-2'>
                    <div className='form-floating  col-sm-6'>
                        <input type='text' className='form-control' id='email' autoComplete='off' value={ props.email } disabled />
                        <label htmlFor='email' className='form-label'>Email</label>
                    </div>

                    <div className='form-floating  col-sm-6'>
                        <input type='text' className='form-control' id='organisation' autoComplete='off' value={ props.organisation } disabled />
                        <label htmlFor='organisation' className='form-label'>Organisation</label>
                    </div>
                </div>
            </div>
        </div>
    );

export default Requester;