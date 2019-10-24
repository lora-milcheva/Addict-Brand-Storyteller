import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Constants
import { MENU } from '../../../constants/constants';


class UserMenu extends React.Component {

	render () {

		let activeLanguage = this.props.activeLanguage;

		let language = this.props.language;

		let style = this.props.isOpen ? 'visible' : '';

		return (

			<nav id="main-nav" ref={this.mainNav} className={style} onClick={this.props.toggleNav}>

				<NavLink exact
				         to={language + '/'}
				         className="nav-link"
				         activeClassName='active'>{MENU[activeLanguage].home}</NavLink>

				<NavLink
					to={language + '/projects'}
					className="nav-link"
					activeClassName='active'>{MENU[activeLanguage].projects}</NavLink>

				<NavLink exact
				         to={language + '/services'}
				         className="nav-link"
				         activeClassName='active'>{MENU[activeLanguage].services}</NavLink>

				<NavLink exact
				         to={language + '/about-us'}
				         className="nav-link"
				         activeClassName='active'>{MENU[activeLanguage].aboutUs}</NavLink>

				<NavLink exact
				         to={language + '/careers'} className="nav-link"
				         activeClassName='active'>{MENU[activeLanguage].careers}</NavLink>

				<NavLink exact
				         to={language + '/contact'}
				         className="nav-link"
				         activeClassName='active'>{MENU[activeLanguage].contact}</NavLink>

				{/*<NavLink exact*/}
				{/*         to="/login"*/}
				{/*         className="nav-link"*/}
				{/*         activeClassName='active'>{MENU[activeLanguage].login}</NavLink>*/}

			</nav>

		);
	}
}

export default UserMenu;

UserMenu.propTypes = {
	activeLanguage: PropTypes.string,
	language: PropTypes.string,
	toggleNav: PropTypes.func,
	isOpen: PropTypes.bool
};
