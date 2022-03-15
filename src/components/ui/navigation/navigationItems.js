import React from 'react';
import NavigationItem from './navigationItem';

const navigationItems = (props) => (
	
		<nav className="">
			<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
				<NavigationItem link='/'>Home</NavigationItem>
				{props.isAuthenticated
					? <NavigationItem link='/requests'>Requests</NavigationItem>
					: null}
				<NavigationItem link='/pricing'>Pricing</NavigationItem>
				<NavigationItem link='/faq'>FAQs</NavigationItem>
			</ul>
		</nav>
);

export default navigationItems;
