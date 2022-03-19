import React, { useEffect, useCallback } from 'react';
import {useDispatch} from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as action from '../../store/actions/index';

const Logout = () => {

    const dispatch = useDispatch();
    const onLogout = useCallback(() => dispatch(action.logout()), [dispatch]);
    const clearRequestState = useCallback(() => dispatch(action.resetState()), [dispatch]);

    useEffect(() => {
		onLogout();
        clearRequestState();
	},[onLogout, clearRequestState]);

    return (
        <Redirect to="/" />
    )
};

export default Logout;