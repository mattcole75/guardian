import React from 'react';
import Header from '../components/ui/header/header';
import Footer from '../components/ui/footer/footer';
import {useSelector} from 'react-redux';

const Layout = (props) => {

    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const roles = useSelector(state => state.auth.roles);
    const isAdministrator = roles.includes('administrator', 0);
    
    return (
        <React.Fragment>
            <Header isAuthenticated={isAuthenticated} isAdministrator={isAdministrator} />
            <main>
                {props.children}
            </main>
            <Footer isAuthenticated={isAuthenticated} />
        </React.Fragment>
    );
};

export default Layout;