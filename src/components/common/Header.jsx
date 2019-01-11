import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// Services
import authService from '../../services/auth/authService';
import categoriesService from '../../services/categories/categoriesService';

// Constants
import { MENU } from '../../constants/constants';

class Header extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			categories: [],
		};
	}

	componentDidMount () {
		categoriesService
			.loadAllCategories()
			.then(res => {
				this.setState({categories: res});
			})
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
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

						<NavLink to='/admin/projects-list'
						         className="nav-link"
						         activeClassName='active'>{MENU.BG.projects}</NavLink>

						<NavLink to='/admin/category-list'
						         className="nav-link"
						         activeClassName='active'>{MENU.BG.categories}</NavLink>

						<NavLink to='/admin/clients-list'
						         className="nav-link"
						         activeClassName='active'>{MENU.BG.clients}</NavLink>

						<NavLink exact to='/'
						         className="nav-link"
						         activeClassName='active'
						         onClick={this.logout}>{MENU.BG.logout}</NavLink>

					</nav>
				</div>
			);
		}

		let categories = this.state.categories.map(e => {
			return (
				<NavLink key={e._id}
				         to={'/projects/' + e.name.EN}
				         className="nav-link"
				         activeClassName='active'>{e.name.BG}</NavLink>
			);
		});

		return (
			<div id="header">

				<Link to="/" id="brand"/>

				<nav id="main-nav">

					<NavLink
					         to="/projects"
					         className="nav-link"
					         activeClassName='active'>{MENU.BG.projects}</NavLink>

					{categories}

					<NavLink exact
					         to="/"
					         className="nav-link"
					         activeClassName='active'>{MENU.BG.contact}</NavLink>

				</nav>
			</div>
		);
	}
}

export default Header;
