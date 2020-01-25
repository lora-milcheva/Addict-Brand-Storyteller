import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Constants
import { MENU } from '../../../constants/constants';


class AdminMenu extends React.Component {

	render () {

		let activeLanguage = this.props.activeLanguage;

		let style = this.props.isOpen ? 'visible' : '';

		return (

				<nav id="admin-main-nav" className={style} onClick={this.props.toggleNav}>

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

		);
	}
}

export default AdminMenu;

AdminMenu.propTypes = {
	activeLanguage: PropTypes.string,
	toggleNav: PropTypes.func,
	isOpen: PropTypes.bool
};
