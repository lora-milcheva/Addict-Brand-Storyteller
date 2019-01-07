import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// Services
import authService from '../../services/auth/authService';

class Header extends React.Component {

	constructor (props) {
		super(props);
	}

	logout = () => {
		authService
			.logout()
			.then(res => {
				authService.clearSession();
				window.location.reload();
			})
			.catch(err => console.log(err));
	};

	render () {

		let admin = sessionStorage.getItem('role') !== null;

		if (admin) {

			return (
				<div id="header">

					{/*<Link to="/home" id="brand"/>*/}

					<nav id="main-nav">
						<NavLink to='/admin/projects-list' className="nav-link" activeClassName='active'>All
							Projects</NavLink>
						<NavLink to='/admin/category-list' className="nav-link" activeClassName='active'>All
							Categories</NavLink>
						<NavLink to='/admin/clients-list' className="nav-link" activeClassName='active'>All
							Clients</NavLink>

						<NavLink to='/home' className="nav-link" activeClassName='active'
						         onClick={this.logout}>Logout</NavLink>

					</nav>
				</div>
			);
		}

		return (
			<div id="header">

				<Link to="/home" id="brand"/>

				<nav id="main-nav">
					{/*<NavLink to="/home" className="nav-link" activeClassName='active'>Home</NavLink>*/}

					<NavLink to="/projects" className="nav-link" activeClassName='active'>Projects</NavLink>

					{/*<NavLink to="/login" className="nav-link" activeClassName='active'>Login</NavLink>*/}

				</nav>
			</div>
		);
	}
}

export default Header;
