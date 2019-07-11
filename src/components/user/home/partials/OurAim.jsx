import React from 'react';
import { Link } from 'react-router-dom';

// Constants
import { BUTTONS, USER_PAGES_TEXT } from '../../../../constants/constants';

// Utils
import UTILS from '../../../../utils/utils';


class OurAim extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (

			<section id="our-aim" className="container section-padding-bottom">

				{/*<h4 className='section-name'>{USER_PAGES_TEXT.home[activeLanguage].sections.ourAim.name}</h4>*/}

				<h2 className="section-title"
				    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.home[activeLanguage].sections.ourAim.title)}/>

				<p className='section-text'
				   dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.home[activeLanguage].sections.ourAim.text)}/>

				<Link className='btn btn-default' to='projects'>{BUTTONS[activeLanguage].seeWhatWeDo}</Link>

			</section>
		);
	}
}

export default OurAim;