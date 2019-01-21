import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

// Services
import authService from '../../services/auth/authService';
import categoriesService from '../../services/categories/categoriesService';

// Constants
import { MENU } from '../../constants/constants';

import { LanguageContext, languages } from './languagesContext/LanguageContext';

class Header extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			categories: []
		};
	}

	componentDidMount () {
		if (sessionStorage.length === 0) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.getLanguage();
					this.loadCategories();
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			this.getLanguage();
			this.loadCategories();
		}
	}

	componentWillReceiveProps (nextProps) {

		let pathArray = this.props.location.pathname.split('/').filter(e => e !== '');
		let newPathArray = nextProps.location.pathname.split('/').filter(e => e !== '');

		if (pathArray[0] !== newPathArray[0]) {
			this.props = nextProps;
			this.getLanguage();
		}
	}

	loadCategories = () => {
		categoriesService
			.loadAllCategories()
			.then(res => {
				this.setState({categories: res});
			})
			.catch(err => {
				console.log(err);
			});
	};

	getLanguage = () => {

		let pathArray = this.props.location.pathname.split('/').filter(e => e !== '');

		if (pathArray[0] === languages.en) {
			this.context.updateLanguage(languages.en)
		} else {
			this.context.updateLanguage(languages.bg)
		}
	};

	changeLanguage = (e) => {

		let pathArray = this.props.location.pathname.split('/').filter(e => e !== '');

		let activeLanguage = this.context.language;

		if (activeLanguage === languages.en) { let removed = pathArray.splice(0, 1); }

		let newPath = '';
		pathArray.forEach(e => newPath += '/' + e);

		if (activeLanguage === languages.en) {
			this.props.history.push(newPath);

		} else {

			this.props.history.push('/' + languages.en + newPath);
		}

		this.context.updateLanguage(e.target.value);
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
		let lang = this.context.language;

		if (admin) {
			return (
				<div id="header">

					{/*<Link to="/home" id="brand"/>*/}

					<nav id="main-nav">

						<NavLink to='/admin/projects-list'
						         className="nav-link"
						         activeClassName='active'>{MENU[lang].projects}</NavLink>

						<NavLink to='/admin/category-list'
						         className="nav-link"
						         activeClassName='active'>{MENU[lang].categories}</NavLink>

						<NavLink to='/admin/clients-list'
						         className="nav-link"
						         activeClassName='active'>{MENU[lang].clients}</NavLink>

						<NavLink exact to='/'
						         className="nav-link"
						         activeClassName='active'
						         onClick={this.logout}>{MENU[lang].logout}</NavLink>

					</nav>
				</div>
			);
		}

		let link = '';
		if (lang === languages.bg) {
			link = '/projects/';
		} else {
			link = '/' + lang + '/projects/';
		}

		let categories = this.state.categories.map(e => {

			return (
				<NavLink key={e._id}
				         to={link + e.name.en}
				         className="nav-link"
				         activeClassName='active'>{e.name[lang]}</NavLink>
			);
		});

		return (
			<div id="header">

				<Link to="/" id="brand"/>

				<nav id="main-nav">

					<NavLink
						to={link}
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
					        value={lang}
					        onClick={this.changeLanguage}>{lang === languages.bg ? languages.en : languages.bg}</button>
				</nav>
			</div>
		);
	}
}

Header.contextType = LanguageContext;

export default withRouter(Header);
