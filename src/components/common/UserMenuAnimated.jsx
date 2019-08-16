import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { NavLink } from 'react-router-dom';

// Constants
import { MENU } from '../../constants/constants';

const Sidebar = posed.ul({
	open: {
		right: '0%',
		delayChildren: 200,
		staggerChildren: 70
	},
	closed: {right: '-100%', delay: 500}
});

const Item = posed.li({
	open: {y: 0, opacity: 1},
	closed: {y: 20, opacity: 0}
});

class UserMenuAnimated extends React.Component {

	render () {

		let activeLanguage = this.props.activeLanguage;

		let language = this.props.language;

		let isOpen = this.props.isOpen;

		return (

			<Sidebar className="sidebar" pose={isOpen ? 'open' : 'closed'} onClick={this.props.toggleNav}>
				<Item className="item">
					<NavLink exact
					         to={language + '/'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].home}</NavLink>
				</Item>

				<Item className="item">
					<NavLink exact
					         to={language + '/projects'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].projects}</NavLink>
				</Item>

				<Item className="item">
					<NavLink exact
					         to={language + '/services'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].services}</NavLink>

				</Item>

				<Item className="item">
					<NavLink exact
					         to={language + '/about-us'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].aboutUs}</NavLink>
				</Item>

				<Item className="item">
					<NavLink exact
					         to={language + '/careers'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].careers}</NavLink>
				</Item>

				<Item className="item">
					<NavLink exact
					         to={language + '/contact'}
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].contact}</NavLink>
				</Item>

				<Item className="item">
					<NavLink exact
					         to="/login"
					         className="nav-link"
					         activeClassName='active'>{MENU[activeLanguage].login}</NavLink>
				</Item>

			</Sidebar>

		);
	}
}

export default UserMenuAnimated;

UserMenuAnimated.propTypes = {
	activeLanguage: PropTypes.string,
	language: PropTypes.string,
	isOpen: PropTypes.bool,
	toggleNav: PropTypes.func
};
