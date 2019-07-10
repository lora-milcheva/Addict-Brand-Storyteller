import React from 'react';
import { Link } from 'react-router-dom';

import { BUTTONS, USER_PAGES_TEXT } from '../../../../constants/constants';


class OurAim extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="our-aim" className="container section-padding-top-bottom">

				{/*<h4 className='section-name'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourAim.name}</h4>*/}

				<h2 className="section-title">{USER_PAGES_TEXT.home[activeLanguage].sections.ourAim.title}</h2>

				<Link className='btn btn-default' to='projects'>{BUTTONS[activeLanguage].seeWhatWeDo}</Link>

			</section>
		);
	}
}

export default OurAim;