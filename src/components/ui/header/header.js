import React from 'react';
import Navigation from '../navigation/navigation';
import { Link } from 'react-router-dom';

const Header = (props) => {

    const { isAuthenticated, roles, showSidebar, toggleShowSidebar } = props;

    const isSpeedRestrictor = roles.includes('speedRestrictor');
    const isAdministrator = roles.includes('administrator');

    return (

        <div className='container'>
            <header className='navbar sticky-top flex-md-nowrap py-2 border-bottom'>
                <div className='w-100 d-flex align-items-center justify-content-between navbar-brand col-md-3 col-lg-2 fs-6'>                    
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
                    <Link to='/' className='d-flex align-items-center navbar-brand col-md-3 col-lg-2 px-2'>
                        <h1 className='heading-primary'>
                            <span className="heading-primary_main">Guardian</span>
                            <span className="heading-primary_sub">Planning & Access System</span>
                        </h1>
                    </Link>
                    <div className='headerNavigation'>
                        <Navigation 
                            isAuthenticated={ isAuthenticated }
                            isSpeedRestrictor={ isSpeedRestrictor }
                            isAdministrator={ isAdministrator }
                        />
                    </div>
                </div>
            </header>
        </div>
    )
};

export default Header;