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
const RecoverPassword = React.lazy(() => {
    return import('./pages/auth/recoverPassword');
});
const Logout = React.lazy(() => {
    return import('./pages/auth/logout');
});
const Profile = React.lazy(() => {
    return import('./components/auth/profile/profile');
});
const AccessRequests = React.lazy(() => {
	return import('./components/accessRequests/accessRequests');
});
const AccessRequest = React.lazy(() => {
    return import('./components/accessRequests/form/accessRequestForm');
});
const NewAccessRequest = React.lazy(() => {
	return import('./components/accessRequests/form/newAccessRequest')
});
const Users = React.lazy(() => {
	return import ('./pages/auth/users');
});
const Forbidden = React.lazy(() => {
	return import('./pages/forbidden');
});

const App = () => {

	const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
	const roles = useSelector(state => state.auth.roles);
    const isAdministrator = roles.includes('administrator', 0);
	const onTryAutoLogin = useCallback(() => dispatch(action.authCheckState()),[dispatch]);

	// check if there is persistent auth data stored on refresh, load into redux if it exists
	useEffect(() => { 
        onTryAutoLogin();
	},[onTryAutoLogin]);

    const routes = (
		<Routes>
			<Route path='/' element={ <Index /> } />
			<Route path='/login' element={ <Login /> } />
			<Route path='/recoverPassword' element={ <RecoverPassword /> } />
			<Route path='/signup' element={ <Signup /> } />
            <Route path='/forbidden' element={ <Forbidden /> } />
            { isAuthenticated && <Route path='/logout' element={ <Logout /> } /> }
			{ isAuthenticated && <Route path='/accessrequests' element={ <AccessRequests /> } /> }
			{ isAuthenticated && <Route path='/accessrequest/:uid' element={ <AccessRequest /> } /> }
			{ isAuthenticated && <Route path='/newaccessrequest' element={ <NewAccessRequest /> } /> }
			{ isAuthenticated && <Route path='/profile' element={ <Profile /> } /> }
			{ isAuthenticated && isAdministrator && <Route path='/users' element={ <Users /> } /> }
			<Route path='*' element={ <Index /> } />
		</Routes>
	);

    return (
		<div>
			<Layout isAuthenticated={ isAuthenticated } roles={ roles }>
				<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
			</Layout>
		</div>
	)
};

export default App;