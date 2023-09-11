import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as action from '../../../store/actions/index';

import railWeeks from '../../../configuration/railWeeks';


const Filter = () => {

    const dispatch = useDispatch();

    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const [ week, setWeek ] = useState('');

    const onGetAccessRequests = useCallback((idToken, localId, startDate, endDate, statusFilter, planner, identifier) => dispatch(action.userGetAccessRequests(idToken, localId, startDate, endDate, statusFilter, planner,identifier)), [dispatch]);

    // a side effect to query the database and return to state a list of requests
    useEffect(() => {
        onGetAccessRequests(idToken, localId, 
            week !== '' ? railWeeks.find(wks => wks.id === week).start : null,
            week !== '' ? railWeeks.find(wks => wks.id === week).end : null,
            '',
            '',
            'GET_ACCESS_REQUESTS');
    },[idToken, localId, week, onGetAccessRequests]);

    const refresh = () => {
        onGetAccessRequests(idToken, localId, 
            week !== '' ? railWeeks.find(wks => wks.id === week).start : null,
            week !== '' ? railWeeks.find(wks => wks.id === week).end : null,
            '',
            '',
            'GET_ACCESS_REQUESTS');
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
                        <Link className='btn btn-light' to={ '/newaccessrequest' }><span className='bi-calendar2-plus fs-3' /></Link>
                    </div>

                    <div className='form-floating text-end col-sm-1'>
                        <button type='button' className='btn btn-light'onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
                    </div>
                </div>
            </div>
        </div>


        // <div className='border-top border-start border-end rounded-top-1 mt-4 bg-light shadow-sm'>
        //     <div className='container-fluid d-grid gap-3 align-items-center'>
        //         <div className='d-flex align-items-center p-2'>

        //             <div className='row gy-3 justify-content-evenly'>

        //                 <div className='form-floating  col-sm-4'>
        //                     <div className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'>
        //                         <div className='form-floating'>
        //                             <h5 className='h5 text-muted'>Users</h5>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <div className='col-md-4'>
        //                     <div className='form-floating m-2'>
        //                         <select className='form-select' id='railweeks'
        //                             onChange={event => setWeek(event.target.value)} value={week}>
        //                             <option value=''>No Filter...</option>
        //                             {
        //                                 // eslint-disable-next-line array-callback-return
        //                                 railWeeks.map((item, index) => {
        //                                     if(item.inUse === 1) {
        //                                         return (
        //                                             <option key={index}
        //                                                 value={item.id}>{item.id} | {moment(item.start).format('ddd Do MMM')} / {moment(item.end).format('ddd Do MMM')}
        //                                             </option>
        //                                         )
        //                                     }
        //                                 })
        //                             }
        //                         </select>
        //                         <label htmlFor='railweeks'>Rail Weeks</label>
        //                     </div>
        //                 </div>

        //                 <div className='col-md-4'>
        //                     <div className='form-floating m-2'>
        //                         <select className='form-select' id='accessRequestStatus'
        //                             onChange={event => setStatusFilter(event.target.value)} value={statusFilter}>
        //                             <option value=''>No Filter...</option>
        //                             <option value='Submitted'>Submitted</option>
        //                             <option value='Under Review'>Under Review</option>
        //                             <option value='Granted'>Granted</option>
        //                             <option value='Denied'>Denied</option>
        //                         </select>
        //                         <label htmlFor='accessRequestStatus'>Access Request Status</label>
        //                     </div>
        //                 </div>

        //                 <div className='col-md-4'>
        //                     <button type='button' className='btn btn-light rounded-5 p-0'onClick={ () => {} }><span className='bi-arrow-clockwise fs-3' /></button>
        //                 </div>
        //             </div>

        //         </div>
        //     </div>
        // </div>

        // <div className='mt-3'>
        //     <header className='py-3 mb-4 border mt-3 rounded-1 bg-light shadow'>
        //         <div className='row gy-3 justify-content-evenly'>

        //             <div className='col-md-4'>
        //                 <div className='form-floating m-2'>
        //                     <select className='form-select' id='railweeks'
        //                         onChange={event => setWeek(event.target.value)} value={week}>
        //                         <option value=''>No Filter...</option>
        //                         {
        //                             // eslint-disable-next-line array-callback-return
        //                             railWeeks.map((item, index) => {
        //                                 if(item.inUse === 1) {
        //                                     return (
        //                                         <option key={index}
        //                                             value={item.id}>{item.id} | {moment(item.start).format('ddd Do MMM')} / {moment(item.end).format('ddd Do MMM')}
        //                                         </option>
        //                                     )
        //                                 }
        //                             })
        //                         }
        //                     </select>
        //                     <label htmlFor='railweeks'>Rail Weeks</label>
        //                 </div>
        //             </div>

        //             <div className='col-md-4'>
        //                 <div className='form-floating m-2'>
        //                     <select className='form-select' id='accessRequestStatus'
        //                         onChange={event => setStatusFilter(event.target.value)} value={statusFilter}>
        //                         <option value=''>No Filter...</option>
        //                         <option value='Submitted'>Submitted</option>
        //                         <option value='Under Review'>Under Review</option>
        //                         <option value='Granted'>Granted</option>
        //                         <option value='Denied'>Denied</option>
        //                     </select>
        //                     <label htmlFor='accessRequestStatus'>Access Request Status</label>
        //                 </div>
        //             </div>

        //             <div className='col-md-4'>
        //                 <div className='form-floating m-2'>
        //                     <div className='form-check form-switch'>
        //                         <input 
        //                             className='form-check-input'
        //                             type='checkbox'
        //                             role='switch'
        //                             id='plannerFilter'
        //                             checked={plannerFilterState}
        //                             onChange={togglePlannerFilterState}
        //                         />
        //                         <label className='form-check-label' htmlFor='plannerFilter'>Show my Access Requests</label>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>                
        //     </header>
        // </div>
    )
}

export default Filter;