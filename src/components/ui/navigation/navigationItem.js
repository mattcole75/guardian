import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
	
	<li className="">
		<NavLink
            className={isActive => "nav-link px-2 " + (!isActive ? "text-white" : "text-keolis")}
			to={props.link}>
			{props.children}
		</NavLink>
	</li>
);

export default navigationItem;
