import React from 'react';

// Partials
import FormInput from '../../common/formComponents/FormInput';

// Services
import sectionsService from '../../../services/projects/sectionsService';

// Notifications
import Notifications from '../../common/notifications/Notifications';
import ConfirmDialog from '../../common/notifications/ConfirmDialog';

// Utils
import Utils from '../../../utils/utils';

// Constants
import { SECTION_INPUTS, BUTTONS, NOTIFICATIONS, ADMIN_PAGES_TEXT, CONFIRM_DIALOG_MESSAGES } from '../../../constants/constants';

class createEditSection extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: {},
			loading: true
		};
	}

	sectionId = this.props.match.params.id;

	componentDidMount () {

		if (this.sectionId) {

			sectionsService
				.loadSectionData(this.sectionId)
				.then(res => {

					this.setState({
						name: res.name,
						loading: false
					});
				})
				.catch(err => console.log(err));
		} else {
			this.setState({loading: false});
		}
	}


	handleMultiLangChange = (e) => {
		let lang = e.target.id.split('-')[1];   // get the language
		let key = e.target.name;                // get the state key
		let value = e.target.value;             // get new value

		let stateProp = Object.assign({}, this.state[key]);  // make state key copy

		stateProp[lang] = value; // add new value

		this.setState({[key]: stateProp});
	};

	clearData = () => {
		this.setState({
			name: {bg: '', en: ''},
		});
	};

	saveSection = (e) => {

		e.preventDefault();

		// Edit section
		if (this.sectionId) {

			sectionsService
				.editSection(this.sectionId, Utils.createStateCopy(this.state))
				.then(res => {
					this.notifications.showMessage(NOTIFICATIONS.bg.successEdit);
					setTimeout(() => this.props.history.go(-1), 2000);
				})
				.catch(err => {
					this.notifications.showMessage(err.responseJSON.description);
				});
			return;
		}


		// Create Section
		sectionsService
			.createSection(Utils.createStateCopy(this.state))
			.then(res => {
				this.notifications.showMessage(NOTIFICATIONS.bg.sectionCreated);
				this.clearData();
				setTimeout(() => this.props.history.go(-1), 2000);
			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	confirm = () => {
		this.notifications.showMessage(NOTIFICATIONS.bg.deleteForbidden);
		// this.confirmDialog.showMessage(CONFIRM_DIALOG_MESSAGES.bg.confirmDelete, this.deleteSection);
	};

	deleteSection = () => {
		this.notifications.showMessage(NOTIFICATIONS.bg.deleteForbidden);
		// Delete from all projects categories list
	};

	cancel = (e) => {
		e.preventDefault();
		this.props.history.go(-1);
	};

	render () {


		let title = this.sectionId ? ADMIN_PAGES_TEXT.section.bg.editSection : ADMIN_PAGES_TEXT.section.bg.createSection;

		let buttonText = this.sectionId ? BUTTONS.bg.edit : BUTTONS.bg.create;

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/>);
		}

		return (
			<div id="project-create" className="container">

				<Notifications onRef={ref => (this.notifications = ref)} language='bg'/>
				<ConfirmDialog onRef={ref => (this.confirmDialog = ref)} language='bg'/>

				<div className="admin-page-header">
					<h1 className="page-title">{title}</h1>

					{this.sectionId &&
					<button className="btn btn-default-light sm" onClick={this.confirm}>{BUTTONS.bg.delete}</button>
					}
				</div>


				{/*//FORM*/}
				<form method="post" onSubmit={this.saveSection} id="create-category-form">


					{/*//NAME BG*/}
					<FormInput type='text'
					           name='name'
					           value={this.state.name.bg}
					           id='name-bg'
					           placeholder=''
					           label={SECTION_INPUTS.bg.name}
					           className='name-field'
					           required={true}
					           disabled={false}
					           onChange={this.handleMultiLangChange}/>

					{/*//NAME EN*/}
					<FormInput type='text'
					           name='name'
					           value={this.state.name.en}
					           id='name-en'
					           placeholder=''
					           label={SECTION_INPUTS.en.name}
					           className='name-field'
					           required={true}
					           disabled={false}
					           onChange={this.handleMultiLangChange}/>

					{/*//SUBMIT*/}
					<div className="buttons-container text-center">
						<button className="btn btn-default-light md" onClick={this.cancel}>{BUTTONS.bg.cancel}</button>
						<button className="btn btn-default md" type="submit">{buttonText}</button>
					</div>
				</form>
			</div>
		);
	}
}

export default createEditSection;

