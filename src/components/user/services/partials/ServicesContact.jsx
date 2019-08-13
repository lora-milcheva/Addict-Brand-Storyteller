import React from 'react';
import PropTypes from 'prop-types';


// Partials
import SectionHeader from '../../common/headers/SectionHeader';
import ContactForm from '../../common/contact/ContactForm';


class ServicesContact extends React.Component {

	render () {

		let activeLanguage = this.props.language;

		return (
			<section id='services-contact' className='section-padding-top'>

				<SectionHeader pageName='services' language={activeLanguage} sectionName='contact' />

				<ContactForm />

			</section>
		);
	}
}

export default ServicesContact;

ServicesContact.propTypes = {
	language: PropTypes.string
};