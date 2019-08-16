import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { LanguageContext, languages } from './languagesContext/LanguageContext';

// Partials
import UserMenuAnimated from './UserMenuAnimated';
import UserMenu from './navigation/UserMenu';

// Services
import authService from '../../services/auth/authService';

// Constants
import { MENU } from '../../constants/constants';

class HeaderC extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			isOpen: false
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


	toggleNav = () => {
		let toggleBtn = this.toggleMenuBtn.current;

		this.test();

		if (toggleBtn.classList.contains('clicked')){
			toggleBtn.classList.remove('clicked');
			return;
		}

		toggleBtn.classList.add('clicked');
	};

	test = () => {
		this.setState({isOpen: !this.state.isOpen});
	};

	render () {

		let admin = sessionStorage.getItem('role') !== null;
		let activeLanguage = this.context.language;

		let toggleBtn = (
			<button id="toggle-menu-btn"
			        className="btn sm"
			        ref={this.toggleMenuBtn}
			        onClick={this.toggleNav}>
				<span className="toggle"/>
				<span className="toggle"/>
				<span className="toggle"/>
			</button>
		);

		if (admin) {
			return (
				<div id="admin-header">

					<nav id="admin-main-nav">

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
					</nav>


					<span className='username'>Потребител<span
						className='name'> {sessionStorage.getItem('username')}</span></span>
					<NavLink exact to='/'
					         className="nav-link logout"
					         activeClassName='active'
					         onClick={this.logout}>{MENU[activeLanguage].logout}</NavLink>

				</div>
			);
		}

		let language = activeLanguage === languages.bg ? '' : '/' + activeLanguage;

		return (
			<header>

				<div id="header">

					<Link to="/" id="brand" />

					<button id="lang-btn" className="btn sm"
					        value={activeLanguage}
					        onClick={this.changeRouteByLanguage}>{activeLanguage === languages.bg ? languages.en : languages.bg}
					</button>

					{toggleBtn}
				</div>


				<UserMenuAnimated activeLanguage={activeLanguage}
				      language={language}
				      isOpen={this.state.isOpen}
				      toggleNav={this.toggleNav}/>

				{/*<UserMenu activeLanguage={activeLanguage}*/}
				{/*          language={language}*/}
				{/*          toggleNav={this.toggleNav}*/}
				{/*          isOpen={this.state.isOpen}/>*/}

			</header>
		);
	}
}

// To fix mistake index.js:1452 Warning: withRouter(Header): Function components do not support contextType.
const Header = withRouter(HeaderC);
Header.WrappedComponent.contextType = LanguageContext;
export default Header;

