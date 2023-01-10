import React from 'react';
import NavigationItem from './navigationItem';
import DropdownNavigationItem from './dropdownNavigationItem';

const navigationItems = (props) => (
	
		<nav>
			<ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
				{/* <NavigationItem link='/'>Home</NavigationItem> */}
				<NavigationItem link='/' icon='bi-house-door'>Home</NavigationItem>
				{ props.isAuthenticated
					?	<div  className='dropdown text-end'>
							<a href='/' className='nav-link text-white dropdown-toggle' id='dropdownUser2' data-bs-toggle='dropdown' aria-expanded='false'>
								<i className='bi-card-list fs-3 d-block text-sm-center'></i>
								Access Requests
							</a>
							<ul className='dropdown-menu text-small' aria-labelledby='dropdownUser2'>
								{props.isUser
									? <DropdownNavigationItem link='/accessrequests' icon='bi-card-list'> Your Access Requests</DropdownNavigationItem>
									: null
								}
								{props.isPlanner
									? <DropdownNavigationItem link='/planneraccessrequests' icon='bi-check2-square'> Access Requests for Review</DropdownNavigationItem>
									: null
								}
								{props.isPlanner
									? <DropdownNavigationItem link='/plannerclosedaccessrequests' icon='bi-check-square'> Access Requests for Closing</DropdownNavigationItem>
									: null
								}
								{props.isDisruptionAuthority
									? <DropdownNavigationItem link='/disruptiveaccessrequests' icon='bi-cone-striped'> Diruptives for Review</DropdownNavigationItem>
									: null
								}
							</ul>
						</div>
					: 	null
				}

				<div  className='dropdown text-end'>
					<a href='/' className='nav-link text-white dropdown-toggle' id='dropdownUser1' data-bs-toggle='dropdown' aria-expanded='false'>
						<i className='bi-person fs-3 d-block text-sm-center'></i>
						Profile
					</a>
					<ul className='dropdown-menu text-small' aria-labelledby='dropdownUser1'>
						{ props.isAuthenticated
							? <DropdownNavigationItem link='/account' icon='bi-person'> Account</DropdownNavigationItem>
							: null
						}
						{ props.isAuthenticated && props.isAdministrator
							? <DropdownNavigationItem link='/users' icon='bi-people'> Users</DropdownNavigationItem>
							: null
						}
						{ props.isAuthenticated
							? <li><hr className='dropdown-divider'/></li>
							: null
						}
						{ props.isAuthenticated
							? null
							: <DropdownNavigationItem link='/login' icon='bi-person-check'> Login</DropdownNavigationItem>
						}
						{ props.isAuthenticated
							? <DropdownNavigationItem link='/logout' icon='bi-person-x'> Logout</DropdownNavigationItem>
							: null
						}
						{ props.isAuthenticated
							? null
							: <DropdownNavigationItem link='/signup' icon='bi-person-plus'> Sign-up</DropdownNavigationItem>
						}
					</ul>
				</div>
			</ul>
		</nav>
);

export default navigationItems;
