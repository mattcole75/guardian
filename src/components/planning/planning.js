import React from 'react';
import { useSelector } from 'react-redux';

import Filter from './filter/filter';
import List from './list/list';
import Backdrop from "../ui/backdrop/backdrop";
import Spinner from "../ui/spinner/spinner";

const Planning = () => {

    const { loading, error, accessRequests } = useSelector(state => state.accessRequest);

    // const { idToken, localId } = useSelector(state => state.auth);


    let spinner = null;
    if(loading)
        spinner = <Spinner />

    return (
        <div className="container">
            <Backdrop show={ loading } />
            { spinner }
            { error &&
                <div className='alert alert-danger text-wrap text-break' role='alert'>
                    { error }
                </div>
            }

            <div className='u-margin-bottom-small'>
                <Filter />
            </div>

            {/* The List Component */}
            <List accessRequests={ accessRequests } />
        </div>
    );
}

export default Planning;