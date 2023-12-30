import React from 'react';
import Navigation from '../navigation/header/navigation';
import { Link } from 'react-router-dom';
import './header.css';

const Header = (props) => {

    const { showSidebar, toggleShowSidebar, isAuthenticated, roles } = props; 

    return (
        <div className='container'>
            <header className='navbar sticky-top flex-md-nowrap px-3 py-2 border-bottom'>
                <div className='w-100 d-flex align-items-center justify-content-between col-md-3 col-lg-2 fs-6'> 

                        <Link to='/' className='d-flex align-items-center navbar-brand col-md-3 col-lg-2 px-2'>
                            <h1 className='heading-primary'>
                                <span className="heading-primary_main">Guardian</span>
                                <span className="heading-primary_sub">Planning & Access System</span>
                            </h1>
                        </Link>

                        <button 
                            className='navbar-toggler d-md-none collapsed'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#sidebarMenu'
                            aria-controls='sidebarMenu'
                            aria-expanded={ showSidebar }
                            aria-label='Toggle navigation'
                            onClick={ toggleShowSidebar }
                        >
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        
                        <div className='header-navigation_display'>
                            <Navigation isAuthenticated={ isAuthenticated } roles={ roles } />
                        </div>

                </div>
            </header>
        </div>
    );
};

export default Header;