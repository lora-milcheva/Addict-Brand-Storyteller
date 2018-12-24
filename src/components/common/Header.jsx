import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

// Services
import authService from '../../services/auth/authService';

class Header extends React.Component {

	constructor (props) {
		super(props);
	}

	logout = () => {
		authService.clearSession();
		authService
			.logout()
			.then(res => {
				authService.loginAnonymousUser()
			})
			.catch(err => console.log(err));
	};

	render () {

		let admin = sessionStorage.getItem('role');


		if (admin && admin !== undefined) {

			return (
				<nav id="main-nav">

					<NavLink to='/admin/projects-list' className="nav-link" activeClassName='active'>All Projects</NavLink>
					<NavLink to='/admin/category-list' className="nav-link" activeClassName='active'>All Categories</NavLink>
					<NavLink to='/admin/clients-list' className="nav-link" activeClassName='active'>All Clients</NavLink>

					<NavLink to='/home' className="nav-link" activeClassName='active' onClick={this.logout}>Logout</NavLink>

				</nav>
			);
		}

		return (
			<nav id="main-nav">


				<NavLink to="/home" className="nav-link" activeClassName='active'>Home</NavLink>

				<NavLink to="/projects" className="nav-link" activeClassName='active'>Projects</NavLink>

				<NavLink to="/login" className="nav-link" activeClassName='active'>Login</NavLink>

			</nav>
		);
	}
}

export default Header;
