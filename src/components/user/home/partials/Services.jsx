import React from 'react';
import { Link } from 'react-router-dom';

import { BUTTONS, USER_PAGES_TEXT } from '../../../../constants/constants';


class Services extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="home-services" className="container section-padding-top-bottom">

				<h4 className='section-name'>{USER_PAGES_TEXT.home[activeLanguage].sections.services.name}</h4>

				<h2 className="section-title">{USER_PAGES_TEXT.home[activeLanguage].sections.services.title}</h2>
				<p className='section-text'>
					{USER_PAGES_TEXT.home[activeLanguage].sections.services.text}
				</p>

				<Link className='btn btn-default' to='/services'>{BUTTONS[activeLanguage].readMore}</Link>

			</section>
		);
	}
}

export default Services;