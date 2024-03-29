import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as action from '../../../store/actions/index';


const Filter = (props) => {

    const {railWeeks, currentWeek} = props;

    const dispatch = useDispatch();

    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    
    const [week, setWeek] = useState('');

    const onGetPublicRequests = useCallback((idToken, localId, startDate, endDate, identifier) => dispatch(action.getPublicViewRequests(idToken, localId, startDate, endDate, identifier)), [dispatch]);

    useEffect(() => {
        if(week === '' && currentWeek !== null)
            setWeek(currentWeek);
        
        if( week !== '') {
            onGetPublicRequests(idToken, localId, 
                railWeeks.find(wks => wks.id === week).start,
                railWeeks.find(wks => wks.id === week).end,
                'GET_PUBLIC_VIEW_REQUESTS');
        }
    },[idToken, localId, onGetPublicRequests, week, currentWeek, railWeeks]);

    return (
        <header className='py-3 mb-4 border-bottom'>
            <div className='container d-flex flex-wrap justify-content-center'>
            
            <form className='col-12 col-lg-auto mb-3 mb-lg-0' role='search'>
                <div className='g-2 bg-light'>
                    
                    <div className='form-floating w-100'>
                        <select className='form-select' id='railweeks'  
                            onChange={event => setWeek(event.target.value)} value={week}>
                            <option value=''>Choose...</option>
                            {
                                // eslint-disable-next-line array-callback-return
                                railWeeks.map((item, index) => {
                                    if(item.inUse === 1) {
                                        return (
                                            <option key={index}
                                                value={item.id}>{item.id} ( {moment(item.start).format('ddd Do MMM')} - {moment(item.end).format('ddd Do MMM')} )
                                            </option>
                                        )
                                    }
                                })
                            }
                        </select>
                        <label htmlFor='railweeks'>Week</label>
                    </div>
                </div>
            </form>
            </div>
        </header>
    )
}

export default Filter;