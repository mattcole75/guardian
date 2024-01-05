import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { plannerGetAccessRequests, accessRequestResetState } from '../../../store/actions/index';

import railWeeks from '../../../configuration/lists/railWeeks.json';


const Filter = () => {

    const dispatch = useDispatch();

    const { idToken, localId } = useSelector(state => state.auth);
    const [ week, setWeek ] = useState('');

    const onGetAccessRequests = useCallback((idToken, localId, startDate, endDate, identifier) => dispatch(plannerGetAccessRequests(idToken, localId, startDate, endDate, identifier)), [dispatch]);
    const onResetState = useCallback(() => dispatch(accessRequestResetState()), [dispatch]);
    // a side effect to query the database and return to state a list of requests
    useEffect(() => {
        onGetAccessRequests(idToken, localId,
            week !== '' ? railWeeks.find(wks => wks.id === week).start : null,
            week !== '' ? railWeeks.find(wks => wks.id === week).end : null,
            'GET_PLANNER_ACCESS_REQUESTS');
        
            return () => { onResetState() }

    },[idToken, localId, week, onGetAccessRequests, onResetState]);

    const refresh = () => {
        onGetAccessRequests(idToken, localId, 
            week !== '' ? railWeeks.find(wks => wks.id === week).start : null,
            week !== '' ? railWeeks.find(wks => wks.id === week).end : null,
            'GET_PLANNER_ACCESS_REQUESTS');
    }


    return (
        <div className='border-top border-start border-end rounded-top-1 mt-4 bg-light shadow-sm'>
            <div className='container-fluid d-grid gap-3 align-items-center'>
                <div className='d-flex align-items-center p-2'>

                    <form className='flex-grow-1 me-3 form-control-sm' role='search'>
                        <div className='row g-2'>
                            
                            <div className='form-floating w-100 col-sm-7'>
                                <select className='form-select' id='railweeks'
                                    onChange={event => setWeek(event.target.value)} value={week}>
                                    <option value=''>No Filter...</option>
                                    {
                                        // eslint-disable-next-line array-callback-return
                                        railWeeks.map((item, index) => {
                                            if(item.inUse === 1) {
                                                return (
                                                    <option key={index}
                                                        value={ item.id }>{ item.id } | { moment(item.start).format('ddd Do MMM') } / { moment(item.end).format('ddd Do MMM') }
                                                    </option>
                                                )
                                            }
                                        })
                                    }
                                </select>
                                <label htmlFor='railweeks'>Rail Weeks</label>
                            </div>
                        </div>
                    </form>

                    <div className='form-floating text-end col-sm-1'>
                        <button type='button' className='btn btn-light'onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;