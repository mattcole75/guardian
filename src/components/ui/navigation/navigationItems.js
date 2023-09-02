import React from 'react';
import NavigationItem from './navigationItem';
import DropdownNavigationItem from './dropdownNavigationItem';

const navigationItems = (props) => {

	const { isAuthenticated, isUser, isPlanner, isDisruptionAuthority, isAdministrator } = props;

	return (
		<nav>
			<ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
				{/* <NavigationItem link='/'>Home</NavigationItem> */}
				<NavigationItem link='/' icon='bi-house-door'>Home</NavigationItem>
				{ isAuthenticated
					?	<div  className='dropdown text-end'>
							<a href='/' className='nav-link text-white dropdown-toggle' id='dropdownUser2' data-bs-toggle='dropdown' aria-expanded='false'>
								<i className='bi-card-list fs-3 d-block text-sm-center'></i>
								Access Requests
							</a>
							<ul className='dropdown-menu text-small' aria-labelledby='dropdownUser2'>
								{ isUser
									? <DropdownNavigationItem link='/accessrequests' icon='bi-card-list'> Your Access Requests</DropdownNavigationItem>
									: null
								}
								{ isPlanner
									? <DropdownNavigationItem link='/planneraccessrequests' icon='bi-check2-square'> Access Requests for Review</DropdownNavigationItem>
									: null
								}
								{ isPlanner
									? <DropdownNavigationItem link='/plannerclosedaccessrequests' icon='bi-check-square'> Access Requests for Closing</DropdownNavigationItem>
									: null
								}
								{ isDisruptionAuthority
									? <DropdownNavigationItem link='/disruptiveaccessrequests' icon='bi-cone-striped'> Diruptives for Review</DropdownNavigationItem>
									: null
								}
							</ul>
						</div>
					: 	null
				}
				{ isAuthenticated
					?	<div  className='dropdown text-end'>
							<a href='/' className='nav-link text-white dropdown-toggle' id='dropdownUser1' data-bs-toggle='dropdown' aria-expanded='false'>
								<i className='bi-person fs-3 d-block text-sm-center'></i>
								My Account
							</a>
							<ul className='dropdown-menu text-small' aria-labelledby='dropdownUser1'>
								{ isAuthenticated
									? <DropdownNavigationItem link='/profile' icon='bi-person'> Profile</DropdownNavigationItem>
									: null
								}
								{ isAuthenticated && isAdministrator
									? <DropdownNavigationItem link='/users' icon='bi-people'> Users</DropdownNavigationItem>
									: null
								}
								{ isAuthenticated
									? <li><hr className='dropdown-divider'/></li>
									: null
								}
								{ isAuthenticated
									? null
									: <DropdownNavigationItem link='/login' icon='bi-person-check'> Login</DropdownNavigationItem>
								}
								{ isAuthenticated
									? <DropdownNavigationItem link='/logout' icon='bi-person-x'> Logout</DropdownNavigationItem>
									: null
								}
							</ul>
						</div>
					:	<NavigationItem link='/login' icon='bi-person-check'>Login</NavigationItem>
				}

				
			</ul>
		</nav>
	)
};

export default navigationItems;
