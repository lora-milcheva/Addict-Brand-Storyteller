import React from 'react';
import { Link } from 'react-router-dom';

import { LanguageContext, languages } from './languagesContext/LanguageContext';

// Constants
import { MENU, FOOTER } from '../../constants/constants';

class Footer extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		let language = activeLanguage === languages.bg ? '' : '/' + activeLanguage;

		return (
			<footer>

				<p id='copy'> &copy; {FOOTER[activeLanguage]}</p>

				<section id='social-media'>
					<a href='https://www.facebook.com/ADDICT-Brand-Storyteller-110330240309410/'
					   aria-label={'Visit our Facebook page'}
					   target='_blank' rel='noopener noreferrer'>
						<i className="fa fa-facebook-official" aria-hidden="true"/>
					</a>

					<a href='https://www.instagram.com/addict_brand_storyteller/'
					   aria-label={'Visit our Instagram page'}
					   target='_blank' rel='noopener noreferrer'>
						<i className="fa fa-instagram" aria-hidden="true"/>
					</a>
				</section>

				<nav id="footer-nav">
					<Link to={language + '/contact'}
					      aria-label={MENU[activeLanguage].contact}
					      className="nav-link">{MENU[activeLanguage].contact}
					</Link>
				</nav>

			</footer>
		);
	}
}

Footer.contextType = LanguageContext;

export default Footer;
