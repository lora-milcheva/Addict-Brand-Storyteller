import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Header extends React.Component {

	constructor (props) {
		super(props);
	}


	render () {

		return (
			<nav className="navbar navbar-default navbar-fixed-top" id="main-menu">

				Main Nav
				<Link to="/home">Home</Link>

			</nav>
		);
	}
}

export default Header;
