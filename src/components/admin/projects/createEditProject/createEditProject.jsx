import React from 'react';

// Partials
import FormInput from '../../../common/formComponents/FormInput';
import FormSelectField from '../../../common/formComponents/FormSelectField';
import Textarea from '../../../common/formComponents/TextArea';
import AddOnInput from '../../../common/formComponents/AddOnInput';
import SortableList from './partials/SortableList';

// Services
import projectsService from '../../../../services/projects/projectsService';
import clientsService from '../../../../services/clients/clientsService';
import categoriesService from '../../../../services/categories/categoriesService';

// Notifications
import Notifications from '../../../common/Notifications';
import ConfirmDialog from '../../../common/ConfirmDialog';

// Utils
import Utils from '../../../../utils/utils';

// Constants
import { CREATE_PROJECT_INPUTS, BUTTONS, CONFIRM_DIALOG_MESSAGES, NOTIFICATIONS, ADMIN_PAGES_TEXT} from '../../../../constants/constants';

class createProject extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: {},
			description: {},
			year: '',
			webPage: '',
			isStar: false,
			clientId: '',
			categoryIds: [],
			images: [],
			thumbnail: '',
			videos: [],

			projectLoaded: false,
			dataLoaded: false,

			allClients: [],
			allCategories: []
		};

		this.imagesContainer = React.createRef();
	}

	projectId = this.props.match.params.id;

	componentDidMount () {

		this.loadInputsData();

		if (this.projectId) {

			projectsService
				.loadProjectData(this.projectId)
				.then(res => {

					let projectClientId = res.clientId;

					clientsService
						.loadClientData(projectClientId);

					this.setState({
						name: res.name,
						description: res.description,
						year: res.year,
						webPage: res.webPage,
						isStar: res.isStar,
						clientId: res.clientId,
						categoryIds: res.categoryIds,
						images: res.images,
						thumbnail: res.thumbnail,
						videos: res.videos,

						projectLoaded: true
					});
				})
				.catch(err => console.log(err));
		} else {
			this.setState({projectLoaded: true});
		}
	}

	loadInputsData = () => {
		clientsService
			.loadAllClients()
			.then(res => {

				this.setState({allClients: res});

				categoriesService
					.loadAllCategories()
					.then(res => {
						this.setState({
							allCategories: res,
							dataLoaded: true
						});
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	};

	handleInputChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleCheckBoxChange = (e) => {

		e.preventDefault();

		this.setState({[e.target.name]: !this.state[e.target.name]})
	};

	handleMultiLangChange = (e) => {
		let lang = e.target.id.split('-')[1];   // get the language
		let key = e.target.name;                // get the state key
		let value = e.target.value;             // get new value

		let stateProp = Object.assign({}, this.state[key]);  // make state key copy

		stateProp[lang] = value; // add new value

		this.setState({[key]: stateProp});
	};

	handleArrChange = (e) => {

		e.preventDefault();

		if (this.state[e.target.name].includes(e.target.value)) {
			this.setState({[e.target.name]: this.state[e.target.name].filter(el => el !== e.target.value)}, () => console.log(this.state));

		} else {
			this.setState({[e.target.name]: [...this.state[e.target.name], e.target.value]}, () => console.log(this.state));
		}
	};

	handleNewOrder = (stateProp, reorderedElements ) => {
		this.setState({[stateProp] : reorderedElements})
	};

	saveProject = (e) => {

		e.preventDefault();

		if (this.projectId) {

			projectsService
				.editProject(this.projectId, Utils.createStateCopy(this.state))
				.then(res => {

					this.notifications.showMessage(NOTIFICATIONS.BG.successEdit);
					setTimeout(() => this.props.history.go(-1), 2000);

				})
				.catch(err => {
					this.notifications.showMessage(err.responseJSON.description);
				});

			return;
		}

		projectsService
			.createProject(Utils.createStateCopy(this.state))
			.then(res => {

				this.notifications.showMessage(NOTIFICATIONS.BG.projectCreated);
				setTimeout(() => this.props.history.go(-1), 2000);

			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	confirmDelete = () => {
		// First give the massage, then the callback to be executed
		this.confirmDialog.showMessage(CONFIRM_DIALOG_MESSAGES.BG.confirmDeleteProject, this.deleteProject);
	};

	deleteProject = () => {

		projectsService
			.deleteProject(this.projectId)
			.then(res => {
				this.notifications.showMessage(NOTIFICATIONS.BG.projectDeleted);
				setTimeout(() => this.props.history.go(-1), 2000);
			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	cancel = (e) => {
		e.preventDefault();
		this.props.history.go(-1);
	};


	render () {

		let title = this.projectId ? ADMIN_PAGES_TEXT.project.BG.editProject : ADMIN_PAGES_TEXT.project.BG.createProject;

		let buttonText = this.projectId ? BUTTONS.BG.edit : BUTTONS.BG.create;

		// Show loader until data is loaded
		if (!this.state.projectLoaded || !this.state.dataLoaded) {
			return (<div className="lds-dual-ring"/>);
		}

		let thumbnail = this.state.thumbnail !== ''
			? (<figure className="image">
					<img src={this.state.thumbnail} alt="project thumbnail" className="img-fit"/>
				</figure>
			)
			: null;

		let videos = this.state.videos.map((video, index) => {
			return (
				<div className="image" key={index}>
					<iframe src={video} title={video}/>
					<button className="btn xs btn-primary del-btn" name='videos' value={video}
					        onClick={this.handleArrChange}>clear
					</button>
				</div>

			);
		});

		let categories = this.state.allCategories.map(e => {
			let classList = this.state.categoryIds.includes(e._id) ? 'btn category-label selected' : 'btn category-label';
			return (
				<button key={e._id} className={classList} name="categoryIds" value={e._id}
				        onClick={this.handleArrChange}>{e.name.BG}</button>
			);
		});

		let isStar = <button className={this.state.isStar ? 'btn category-label attention' : 'btn category-label'}
		                     name="isStar"
		                     value={this.state.isStar}
		                     onClick={this.handleCheckBoxChange}>{CREATE_PROJECT_INPUTS.BG.isStar}</button>

		return (
			<div id="project-create" className="container">

				<Notifications onRef={ref => (this.notifications = ref)}/>
				<ConfirmDialog onRef={ref => (this.confirmDialog = ref)}/>

				<div className="page-header">
					<h1 className="page-title">{title}</h1>

					{this.projectId &&
					<button className="btn btn-danger xs" onClick={this.confirmDelete}>{BUTTONS.BG.delete}</button>
					}
				</div>


				{/*//FORM*/}
				<form method="post" onSubmit={this.saveProject} id="create-project-form">

					<main id="project-info">

						{/*//NAME BG*/}
						<FormInput type='text'
						           name='name'
						           value={this.state.name.BG}
						           id='name-BG'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.BG.name}
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
						           label={CREATE_PROJECT_INPUTS.EN.name}
						           className='name-field'
						           required={true}
						           disabled={false}
						           onChange={this.handleMultiLangChange}/>

						<div className="form-group">
							{categories}
						</div>

						{/*//DESCRIPTION BG*/}
						<Textarea name='description'
						          value={this.state.description.BG}
						          id='description-BG'
						          placeholder=''
						          label={CREATE_PROJECT_INPUTS.BG.description}
						          className='description-field'
						          required={false}
						          onChange={this.handleMultiLangChange}/>

						{/*//DESCRIPTION EN*/}
						<Textarea name='description'
						          value={this.state.description.EN}
						          id='description-EN'
						          placeholder=''
						          label={CREATE_PROJECT_INPUTS.EN.description}
						          className='description-field'
						          required={false}
						          onChange={this.handleMultiLangChange}/>

						{/*//CLIENT*/}
						<FormSelectField name='clientId'
						                 label={CREATE_PROJECT_INPUTS.BG.clientName}
						                 className='client-field'
						                 required={false}
						                 disabled={false}
						                 selected={this.state.clientId}
						                 options={this.state.allClients}
						                 onChange={this.handleInputChange}/>

						{/*//YEAR*/}
						<FormInput type='text'
						           name='year'
						           value={this.state.year}
						           id='year'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.BG.year}
						           className='year-field'
						           required={false}
						           disabled={false}
						           onChange={this.handleInputChange}/>

						<FormInput type='text'
						           name='webPage'
						           value={this.state.webPage}
						           id='web-page'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.BG.webPage}
						           className=''
						           required={false}
						           disabled={false}
						           onChange={this.handleInputChange}/>

						<div className="form-group">
							{isStar}
						</div>

					</main>


					{/*//PROJECT IMAGES & VIDEOS*/}
					<aside id="project-data">


						<div className="project-data">

							<h3 className="section-title">{ADMIN_PAGES_TEXT.project.BG.thumbnail}</h3>
							<div className="container">
								{thumbnail}
							</div>

							<AddOnInput
								name="thumbnail"
								// label={CREATE_PROJECT_INPUTS.BG.thumbnail}
								labelClassName="no-label"
								buttonText='+'
								placeholder='Thumbnail'
								onChange={this.handleInputChange}/>
						</div>


						<div className="project-data">
							<h3 className="section-title">{ADMIN_PAGES_TEXT.project.BG.images}</h3>
							<SortableList elements={this.state.images}
							              name="images"
							              onDelete={this.handleArrChange}
							              onChange={this.handleNewOrder}/>

							<AddOnInput
								name='images'
								// label={CREATE_PROJECT_INPUTS.BG.images}
								labelClassName='no-label'
								buttonText='+'
								placeholder='Добави снимка'
								onChange={this.handleArrChange}/>
						</div>

						<div className='project-data'>
							<h3 className='section-title'>{ADMIN_PAGES_TEXT.project.BG.videos}</h3>
							<div className='container'>
								{videos}
							</div>

							<AddOnInput
								name="videos"
								// label={CREATE_PROJECT_INPUTS.BG.videos}
								labelClassName="no-label"
								buttonText='+'
								placeholder='Добави видео'
								onChange={this.handleArrChange}/>
						</div>

					</aside>


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

export default createProject;

