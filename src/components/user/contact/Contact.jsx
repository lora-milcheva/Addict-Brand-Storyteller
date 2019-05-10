import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import FormInput from '../../common/formComponents/FormInput';
import TextArea from '../../common/formComponents/TextArea';

// Services
import contactFormService from '../../../services/contact/contactFormService';

// Constants
import { BUTTONS, USER_PAGES_TEXT } from '../../../constants/constants';

class Contact extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			subject: '',
			message: ''
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	sendMail = (e) => {
		e.preventDefault();

		contactFormService
			.sendMail(this.state)
			.then(res => {
				console.log('Mail sent');
				this.clearForm();
			})
			.catch(err => {
				console.log(err)
			});
	};

	clearForm = () => {
		this.setState({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			subject: '',
			message: ''
		})
	};

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id="contact" className='container'>


				<h1>Contact</h1>

				<form method="post" action="" onSubmit={this.sendMail} id="contact-form">
					<FormInput type='text'
					           name='firstName'
					           value={this.state.firstName}
					           label={USER_PAGES_TEXT.contact[activeLanguage].name}
					           required={true}
					           disabled={false}
					           onChange={this.handleChange}/>

					<FormInput type='text'
					           name='lastName'
					           value={this.state.lastName}
					           label={USER_PAGES_TEXT.contact[activeLanguage].lastName}
					           required={true}
					           disabled={false}
					           onChange={this.handleChange}/>

					<FormInput type='text'
					           name='email'
					           value={this.state.email}
					           label={USER_PAGES_TEXT.contact[activeLanguage].email}
					           required={true}
					           disabled={false}
					           onChange={this.handleChange}/>

					<FormInput type='text'
					           name='phone'
					           value={this.state.phone}
					           label={USER_PAGES_TEXT.contact[activeLanguage].phone}
					           required={false}
					           disabled={false}
					           onChange={this.handleChange}/>

					<FormInput type='text'
					           name='subject'
					           value={this.state.subject}
					           label={USER_PAGES_TEXT.contact[activeLanguage].subject}
					           required={false}
					           disabled={false}
					           onChange={this.handleChange}/>

					<TextArea name='message'
					          value={this.state.message}
					          label={USER_PAGES_TEXT.contact[activeLanguage].message}
					          onChange={this.handleChange}
					          placeholder={USER_PAGES_TEXT.contact[activeLanguage].message}/>

					<div id={'submit-buttons'} className="buttons-container text-center form-group">
						<button className="btn btn-default-light"
						        onClick={this.cancel}>{BUTTONS[activeLanguage].clear}</button>
						<button className="btn btn-primary" type="submit">{BUTTONS[activeLanguage].send}</button>
					</div>
				</form>


			</div>
		);
	}
}

Contact.contextType = LanguageContext;

export default Contact;