import React from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import {withRouter} from 'react-router'

// Services
import authService from '../../services/auth/authService';
import categoriesService from '../../services/categories/categoriesService';

// Constants
import { MENU, LANGUAGES } from '../../constants/constants';

class Header extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			categories: [],
			activeLanguage: LANGUAGES.BG
		};
	}

	componentDidMount () {

		categoriesService
			.loadAllCategories()
			.then(res => {
				this.setState({categories: res});
			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	}

	changeLanguage = () => {
		if (this.state.activeLanguage === LANGUAGES.BG) {
			this.setState({activeLanguage: LANGUAGES.EN}, () => {
				document.documentElement.lang = this.state.activeLanguage;
				console.log(this.props.history.location)
				// this.props.history.location.push('')
			});
		} else {
			this.setState({activeLanguage: LANGUAGES.BG}, () => {
				document.documentElement.lang = this.state.activeLanguage;
				console.log(this.props.history.location)			});
		}
	};

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
		let lang = this.state.activeLanguage;
		let buttonText = this.state.activeLanguage === LANGUAGES.BG ? LANGUAGES.EN : LANGUAGES.BG;

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
						         activeClassName='active'>{MENU.lang.categories}</NavLink>

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
				         to={'/' + lang + '/projects/' + e.name.EN}
				         className="nav-link"
				         activeClassName='active'>{e.name[lang]}</NavLink>
			);
		});

		return (
			<div id="header">

				<Link to="/" id="brand"/>

				<nav id="main-nav">

					<NavLink
						to={'/' + lang + "/projects/"}
						className="nav-link"
						activeClassName='active'>{MENU[lang].projects}</NavLink>

					{categories}

					<NavLink exact
					         to="/"
					         className="nav-link"
					         activeClassName='active'>{MENU[lang].contact}</NavLink>

				</nav>

				<nav id="second-nav">
					<button className="btn btn-light sm"
					        onClick={this.changeLanguage}>{buttonText}</button>
				</nav>
			</div>
		);
	}
}

export default withRouter(Header);
