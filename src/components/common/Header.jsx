import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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
			activeLanguage: LANGUAGES.bg
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

	getLanguage = () => {

		let pathArray = this.props.location.pathname.split('/').filter(e => e !== '');

		if (pathArray[0] === LANGUAGES.en) {
			this.setState({activeLanguage: LANGUAGES.en })
		} else {
			this.setState({activeLanguage: LANGUAGES.bg })
		}
	};


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

	changeLanguage = () => {
		if (this.state.activeLanguage === LANGUAGES.bg) {
			this.setState({activeLanguage: LANGUAGES.en}, () => {
				this.redirect();
			});
		} else {
			this.setState({activeLanguage: LANGUAGES.bg}, () => {
				this.redirect();
			});
		}
	};

	redirect = () => {

		let pathArray = this.props.location.pathname.split('/').filter(e => e !== '');

		let activeLanguage = this.state.activeLanguage;

		if (activeLanguage === LANGUAGES.bg) { let removed = pathArray.splice(0, 1); }

		let newPath = '';
		pathArray.forEach(e => newPath += '/' + e);

		if (activeLanguage === LANGUAGES.bg) {
			this.props.history.push(newPath);
		} else {
			this.props.history.push('/' + this.state.activeLanguage + newPath);
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
		let buttonText = this.state.activeLanguage === LANGUAGES.bg ? LANGUAGES.en : LANGUAGES.bg;

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
		if (this.state.activeLanguage === LANGUAGES.bg) {
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
					        onClick={this.changeLanguage}>{buttonText}</button>
				</nav>
			</div>
		);
	}
}

export default withRouter(Header);
