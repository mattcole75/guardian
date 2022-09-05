import React from 'react';
import Navigation from '../navigation/navigationItems';
import logo from '../../../assets/kam.webp';

const Header = (props) => {

    const { isAuthenticated, isAdministrator } = props;
    return (
        <header>
            <div className="px-3 py-2 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                            <img src={logo} alt="logo" />
                        </a>
                        <Navigation isAuthenticated={isAuthenticated} isAdministrator={isAdministrator} />
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;