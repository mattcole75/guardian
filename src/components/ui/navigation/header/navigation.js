import React from 'react';
import NavigationItem from '../navigationItem/navigationItem';
import NavigationListItem from '../navigationListItem/navigationListItem';

const Navigation = (props) => {

    const { isAuthenticated, roles } = props;
	const isAdministrator = roles.includes('administrator', 0);

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
				
				{/* auth */}
                <div  className='dropdown text-end'>
					<a href='/' className='nav-link text-secondary dropdown-toggle' id='dropdownProfile1' data-bs-toggle='dropdown' aria-expanded='false'>
						<i className='bi-person fs-3 d-block text-sm-center'></i>
						My Account
					</a>
					<ul className='dropdown-menu text-small' aria-labelledby='dropdownProfile1'>
						{ isAuthenticated
							?	<NavigationListItem link='/profile' icon='bi-person'> Profile</NavigationListItem>
							:	null
						}
						{ isAuthenticated && isAdministrator
							?	<li><hr className='dropdown-divider'/></li>
							:	null
						}
						{ isAuthenticated && isAdministrator
							?	<NavigationListItem link='/users' icon='bi-people'> Users</NavigationListItem>
							:	null
						}
						{ isAuthenticated
							?	<li><hr className='dropdown-divider'/></li>
							:	null
						}						
                        { !isAuthenticated
							?	<NavigationListItem link='/login' icon='bi-person-check'> Login</NavigationListItem>
							:	null
						}
						{ isAuthenticated
							?   <NavigationListItem link='/logout' icon='bi-person-x'> Logout</NavigationListItem>
							:   null
						}						
					</ul>
				</div>
            </ul>
        </nav>
    )
}

export default Navigation;