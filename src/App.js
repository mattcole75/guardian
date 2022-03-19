import React, { useEffect, useCallback, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
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

    const isAuthenticated = useSelector(state => state.auth.idToken !== null);

    const dispatch = useDispatch();
	const onTryAutoLogin = useCallback(() => dispatch(action.authCheckState()),[dispatch]);

	useEffect(() => { 
        onTryAutoLogin();
	},[onTryAutoLogin]);

    const routes = (
		<Switch>
			<Route exact path="/" component={Index} />
			<Route path="/signup" render={() => <Signup />} />
			<Route path="/login" render={() => <Login />} />
            <Route path="/pricing" render={() => <Pricing />} />
			<Route path="/faq" render={() => <FAQ />} />
            { isAuthenticated && <Route path="/logout" render={() => <Logout />} /> }
			{ isAuthenticated && <Route path="/requests" render={() => <Requests />} /> }
			{ isAuthenticated && <Route path="/request" render={() => <Request />} /> }
			{ isAuthenticated && <Route path="/account" render={() => <Account />} /> }
			<Redirect to="/" />
		</Switch>   
	);

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </Layout>
        </div>
    );
}
 
export default withRouter(App);