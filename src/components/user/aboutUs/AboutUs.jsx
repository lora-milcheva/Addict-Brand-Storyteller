import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import ContactForm from '../common/ContactForm';

// Constants
import { USER_PAGES_TEXT } from '../../../constants/constants';

// Utils
import UTILS from '../../../utils/utils';

class AboutUs extends React.Component {


	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="about-us" className='container-fluid'>

				<section className='banner container'>

					<h1 className="page-title"
					    dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.aboutUs[activeLanguage].title)}/>

					<p className='subtitle'
					   dangerouslySetInnerHTML={UTILS.createMarkup(USER_PAGES_TEXT.aboutUs[activeLanguage].subtitle)}/>
				</section>

				<ContactForm/>

			</div>

		);
	}
}

AboutUs.contextType = LanguageContext;

export default AboutUs;