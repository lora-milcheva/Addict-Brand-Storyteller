import React from 'react';
import { LanguageContext } from '../../common/languagesContext/LanguageContext';

// Partials
import FormInput from '../../common/formComponents/FormInput';
import TextArea from '../../common/formComponents/TextArea';

// Services
import contactFormService from '../../../services/contact/contactFormService';

// Constants
import { BUTTONS, NOTIFICATIONS, USER_PAGES_TEXT, FORM_VALIDATION } from '../../../constants/constants';
import Notifications from '../../common/Notifications';

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
		let emptyFields = [];

		Object.keys(this.state).forEach(e => {
			if (e === 'phone' || e === 'subject' || e === 'message') return;
			if (this.state[e].trim() === '')emptyFields.push(e);
		});

		console.log(emptyFields);

		if (emptyFields.length > 0) {
			this.notifications.showMessage(NOTIFICATIONS[lang].fieldsRequired + '\r\n' + emptyFields.join(', '));
			return;
		}

		contactFormService
			.sendMail(this.state)
			.then(res => {
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

		e.preventDefault();

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
			<div id='form-container' className='container-fluid section-padding-top-bottom'>

				<Notifications onRef={ref => (this.notifications = ref)} language={activeLanguage}/>

				{/*<h2 className='section-title container'>{USER_PAGES_TEXT.contact[activeLanguage].contactUs}</h2>*/}

				<form id="contact-form" method="post" onSubmit={this.sendMail}  className='container'>

					<FormInput type='text'
					           name='firstName'
					           value={this.state.firstName}
					           label={USER_PAGES_TEXT.contact[activeLanguage].name}
					           required={true}
					           disabled={false}
					           isValid={this.state.firstName.trim() === '' ? FORM_VALIDATION[activeLanguage].requiredField : ''}
					           onChange={this.handleChange}/>


					<FormInput type='text'
					           name='lastName'
					           value={this.state.lastName}
					           label={USER_PAGES_TEXT.contact[activeLanguage].lastName}
					           required={true}
					           disabled={false}
					           isValid={this.state.lastName.trim() === '' ? FORM_VALIDATION[activeLanguage].requiredField : ''}
					           onChange={this.handleChange}/>


					<FormInput type='email'
					           name='email'
					           value={this.state.email}
					           label={USER_PAGES_TEXT.contact[activeLanguage].email}
					           required={true}
					           disabled={false}
					           isValid={this.validateEmail(this.state.email) ? '' : FORM_VALIDATION[activeLanguage].validMail}
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
					          id='message'
					          value={this.state.message}
					          // label={USER_PAGES_TEXT.contact[activeLanguage].message}
					          onChange={this.handleChange}
					          rows={5}
					          placeholder={USER_PAGES_TEXT.contact[activeLanguage].message}/>

					<div id={'submit-buttons'} className="buttons-container text-center">
						<button className="btn btn-default-light"
						        onClick={this.clearForm}>{BUTTONS[activeLanguage].clear}</button>
						<button className="btn btn-default" type="submit">{BUTTONS[activeLanguage].send}</button>
					</div>
				</form>
			</div>
		);
	}
}

ContactForm.contextType = LanguageContext;

export default ContactForm;