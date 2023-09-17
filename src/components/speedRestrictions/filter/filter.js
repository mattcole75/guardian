import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpeedRestrictions } from '../../../store/actions/index';

import locations from '../../../data/locations';

const Filter = () => {

    const dispatch = useDispatch();

    const { idToken, localId } = useSelector(state => state.auth);
    
    const [ type, setType ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ status, setStatus ] = useState('');

    const onGetSpeedRestrictions = useCallback((idToken, localId, type, location, status, identifier) => dispatch(getSpeedRestrictions(idToken, localId, type, location, status, identifier)), [dispatch]);

    useEffect(() => {
        onGetSpeedRestrictions(idToken, localId, type, location, status, 'GET_SPEED_RESTRICTIONS');
    }, [idToken, localId, location, onGetSpeedRestrictions, status, type]);

    const refresh = () => {
        onGetSpeedRestrictions(idToken, localId, type, location, status, 'GET_SPEED_RESTRICTIONS');
    }


    return (
        <div className='border-top border-start border-end rounded-top-1 mt-4 bg-light shadow-sm'>
            <div className='container-fluid d-grid gap-3 align-items-center'>
                <div className='align-items-center p-2'>

                    <div className='row g-2 bg-light'>

                        <div className='form-floating  col-sm-c3'>
                            <select className='form-select' id='type'
                                onChange={ event => setType(event.target.value) } value={ type }>
                                <option value=''>No Filter...</option>
                                <option value='Temporary'>Temporary</option>
                                <option value='Permanent'>Permanent</option>
                            </select>
                            <label htmlFor='type'>Type</label>
                        </div>

                        <div className='form-floating col-sm-c3'>
                            <select className='form-select' id='location'
                                onChange={ event => setLocation(event.target.value) } value={ location }>
                                <option value=''>No Filter...</option>
                                {
                                    locations.map(item => {
                                        return (<option key={ item.code } value={ item.name }>{ item.name }</option>)
                                    })
                                }
                            </select>
                            <label htmlFor='location'>Location</label>
                        </div>

                        <div className='form-floating col-sm-c3'>
                        <select className='form-select' id='status'
                                onChange={ event => setStatus(event.target.value) } value={ status }>
                                <option value=''>No Filter...</option>
                                <option value='New'>New</option>
                                <option value='Reviewed'>Reviewed</option>
                            </select>
                            <label htmlFor='status'>Status</label>
                        </div>



                        <div className='col-sm-c1'>
                            <div className='row'>
                                <div className='form-floating col-sm-6'>
                                    <Link className='btn btn-light btn-sm' to={ '/newspeedrestriction' }><span className='bi-plus-circle-dotted fs-3' /></Link>
                                </div>

                                <div className='form-floating col-sm-6'>
                                    <button type='button' className='btn btn-light btn-sm' onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
                                </div>
                            </div>
                        </div>

                    </div>

                {/* <div className='col-md-3'>
                    <div className='form-floating m-2'>
                        <select className='form-select' id='location'
                            onChange={ event => setLocation(event.target.value) } value={ location }>
                            <option value=''>No Filter...</option>
                            {
                                locations.map(item => {
                                    return (<option key={ item.code } value={ item.name }>{ item.name }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='location'>Location</label>
                    </div>
                </div>

                <div className='col-md-3'>
                    <div className='form-floating m-2'>
                        <select className='form-select' id='location'
                            onChange={ event => setLocation(event.target.value) } value={ location }>
                            <option value=''>No Filter...</option>
                            {
                                locations.map(item => {
                                    return (<option key={ item.code } value={ item.name }>{ item.name }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='location'>Location</label>
                    </div>
                </div>

                <div className='col-md-3'>
                    <div className='form-floating m-2'>
                        <select className='form-select' id='location'
                            onChange={ event => setLocation(event.target.value) } value={ location }>
                            <option value=''>No Filter...</option>
                            {
                                locations.map(item => {
                                    return (<option key={ item.code } value={ item.name }>{ item.name }</option>)
                                })
                            }
                        </select>
                        <label htmlFor='location'>Location</label>
                    </div>
                </div>

                <div className='col-md-3 d-flex p-2'>
                    <div className=''>
                        <Link className='btn btn-light' to={ '/newaccessrequest' }><span className='bi-calendar2-plus fs-3' /></Link>
                    </div>

                    <div className=''>
                        <button type='button' className='btn btn-light'onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
                    </div>
                </div> */}

                {/* <div className='col-md-3'>
                    <div className='form-floating text-end col-md-1'>
                        <Link className='btn btn-light' to={ '/newaccessrequest' }><span className='bi-calendar2-plus fs-3' /></Link>
                    </div>

                    <div className='form-floating text-end col-md-1'>
                        <button type='button' className='btn btn-light'onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
                    </div>
                </div> */}
                    
                </div>
            </div>
        </div>
    );
}

export default Filter;