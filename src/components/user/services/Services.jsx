import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import ContactForm from '../common/ContactForm';

// Constants
import { USER_PAGES_TEXT } from '../../../constants/constants';

class Services extends React.Component {
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
			<div id="services" className='container-fluid'>

				<section className='banner container'>
					<h1 className='page-title'>
						{USER_PAGES_TEXT.services[activeLanguage].title}
					</h1>
					<p className='subtitle'>{USER_PAGES_TEXT.services[activeLanguage].subtitle}</p>
				</section>

				<ContactForm/>

			</div>

		);
	}
}

Services.contextType = LanguageContext;

export default Services;