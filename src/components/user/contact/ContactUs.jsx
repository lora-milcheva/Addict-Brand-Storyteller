import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import PageHeader from '../common/headers/PageHeader';
import ContactForm from '../common/contact/ContactForm';
import ImagePageHeader from '../common/headers/ImagePageHeader';


class ContactUs extends React.Component {

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="contact-us" className='container-fluid'>

				{/*<PageHeader language={activeLanguage} pageName='contact' />*/}

				<ImagePageHeader language={activeLanguage}
				                 pageName='contact'
				                 sectionName='content'
				                 imgUrl='images/bgs/contact-us.jpg'/>

				<ContactForm />

			</div>
		);
	}
}

ContactUs.contextType = LanguageContext;

export default ContactUs;