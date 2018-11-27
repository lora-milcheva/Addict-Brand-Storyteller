import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Header extends React.Component {

	constructor (props) {
		super(props);
	}


	render () {

		return (
			<nav id="main-nav">

				<NavLink to="/home" className="nav-link" activeClassName='active'>Home</NavLink>

				<NavLink to="/projects" className="nav-link" activeClassName='active'>Projects</NavLink>

				<NavLink to="/admin/project-create" className="nav-link" activeClassName='active'>Create Project</NavLink>

				<NavLink to="/login" className="nav-link" activeClassName='active'>Login</NavLink>

			</nav>
		);
	}
}

export default Header;
