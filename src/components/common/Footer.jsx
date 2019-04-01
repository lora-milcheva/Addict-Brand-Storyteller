import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { LanguageContext, languages } from './languagesContext/LanguageContext';

// Constants
import { MENU } from '../../constants/constants';

class Footer extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {

		let lang = this.context.language;

		let link = lang === languages.bg ? '/projects/' : '/' + lang + '/projects/';

		return (
			<footer>

				<nav id="footer-nav">
					<NavLink
						to={link}
						className="nav-link"
						activeClassName='active'>{MENU[lang].projects}
					</NavLink>

					<NavLink to="/contact"
					         className="nav-link"
					         activeClassName='active'>{MENU[lang].contact}
					</NavLink>
				</nav>

				<section>
					<p> &copy; 2019 Addict. All rights reserved. </p>
				</section>
			</footer>
		);
	}
}

Footer.contextType = LanguageContext;

export default Footer;
