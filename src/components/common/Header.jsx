import React from 'react';
import posed from 'react-pose';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { LanguageContext, languages } from './languagesContext/LanguageContext';

// Services
import authService from '../../services/auth/authService';

// Constants
import { MENU } from '../../constants/constants';


class HeaderC extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			categories: []
		};

		this.toggleMenuBtn = React.createRef();
		this.mainNav = React.createRef();
	}

	componentDidMount () {

		if (sessionStorage.length === 0) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.getLanguage();
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			this.getLanguage();
		}
	}


	getLanguage = () => {

		let pathArray = this.props.location.pathname.split('/').filter(e => e !== '');

		if (pathArray[0] === languages.en) {
			this.context.updateLanguage(languages.en);
		} else {
			this.context.updateLanguage(languages.bg);
		}
	};

	changeRouteByLanguage = (e) => {

		let pathArray = this.props.location.pathname;

		let activeLanguage = this.context.language;

		if (activeLanguage === languages.en) {
			let subStr = pathArray.substring(3);
			this.context.updateLanguage(languages.bg);
			this.props.history.push(subStr);
		} else {
			this.context.updateLanguage(languages.en);
			this.props.history.push('/' + languages.en + pathArray);
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

	toggleMenu = () => {

		let mainNav = this.mainNav.current;
		let toggleBtn = this.toggleMenuBtn.current;

		if (mainNav.classList.contains('visible')) {
			mainNav.classList.remove('visible');
			toggleBtn.classList.remove('clicked');
			return;
		}

		mainNav.classList.add('visible');
		toggleBtn.classList.add('clicked');
	};

	toggleNav = () => {

		let mainNav = this.mainNav.current;
		let toggleBtn = this.toggleMenuBtn.current;

		setTimeout(() => {
			mainNav.classList.remove('visible');
			toggleBtn.classList.remove('clicked');
		}, 500);

	};

	render () {

		let admin = sessionStorage.getItem('role') !== null;
		let activeLanguage = this.context.language;

		let toggleBtn = (
			<button id="toggle-menu-btn"
			        className="btn btn-default sm"
			        ref={this.toggleMenuBtn}
			        onClick={this.toggleMenu}>
				<span className="toggle"/>
				<span className="toggle"/>
				<span className="toggle"/>
			</button>
		);

		if (admin) {
			return (
				<div id="header">

					{/*<Link to="/home" id="brand"/>*/}
					{toggleBtn}

					<nav id="main-nav" ref={this.mainNav} onClick={this.toggleNav}>


						<NavLink to='/admin/projects-list'
						         className="nav-link"
						         activeClassName='active'>{MENU[activeLanguage].projects}</NavLink>

						<NavLink to='/admin/category-list'
						         className="nav-link"
						         activeClassName='active'>{MENU[activeLanguage].categories}</NavLink>

						<NavLink to='/admin/clients-list'
						         className="nav-link"
						         activeClassName='active'>{MENU[activeLanguage].clients}</NavLink>

						<NavLink to='/admin/sections-list'
						         className="nav-link"
						         activeClassName='active'>{MENU[activeLanguage].sections}</NavLink>

						<NavLink exact to='/'
						         className="nav-link"
						         activeClassName='active'
						         onClick={this.logout}>{MENU[activeLanguage].logout}</NavLink>

					</nav>

					<span>Logged in as: {sessionStorage.getItem('username')}</span>
				</div>
			);
		}


		let language = activeLanguage === languages.bg ? '' : '/' + activeLanguage;

		return (
			<header >

				<div id="header">
					<button id="lang-btn" className="btn btn-default sm"
					        value={activeLanguage}
					        onClick={this.changeRouteByLanguage}>{activeLanguage === languages.bg ? languages.en : languages.bg}
					</button>

					<Link to="/" id="brand" onClick={this.toggleNav}/>

					{toggleBtn}
				</div>


				<nav id="main-nav" ref={this.mainNav} onClick={this.toggleNav}>

					<NavLink exact
					         to={language + '/'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].home}</NavLink>


					<NavLink exact
					         to={language + '/about-us'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].aboutUs}</NavLink>

					<NavLink
						to={language + '/projects'}
						className="nav-link"
						activeClassName='active'>{MENU[activeLanguage].projects}</NavLink>

					<NavLink exact
					         to={language + '/services'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].services}</NavLink>

					<NavLink exact
					         to="/careers"
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].careers}</NavLink>

					<NavLink exact
					         to={language + '/contact'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].contact}</NavLink>

					<NavLink exact
					         to="/login"
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].login}</NavLink>

				</nav>

			</header>
		);
	}
}

// To fix mistake index.js:1452 Warning: withRouter(Header): Function components do not support contextType.
const Header = withRouter(HeaderC);
Header.WrappedComponent.contextType = LanguageContext;
export default Header;

// Header.contextType = LanguageContext;
//
// export default withRouter(Header);
