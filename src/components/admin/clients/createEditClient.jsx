import React from 'react';

// Partials
import FormInput from '../../common/formComponents/FormInput';

// Services
import clientsService from '../../../services/clients/clientsService';

// Notifications
import Messages from '../../common/Messages';
import ConfirmDialog from '../../common/ConfirmDialog';

// Utils
import Utils from '../../../utils/utils';

// Constants
import { CLIENT_INPUTS, BUTTONS } from '../../../constants/constants';

class createEditCategory extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: {},

			loading: true
		};
	}

	clientId = this.props.match.params.id;

	componentDidMount () {

		if (this.clientId) {

			clientsService
				.loadClientData(this.clientId)
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
			name: {BG: '', EN: ''},
		});
	};

	saveClient = (e) => {

		e.preventDefault();

		if (this.clientId) {

			clientsService
				.editClient(this.clientId, Utils.createStateCopy(this.state))
				.then(res => {
					this.messages.showMessage('Успешна редакция.');
					setTimeout(() => this.props.history.go(-1), 2000);
				})
				.catch(err => {
					this.messages.showMessage(err.responseJSON.description);
				});
			return;
		}

		clientsService
			.createClient(Utils.createStateCopy(this.state))
			.then(res => {
				this.messages.showMessage('Клиентът е създаден.');
				this.clearData();
				setTimeout(() => this.props.history.go(-1), 2000);
			})
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
	};

	confirm = () => {
		this.confirmDialog.showMessage('test', this.deleteClient);
	};

	deleteClient = () => {
		console.log('from delete');
	};

	cancel = (e) => {
		e.preventDefault();
		this.props.history.go(-1);
	};

	render () {


		let title = this.clientId ? 'Редакция на категория' : 'Създаване на категория';

		let buttonText = this.clientId ? BUTTONS.BG.edit : BUTTONS.BG.create;

		if (this.state.projectLoading) {
			return (<div className="lds-dual-ring"/>);
		}



		return (
			<div id="project-create" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>
				<ConfirmDialog onRef={ref => (this.confirmDialog = ref)}/>

				<div className="page-header">
					<h1 className="page-title">{title}</h1>

					{this.clientId &&
					<button className="btn btn-danger xs" onClick={this.confirm}>{BUTTONS.BG.delete}</button>
					}
				</div>


				{/*//FORM*/}
				<form method="post" onSubmit={this.saveClient} id="create-category-form">


						{/*//NAME BG*/}
						<FormInput type='text'
						           name='name'
						           value={this.state.name.BG}
						           id='name-BG'
						           placeholder=''
						           label={CLIENT_INPUTS.BG.name}
						           className='name-field'
						           required={true}
						           disabled={false}
						           onChange={this.handleMultiLangChange}/>

						{/*//NAME EN*/}
						<FormInput type='text'
						           name='name'
						           value={this.state.name.EN}
						           id='name-EN'
						           placeholder=''
						           label={CLIENT_INPUTS.EN.name}
						           className='name-field'
						           required={true}
						           disabled={false}
						           onChange={this.handleMultiLangChange}/>


					{/*//SUBMIT*/}
					<div className="form-group">
						<button className="btn btn-default" onClick={this.cancel}>{BUTTONS.BG.cancel}</button>
						<button className="btn btn-primary" type="submit">{buttonText}</button>
					</div>
				</form>
			</div>
		);
	}
}

export default createEditCategory;
