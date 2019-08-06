import React from 'react';
import { Link } from 'react-router-dom';

import { LanguageContext, languages } from './languagesContext/LanguageContext';

// Constants
import { MENU } from '../../constants/constants';

class Footer extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		let language = activeLanguage === languages.bg ? '' : '/' + activeLanguage;

		return (
			<footer>

				<p> &copy; 2019 Addict. All rights reserved. </p>

				<section id='social-media'>
					<Link to='#'>
						<i className="fa fa-facebook-official" aria-hidden="true"/>
					</Link>

					<Link to='#'>
						<i className="fa fa-instagram" aria-hidden="true"/>
					</Link>
				</section>

				<nav id="footer-nav">
					<Link to={language + '/contact'}
					      className="nav-link">{MENU[activeLanguage].contact}
					</Link>
				</nav>

			</footer>
		);
	}
}

Footer.contextType = LanguageContext;

export default Footer;
