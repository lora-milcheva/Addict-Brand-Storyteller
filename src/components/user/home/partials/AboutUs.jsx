import React from 'react';
import { Link } from 'react-router-dom';

import { BUTTONS, USER_PAGES_TEXT } from '../../../../constants/constants';


class AboutUs extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="home-about-us" className="container section-padding-top-bottom">

				<h4 className='section-name'>{USER_PAGES_TEXT.home[activeLanguage].sections.aboutUs.name}</h4>

				<h2 className="section-title">{USER_PAGES_TEXT.home[activeLanguage].sections.aboutUs.title}</h2>
				<p className="section-text">
					{USER_PAGES_TEXT.home[activeLanguage].sections.aboutUs.text}
				</p>

				<Link className='btn btn-default' to='/about-us'>{BUTTONS[activeLanguage].readMore}</Link>

			</section>
		);
	}
}

export default AboutUs;