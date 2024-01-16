import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { plannerGetDailySummary, accessRequestResetState } from '../../../store/actions/index';



const Filter = () => {

    const dispatch = useDispatch();

    const { idToken, localId } = useSelector(state => state.auth);
    const [ day, setDay ] = useState(moment().format('YYYY-MM-DD'));
    

    const onGetDailySummary = useCallback((idToken, localId, day, identifier) => dispatch(plannerGetDailySummary(idToken, localId, day, identifier)), [dispatch]);
    const onResetState = useCallback(() => dispatch(accessRequestResetState()), [dispatch]);
    
    // a side effect to query the database and return to state a list of requests
    useEffect(() => {
        onGetDailySummary(idToken, localId,
            moment(day),
            'GET_DAILY_SUMMARY');

            return () => { onResetState() }
            
    },[day, idToken, localId, onGetDailySummary, onResetState]);

    const refresh = () => {
        onGetDailySummary(idToken, localId, 
            moment(day),
            'GET_DAILY_SUMMARY');
    }

    return (
        <div className='border-top border-start border-end rounded-top-1 mt-4 bg-light shadow-sm'>
            <div className='container-fluid d-grid gap-3 align-items-center'>
                <div className='d-flex align-items-center p-2'>

                    <form className='flex-grow-1 me-3 form-control-sm' role='search'>
                        <div className='row g-2'>
                            
                            <div className='form-floating col-sm-6'>

                                <input
                                    type='date'
                                    className='form-control'
                                    id='date'
                                    placeholder='Date'
                                    value={ day }
                                    onChange={ event => { setDay(event.target.value) } }
                                    required />
                                <label htmlFor='date' className='form-label'>Date</label>
                            </div>
                        </div>
                    </form>

                    <div className='form-floating text-end col-sm-6'>
                        <button type='button' className='btn btn-light'onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;