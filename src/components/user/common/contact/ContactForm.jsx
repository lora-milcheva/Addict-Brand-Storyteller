import React from 'react';
import { LanguageContext } from '../../../common/languagesContext/LanguageContext';

// HOC
import AnimateOnScroll from '../../HOC/AnimateOnScroll';

// Partials
import FormInput from '../../../common/formComponents/FormInput';
import TextArea from '../../../common/formComponents/TextArea';

// Services
import contactFormService from '../../../../services/contact/contactFormService';

// Constants
import { BUTTONS, NOTIFICATIONS, USER_PAGES_TEXT, FORM_VALIDATION } from '../../../../constants/constants';
import Notifications from '../../../common/notifications/Notifications';

class ContactForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			subject: '',
			message: '',
		};

	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	sendMail = (e) => {
		e.preventDefault();

		let lang = this.context.language;
		let requiredFields = [];

		Object.keys(this.state).forEach(e => {
			if (e === 'phone' || e === 'subject' || e === 'message') return;

			if (this.state[e].trim() === '') requiredFields.push(e);
		});


		if (requiredFields.length > 0) {
			this.notifications.showMessage(NOTIFICATIONS[lang].fieldsRequired + '\r\n' + requiredFields.join(', '));
			return;
		}

		contactFormService
			.sendMail(this.state)
			.then((res, textStatus, xhr) => {

				console.log(xhr.status);
				this.checkResponse(res);
			})
			.catch(err => {
				this.checkResponse(err);
			});

	};

	validateEmail = (email) => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(String(email).toLowerCase());
	};

	checkResponse = (res) => {

		let lang = this.context.language;

		if (res.status === 200) {
			this.notifications.showMessage(NOTIFICATIONS[lang].messageSent);
			this.clearForm();
		} else {
			this.notifications.showMessage(NOTIFICATIONS[lang].messageError);
		}
	};

	clearForm = (e) => {

		if (e !== undefined) e.preventDefault();

		this.setState({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			subject: '',
			message: '',
		});
	};

	render () {

		let activeLanguage = this.context.language;

		return (
			<div id='form-container' className='container-fluid section-padding-bottom'>

				<Notifications onRef={ref => (this.notifications = ref)} language={activeLanguage}/>

				<form id="contact-form" method="post" onSubmit={this.sendMail} className='container'>

					<FormInput type='text'
					           name='firstName'
					           value={this.state.firstName}
					           label={USER_PAGES_TEXT.contactForm[activeLanguage].name}
					           required={true}
					           disabled={false}
					           isValid={this.state.firstName.trim() === '' ? FORM_VALIDATION[activeLanguage].requiredField : ''}
					           onChange={this.handleChange}/>


					<FormInput type='text'
					           name='lastName'
					           value={this.state.lastName}
					           label={USER_PAGES_TEXT.contactForm[activeLanguage].lastName}
					           required={true}
					           disabled={false}
					           isValid={this.state.lastName.trim() === '' ? FORM_VALIDATION[activeLanguage].requiredField : ''}
					           onChange={this.handleChange}/>


					<FormInput type='email'
					           name='email'
					           value={this.state.email}
					           label={USER_PAGES_TEXT.contactForm[activeLanguage].email}
					           required={true}
					           disabled={false}
					           isValid={this.validateEmail(this.state.email) ? '' : FORM_VALIDATION[activeLanguage].validMail}
					           onChange={this.handleChange}/>


					<FormInput type='text'
					           name='phone'
					           value={this.state.phone}
					           label={USER_PAGES_TEXT.contactForm[activeLanguage].phone}
					           required={false}
					           disabled={false}
					           onChange={this.handleChange}/>

					<FormInput type='text'
					           name='subject'
					           value={this.state.subject}
					           label={USER_PAGES_TEXT.contactForm[activeLanguage].subject}
					           required={false}
					           disabled={false}
					           onChange={this.handleChange}/>

					<TextArea name='message'
					          id='message'
					          className='message'
					          value={this.state.message}
						// label={USER_PAGES_TEXT.contact[activeLanguage].message}
						      onChange={this.handleChange}
						      rows={5}
						      placeholder={USER_PAGES_TEXT.contactForm[activeLanguage].message}/>

					<div id={'submit-buttons'} className="buttons-container text-center">
						<button className="btn btn-default-light"
						        aria-label={BUTTONS[activeLanguage].clear}
						        onClick={this.clearForm}>{BUTTONS[activeLanguage].clear}</button>
						<button className="btn btn-default"
						        aria-label={BUTTONS[activeLanguage].send}
						        type="submit">{BUTTONS[activeLanguage].send}</button>
					</div>
				</form>
			</div>
		);
	}
}

ContactForm.contextType = LanguageContext;


const WrappedComponent = AnimateOnScroll(ContactForm, 'fadeIn', 200, 2);

export default WrappedComponent;
