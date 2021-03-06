import React, { useEffect, useCallback, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './layout/layout';
import * as action from './store/actions/index';

const Index = React.lazy(() => {
	return import('./pages/index');
});
const Signup = React.lazy(() => {
    return import('./pages/auth/signup');
});
const Login = React.lazy(() => {
    return import('./pages/auth/login');
});
const Logout = React.lazy(() => {
    return import('./pages/auth/logout');
});
const Account = React.lazy(() => {
    return import('./pages/auth/account');
});
const Requests = React.lazy(() => {
    return import('./pages/requests/requests');
});
const Request = React.lazy(() => {
    return import('./pages/requests/request');
});
const Pricing = React.lazy(() => {
    return import('./pages/pricing');
});
const FAQ = React.lazy(() => {
    return import('./pages/faq');
});

const App = () => {

	const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
	const onTryAutoLogin = useCallback(() => dispatch(action.authCheckState()),[dispatch]);

	// check if there is persistent auth data stored on refresh, load into redux if it exists
	useEffect(() => { 
        onTryAutoLogin();
	},[onTryAutoLogin]);

    const routes = (
		<Routes>
			<Route path="/" element={ <Index /> } />
			<Route path="/login" element={ <Login /> } />
			<Route path="/signup" element={ <Signup /> } />
            <Route path="/pricing" element={ <Pricing /> } />
			<Route path="/faq" element={ () => <FAQ /> } />
            { isAuthenticated && <Route path="/logout" element={ <Logout /> } /> }
			{ isAuthenticated && <Route path="/requests" element={ <Requests /> } /> }
			{ isAuthenticated && <Route path="/request" element={ <Request /> } /> }
			{ isAuthenticated && <Route path="/account" element={ <Account /> } /> }
		</Routes>
	);

    return (
		<div className="">
			<Layout>
				<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
			</Layout>
		</div>
	)
};

export default App;