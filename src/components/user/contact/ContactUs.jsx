import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import ContactForm from '../common/ContactForm';


// Constants
import {USER_PAGES_TEXT} from '../../../constants/constants';


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

				<div className='container'>

					<section className='banner'>
						<h1 className='page-title'>
							{USER_PAGES_TEXT.contact[activeLanguage].contactUs}
						</h1>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
							been the industry's standard dummy text ever since</p>
					</section>
				</div>

				<ContactForm />

			</div>
		);
	}
}

ContactUs.contextType = LanguageContext;

export default ContactUs;