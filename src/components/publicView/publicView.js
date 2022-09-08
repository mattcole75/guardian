import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Backdrop from '../ui/backdrop/backdrop';
import Spinner from '../ui/spinner/spinner';

import Filter from './filter/filter';
import Map from './map/map';
import AccessRequestList from './accessRequestList/accessRequestList';
import railWeeks from '../../configuration/railWeeks';

const PublicView = () => {

    const loading = useSelector(state => state.publicView.loading);
    const error = useSelector(state => state.publicView.error);
    const publicViewRequests = useSelector(state => state.publicView.requests);
    
    const [currentWeek, setCurrentWeek] = useState(null);

    const today = Date.parse(moment().startOf('day'));

    useEffect(() => {

        railWeeks.forEach(week => {
            if(today >= Date.parse(week.start) && today < Date.parse(week.end) && week.inUse === 1) {
                setCurrentWeek(week.id);
            }
        })
    },[today]);


    let spinner = null;

    if(loading)
        spinner = <Spinner />


    return (
        <div className='container'>
            <Backdrop show={loading} />
            {spinner}
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            }
            <Filter railWeeks={railWeeks} currentWeek={currentWeek}/>
            <div className='row'>
                <Map requests={publicViewRequests} />
                <AccessRequestList requests={publicViewRequests}/>
            </div>
            
        </div>
        
    );
}

export default PublicView;