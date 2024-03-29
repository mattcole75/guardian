import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (

	<li>
		<NavLink 
			to={props.link}
			className={ ({isActive}) => isActive 
				? 'nav-link nav-active_colour' 
				: 'nav-link text-secondary' } end>
			<i className={ props.icon + ' fs-3 d-block text-sm-center' }/>
			{ props.children }
		</NavLink>
	</li>
);

export default navigationItem;