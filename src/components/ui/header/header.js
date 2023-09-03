import React from 'react';
import Navigation from '../navigation/navigation';
import { Link } from 'react-router-dom';

const Header = (props) => {

    const { isAuthenticated, roles, showSidebar, toggleShowSidebar } = props;

    const isUser = roles.includes('user');
    const isCoordinator = roles.includes('coordinator');
    const isPlanner = roles.includes('planner');
    const isDisruptionAuthority = roles.includes('disruptionAuthority');
    const isAdministrator = roles.includes('administrator');

    

    return (

        // <div className='px-3 py-2 bg-dark text-white'>
        <div className='container'>
            <header className='navbar sticky-top flex-md-nowrap px-3 py-2 border-bottom'>
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
                            isAuthenticated={isAuthenticated}
                            isUser={isUser}
                            isCoordinator={isCoordinator}
                            isPlanner={isPlanner}
                            isDisruptionAuthority={isDisruptionAuthority}
                            isAdministrator={isAdministrator}
                        />
                    </div>
                </div>
            </header>
        </div>

        // <header>
        //     <div className='px-3 py-2 bg-dark text-white'>
        //         <div className='container'>
        //             <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
                        
        //                 {/* <a href='/' className='d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none'>
        //                     <img src={logo} alt='logo' />
        //                 </a> */}
                        
        //                 <a href='/' className='d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none'>
        //                     <h1 className='heading-primary'>
        //                         <span className="heading-primary_main">Guardian</span>
        //                         <span className="heading-primary_sub">Planning & Access System</span>
        //                     </h1>
        //                 </a>

        //                 <div className='item-hide'>
        //                     <a href='/' className='d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none'>
        //                         <img src={logo} alt='logo' />
        //                     </a>
        //                 </div>
                        
        //                 <Navigation 
        //                     isAuthenticated={isAuthenticated}
        //                     isUser={isUser}
        //                     isCoordinator={isCoordinator}
        //                     isPlanner={isPlanner}
        //                     isDisruptionAuthority={isDisruptionAuthority}
        //                     isAdministrator={isAdministrator}
        //                 />
        //             </div>
        //         </div>
        //     </div>
        // </header>
    )
};

export default Header;