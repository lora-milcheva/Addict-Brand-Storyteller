import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import PageHeader from '../common/headers/PageHeader';
import ContactForm from '../common/contact/ContactForm';


class ContactUs extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
		};

	}


	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="contact-us" className='container-fluid'>

				<PageHeader language={activeLanguage} pageName='contact' />

				<ContactForm />

			</div>
		);
	}
}

ContactUs.contextType = LanguageContext;

export default ContactUs;