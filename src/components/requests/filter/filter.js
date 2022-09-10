import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as action from '../../../store/actions/index';

import railWeeks from '../../../configuration/railWeeks';


const Filter = () => {

    const dispatch = useDispatch();

    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const displayName = useSelector(state => state.auth.displayName);
    const roles = useSelector(state => state.auth.roles);
    
    const [week, setWeek] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [plannerFilterState, setPlannerFilterState] = useState(false);

    const onGetRequests = useCallback((idToken, localId, startDate, endDate, statusFilter, roles, identifier) => dispatch(action.getRequests(idToken, localId, startDate, endDate, statusFilter, roles, identifier)), [dispatch]);

    useEffect(() => {
        
        if( week !== '') {
            onGetRequests(idToken, localId, 
                railWeeks.find(wks => wks.id === week).start,
                railWeeks.find(wks => wks.id === week).end,
                statusFilter,
                plannerFilterState ? displayName : '',
                roles,
                'GET_REQUESTS');
        } else {
            onGetRequests(idToken, localId, 
                null,
                null,
                statusFilter,
                plannerFilterState ? displayName : '',
                roles,
                'GET_REQUESTS');
        }

    },[idToken, localId, onGetRequests, roles, statusFilter, plannerFilterState, week, displayName]);

    const togglePlannerFilterState = () => {
        setPlannerFilterState(prevState => !prevState);
    }

    return (
        <div className='mb-3 mt-3'>
            {roles.includes('planner')
                ?   <header className='py-3 mb-4 border mt-3 rounded-1 bg-light'>
                        <div className='row gy-3 justify-content-evenly'>

                            <div className='col-md-3'>
                                <div className='form-floating'>
                                    <select className='form-select' id='railweeks'
                                        onChange={event => setWeek(event.target.value)} value={week}>
                                        <option value=''>No Filter...</option>
                                        {
                                            // eslint-disable-next-line array-callback-return
                                            railWeeks.map((item, index) => {
                                                if(item.inUse === 1) {
                                                    return (
                                                        <option key={index}
                                                            value={item.id}>{item.id} | {moment(item.start).format('ddd Do MMM')} / {moment(item.end).format('ddd Do MMM')}
                                                        </option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>
                                    <label htmlFor='railweeks'>Rail Weeks</label>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className='form-floating'>
                                    <select className='form-select' id='accessRequestStatus'
                                        onChange={event => setStatusFilter(event.target.value)} value={statusFilter}>
                                        <option value=''>No Filter...</option>
                                        <option value='Submitted'>Submitted</option>
                                        <option value='Under Review'>Under Review</option>
                                        <option value='Granted'>Granted</option>
                                        <option value='Denied'>Denied</option>
                                    </select>
                                    <label htmlFor='accessRequestStatus'>Access Request Status</label>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className='form-floating'>
                                    <div className='form-check form-switch'>
                                        <input 
                                            className='form-check-input'
                                            type='checkbox'
                                            role='switch'
                                            id='plannerFilter'
                                            checked={plannerFilterState}
                                            onChange={togglePlannerFilterState}
                                        />
                                        <label className='form-check-label' htmlFor='plannerFilter'>Show my Access Requests</label>
                                    </div>
                                </div>
                            </div>
                        </div>                
                    </header>
                :   null
            }
        </div>
    )
}

export default Filter;