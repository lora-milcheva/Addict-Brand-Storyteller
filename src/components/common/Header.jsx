import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { LanguageContext, languages } from './languagesContext/LanguageContext';

// Partials
import UserMenuAnimated from './navigation/UserMenuAnimated';
import UserMenu from './navigation/UserMenu';
import AdminMenu from './navigation/AdminMenu';

// Services
import authService from '../../services/auth/authService';




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

		if (toggleBtn.classList.contains('clicked')) {
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

		if (admin) return <AdminMenu activeLanguage={activeLanguage} logout={this.logout}/>;

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

		let language = activeLanguage === languages.bg ? '' : '/' + activeLanguage;

		return (
			<header>

				<div id="header">

					<Link to="/" id="brand"/>

					<button id="lang-btn" className="btn sm"
					        value={activeLanguage}
					        onClick={this.changeRouteByLanguage}>{activeLanguage === languages.bg ? languages.en : languages.bg}
					</button>

					{toggleBtn}
				</div>


				{/*<UserMenuAnimated activeLanguage={activeLanguage}*/}
				{/*                  language={language}*/}
				{/*                  isOpen={this.state.isOpen}*/}
				{/*                  toggleNav={this.toggleNav}/>*/}

				<UserMenu activeLanguage={activeLanguage}
				          language={language}
				          toggleNav={this.toggleNav}
				          isOpen={this.state.isOpen}/>

			</header>
		);
	}
}

// To fix mistake index.js:1452 Warning: withRouter(Header): Function components do not support contextType.
const Header = withRouter(HeaderC);
Header.WrappedComponent.contextType = LanguageContext;
export default Header;

