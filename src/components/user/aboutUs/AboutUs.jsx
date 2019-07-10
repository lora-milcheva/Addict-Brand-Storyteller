import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import ContactForm from '../common/ContactForm';

// Constants
import { USER_PAGES_TEXT } from '../../../constants/constants';

class AboutUs extends React.Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

	componentDidMount () {
	}



	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="about-us" className='container-fluid'>

				<section className='banner container'>
					<h1 className='page-title'>
						{USER_PAGES_TEXT.aboutUs[activeLanguage].title}
					</h1>
					<p className='subtitle'>{USER_PAGES_TEXT.aboutUs[activeLanguage].subtitle}</p>
				</section>

				<ContactForm/>

			</div>

		);
	}
}

AboutUs.contextType = LanguageContext;

export default AboutUs;