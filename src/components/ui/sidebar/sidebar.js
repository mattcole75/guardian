import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {

    const { isAuthenticated, roles, showSidebar, toggleShowSidebar } = props;

    // const isUser = roles.includes('user');
    // const isCoordinator = roles.includes('coordinator');
    // const isPlanner = roles.includes('planner');
    // const isDisruptionAuthority = roles.includes('disruptionAuthority');
    const isAdministrator = roles.includes('administrator');
    const isSpeedRestrictor = roles.includes('speedRestrictor');

    const navStyle = ['col-md-3', 'col-lg-2', 'sidebar', 'bg-dark', 'bg-opacity-95']

    if(!showSidebar) {
        navStyle.push('collapse')
    }

    return (
        <div className='container'>
            <nav id='sidebarMenu' className={navStyle.join(' ')}>
                <div className='position-sticky pt-3 sidebar-sticky h-100'>
                    <ul className='nav nav-pills flex-column mb-auto'>
                        <li className='nav-item'>
                            <NavLink to='/' className='nav-link text-white' onClick={ toggleShowSidebar } end><i className='bi-house-door' />  Home</NavLink>
                        </li>

                        { isSpeedRestrictor
                            ?   <li className='nav-item'>
                                    <NavLink to='/speedrestrictions' className='nav-link text-white' onClick={ toggleShowSidebar }><i className='bi-Speedometer2' />  Speed Restrictions</NavLink>
                                </li>
                            : null
                        }
                        
                        { isAuthenticated
                            ?   <li className='nav-item'>
                                    <NavLink to='/accessrequests' className='nav-link text-white' onClick={ toggleShowSidebar }><i className='bi-card-list' />  Access Requests</NavLink>
                                </li>
                            : null
                        }
                        
                        { isAuthenticated
                            ?   <div className='mx-2'>
                                    <hr />
                                </div>
                            : null
                        }

                        { isAuthenticated
                            ?   <li className='nav-item'>
                                    <NavLink to='/profile' className='nav-link text-white' onClick={ toggleShowSidebar }><i className='bi-person' />  Profile</NavLink>
                                </li>
                            : null
                        }
                        { isAuthenticated
                            ?   <li className='nav-item'>
                                    <NavLink to='/logout' className='nav-link text-white' onClick={ toggleShowSidebar }><i className='bi-person-x' />  Logout</NavLink>
                                </li>
                            : null
                        }
                        { !isAuthenticated
                            ?   <li className='nav-item'>
                                    <NavLink to='/login' className='nav-link text-white' onClick={ toggleShowSidebar }><i className='bi-person-check' />  Login</NavLink>
                                </li>
                            :   null
                        }

                        {/* admin */}
                        { isAuthenticated && isAdministrator
                            ?   <div className='mx-2'>
                                    <hr />
                                </div>
                            : null
                        }
                        { isAuthenticated && isAdministrator
                            ?   <li className='nav-item'>
                                    <NavLink to='/users' className='nav-link text-white' onClick={ toggleShowSidebar }><i className='bi-people' />  Users</NavLink>
                                </li>
                            : null
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;