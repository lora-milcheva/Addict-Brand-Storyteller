import React from 'react';
import { Link } from 'react-router-dom';

// Constants
import { BUTTONS, USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';


class AboutUs extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="home-about-us" className="container section-padding-top-bottom">

				<h4 className='section-name'>{USER_PAGES_TEXT.home[activeLanguage].sections.aboutUs.name}</h4>

				<h2 className="section-title"
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.home[activeLanguage].sections.aboutUs.title)}/>
				<p className='section-text'
				   dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.home[activeLanguage].sections.aboutUs.text)}/>

				<Link className='btn btn-default' to='/about-us'>{BUTTONS[activeLanguage].readMore}</Link>

			</section>
		);
	}
}

export default AboutUs;