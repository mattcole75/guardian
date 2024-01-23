import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { plannerGetAccessRequests } from '../../../store/actions/index';

import railWeeks from '../../../configuration/lists/railWeeks.json';
import statusFilter from '../../../configuration/lists/statusFilter.json';
import categoryFilter from '../../../configuration/lists/possessionCategories.json';
import picopFilter from '../../../configuration/lists/picop.json';
import picFilter from '../../../configuration/lists/pic.json';
import organisationFilter from '../../../configuration/lists/organisations.json';
import lineFilter from '../../../configuration/lists/lines.json';
import isolationFilter from '../../../configuration/lists/isolationTypes.json';


const Filter = () => {

    const dispatch = useDispatch();

    const { idToken, localId } = useSelector(state => state.auth);
    const [ week, setWeek ] = useState('');
    const [ status, setStatus] = useState('');
    const [ category, setCategory ] = useState('');
    const [ picop, setPicop ] = useState('');
    const [ pic, setPic ] = useState('');
    const [ organisation, setOrganisation ] = useState('');
    const [ line, setLine ] = useState('');
    const [ isolation, setIsolation ] = useState('');
    const [ safetyResource, setSafetyResource ] = useState(false);
    const [ testTrams, setTestTrams ] = useState(false);
    const [ signallingResource, setSignallingResource ] = useState(false);
    const [ electricalResource, setElectricalResource ] = useState(false);

    const onGetAccessRequests = useCallback((idToken, localId, startDate, endDate, identifier) => dispatch(plannerGetAccessRequests(idToken, localId, startDate, endDate, identifier)), [dispatch]);
    // const onResetState = useCallback(() => dispatch(accessRequestResetState()), [dispatch]);
    // a side effect to query the database and return to state a list of requests
    useEffect(() => {
        onGetAccessRequests(idToken, localId,{
            startDate: week !== '' ? railWeeks.find(wks => wks.id === week).start : null,
            endDate: week !== '' ? railWeeks.find(wks => wks.id === week).end : null,
            status: status,
            category: category,
            picop: picop,
            pic: pic,
            organisation: organisation,
            line: line,
            isolation: isolation,
            safetyResource: safetyResource,
            testTrams: testTrams,
            signallingResource: signallingResource,
            electricalResource: electricalResource
        },'GET_PLANNER_ACCESS_REQUESTS');
        
    },[idToken, localId, week, onGetAccessRequests, status, category, picop, pic, organisation, line, isolation, safetyResource, testTrams, signallingResource, electricalResource]);

    const refresh = () => {
        onGetAccessRequests(idToken, localId, {
            startDate: week !== '' ? railWeeks.find(wks => wks.id === week).start : null,
            endDate: week !== '' ? railWeeks.find(wks => wks.id === week).end : null,
            status: status,
            category: category,
            picop: picop,
            pic: pic,
            organisation: organisation,
            line: line,
            isolation: isolation,
            safetyResource: safetyResource,
            testTrams: testTrams,
            signallingResource: signallingResource,
            electricalResource: electricalResource
        }, 'GET_PLANNER_ACCESS_REQUESTS');
    }

    return (
        <div className='border-top border-start border-end rounded-top-1 mt-4 bg-light shadow-sm'>

            <div className='accordion' id='accordionPanels'>
                <div className='accordion-item border-0'>
                    <h2 className='accordion-header' id='panelsStayOpen-headingRequestor'>
                        <div className='accordion-button collapsed' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapseRequestor' aria-expanded='false' aria-controls='panelsStayOpen-collapseRequestor'>
                            <h3 className='h5 m-0 text-muted'>Filter</h3>
                        </div>
                    </h2>

                    <div id='panelsStayOpen-collapseRequestor' className='accordion-collapse collapse border-bottom' aria-labelledby='panelsStayOpen-headingRequestor'>
                        <div className='accordion-body'>

                            <div className='row g-2'>
                                <div className='form-floating col-sm-3'>
                                    <select className='form-select' id='picop'
                                        onChange={ event => setPicop(event.target.value) } value={ picop }>
                                        <option value=''>No Filter...</option>
                                        {
                                            // eslint-disable-next-line array-callback-return
                                            picopFilter.map((item, index) => {
                                                return (
                                                    <option key={index} value={ item.name }>{ item.name }</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='picop'>PICOP</label>
                                </div>

                                <div className='form-floating  col-sm-3 mb-2'>
                                    <select className='form-select' id='organisation'
                                        onChange={ event => setOrganisation(event.target.value) } value={ organisation }>
                                        <option value=''>No Filter...</option>
                                        {
                                            // eslint-disable-next-line array-callback-return
                                            organisationFilter.map((item, index) => {
                                                return (
                                                    <option key={index} value={ item.organisation }>{ item.organisation }</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='organisation'>Organisation</label>
                                </div>

                                <div className='form-floating  col-sm-3 mb-2'>
                                    <select className='form-select' id='Isolation'
                                        onChange={ event => setIsolation(event.target.value) } value={ isolation }>
                                        <option value=''>No Filter...</option>
                                        {
                                            // eslint-disable-next-line array-callback-return
                                            isolationFilter.map((item, index) => {
                                                return (
                                                    <option key={index} value={ item.type }>{ item.type }</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='Isolation'>Isolation</label>
                                </div>

                                <div className='form-floating  col-sm-3 mb-2'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='safetyResource'
                                            onChange={ event => setSafetyResource(event.target.checked) } checked={ safetyResource } />
                                        <label className='form-check-label' htmlFor='safetyResource'>Safty Resource Required</label>
                                    </div>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='testTrams'
                                            onChange={ event => setTestTrams(event.target.checked) } checked={ testTrams } />
                                        <label className='form-check-label' htmlFor='testTrams'>Test Trams Required</label>
                                    </div>
                                </div>
                            </div>

                            <div className='row g-2'>
                                <div className='form-floating col-sm-3'>
                                    <select className='form-select' id='pics'
                                        onChange={ event => setPic(event.target.value) } value={ pic }>
                                        <option value=''>No Filter...</option>
                                        {
                                            // eslint-disable-next-line array-callback-return
                                            picFilter.map((item, index) => {
                                                return (
                                                    <option key={index} value={ item.name }>{ item.name }</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='pics'>PIC</label>
                                </div>

                                <div className='form-floating  col-sm-3 mb-2'>
                                    <select className='form-select' id='line'
                                        onChange={ event => setLine(event.target.value) } value={ line }>
                                        <option value=''>No Filter...</option>
                                        {
                                            // eslint-disable-next-line array-callback-return
                                            lineFilter.map((item, index) => {
                                                return (
                                                    <option key={index} value={ item.line }>{ item.line }</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <label htmlFor='line'>Line</label>
                                </div>

                                <div className='form-floating  col-sm-3 mb-2'>
                                    
                                </div>

                                <div className='form-floating  col-sm-3 mb-2'>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='signallingResource'
                                            onChange={ event => setSignallingResource(event.target.checked) } checked={ signallingResource } />
                                        <label className='form-check-label' htmlFor='signallingResource'>Signalling Resource Required</label>
                                    </div>
                                    <div className='form-check form-switch'>
                                        <input className='form-check-input' type='checkbox' role='switch' id='electricalResource'
                                            onChange={ event => setElectricalResource(event.target.checked) } checked={ electricalResource } />
                                        <label className='form-check-label' htmlFor='electricalResource'>Electrical Resource Required</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    <div className='container row g-2 mt-2'>
                        <div className='form-floating col-sm-4 mb-2'>
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
                        <div className='form-floating col-sm-3 mb-2'>
                            <select className='form-select' id='railweeks'
                                onChange={ event => setStatus(event.target.value) } value={ status }>
                                <option value=''>No Filter...</option>
                                {
                                    // eslint-disable-next-line array-callback-return
                                    statusFilter.map((item, index) => {
                                        return (
                                            <option key={index} value={ item.status }>{ item.status }</option>
                                        )
                                    })
                                }
                            </select>
                            <label htmlFor='railweeks'>Status</label>
                        </div>

                        <div className='form-floating col-sm-3 mb-2'>
                            <select className='form-select' id='railweeks'
                                onChange={ event => setCategory(event.target.value) } value={ category }>
                                <option value=''>No Filter...</option>
                                {
                                    // eslint-disable-next-line array-callback-return
                                    categoryFilter.map((item, index) => {
                                            return (
                                                <option key={index} value={ item.category }>{ item.category }</option>
                                            )
                                    })
                                }
                            </select>
                            <label htmlFor='railweeks'>Category</label>
                        </div>

                        <div className='form-floating text-end col-sm-2'>
                            <button className='btn btn-light' type='button' onClick={ refresh }><span className='bi-arrow-clockwise fs-3' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;