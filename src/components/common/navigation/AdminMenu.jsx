import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Constants
import { MENU } from '../../../constants/constants';


class AdminMenu extends React.Component {

	render () {

		let activeLanguage = this.props.activeLanguage;

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


				<span className='username'>
					Потребител<span className='name'> {sessionStorage.getItem('username')}</span>
				</span>

				<NavLink exact to='/'
				         className="nav-link logout"
				         activeClassName='active'
				         onClick={this.props.logout}>{MENU[activeLanguage].logout}</NavLink>

			</div>

		);
	}
}

export default AdminMenu;

AdminMenu.propTypes = {
	activeLanguage: PropTypes.string,
	logout: PropTypes.func,
};
