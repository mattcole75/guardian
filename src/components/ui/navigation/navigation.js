import React from 'react';
import NavigationItem from './navigationItem/navigationItem';
import NavigationMenuItem from './navigationMenuItem/navigationMenuItem';

const Navigation = (props) => {

    const { isAuthenticated, isSpeedRestrictor, isAdministrator } = props;

    return (
        <nav>
            <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
				{/* home */}
                <NavigationItem link='/' icon='bi-house-door'>Home</NavigationItem>
				
				{/* Access request */}
				{ isAuthenticated
					? 	<NavigationItem link='/accessrequests' icon='bi-calendar2-week'>Access Requests</NavigationItem>
					:	null
				}

				{/* Speed Restrictions */}
				{ isSpeedRestrictor
					?	<NavigationItem link='/speedrestrictions' icon='bi-speedometer2'>Speed Restrictions</NavigationItem>
					:	null
				}
				
				{/* Admin */}
				{ isAuthenticated && isAdministrator
					?	<div className='dropdown text-end'>
							<a href='/' className='nav-link text-secondary dropdown-toggle' id='dropdownAdmin1' data-bs-toggle='dropdown' aria-expanded='false'>
								<i className='bi-gear-wide fs-3 d-block text-sm-center'></i>
								Admin
							</a>
							<ul className='dropdown-menu text-small' aria-labelledby='dropdownAdmin1'>
								<NavigationMenuItem link='/users' icon='bi-people'> Users</NavigationMenuItem>
							</ul>
						</div>
					:	null
				}
				
				{/* auth */}
                <div  className='dropdown text-end'>
					<a href='/' className='nav-link text-secondary dropdown-toggle' id='dropdownProfile1' data-bs-toggle='dropdown' aria-expanded='false'>
						<i className='bi-person fs-3 d-block text-sm-center'></i>
						My Account
					</a>
					<ul className='dropdown-menu text-small' aria-labelledby='dropdownProfile1'>
						{ isAuthenticated
							?	<NavigationMenuItem link='/profile' icon='bi-person'> Profile</NavigationMenuItem>
							:	null
						}
						{ isAuthenticated
							?	<li><hr className='dropdown-divider'/></li>
							:	null
						}						
                        { !isAuthenticated
							?	<NavigationMenuItem link='/login' icon='bi-person-check'> Login</NavigationMenuItem>
							:	null
						}
						{ isAuthenticated
							?   <NavigationMenuItem link='/logout' icon='bi-person-x'> Logout</NavigationMenuItem>
							:   null
						}						
					</ul>
				</div>
            </ul>
        </nav>
    )
}

export default Navigation;