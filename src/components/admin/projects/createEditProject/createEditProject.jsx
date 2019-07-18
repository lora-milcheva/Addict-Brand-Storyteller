import React from 'react';

// Partials
import FormInput from '../../../common/formComponents/FormInput';
import FormSelectField from '../../../common/formComponents/FormSelectField';
import Textarea from '../../../common/formComponents/TextArea';
import AddOnInput from '../../../common/formComponents/AddOnInput';
import SortableList from '../projectsList/partials/SortableList';
import SortableImages from './partials/SortableImages';
import SortableVideos from './partials/SortableVideos';
import MediaInfo from './partials/MediaInfo';
import TextSectionFrom from './partials/TextSectionForm';

// Services
import projectsService from '../../../../services/projects/projectsService';
import clientsService from '../../../../services/clients/clientsService';
import categoriesService from '../../../../services/categories/categoriesService';
import sectionsService from '../../../../services/projects/sectionsService';

// Notifications
import Notifications from '../../../common/Notifications';
import ConfirmDialog from '../../../common/ConfirmDialog';

// Utils
import Utils from '../../../../utils/utils';

// Constants
import {
	CREATE_PROJECT_INPUTS,
	BUTTONS,
	CONFIRM_DIALOG_MESSAGES,
	NOTIFICATIONS,
	ADMIN_PAGES_TEXT
} from '../../../../constants/constants';

class createProject extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: {},
			description: {},
			info: {},
			year: '',
			webPage: '',
			isStar: false,
			clientId: '',
			categoryIds: [],

			thumbnail: '',
			largeThumbnail: '',
			cover: '',
			images: [],
			videos: [],
			orderNumber: '',

			projectLoaded: false,
			dataLoaded: false,

			allClients: [],
			allCategories: [],
			allInfoSectionIds: [],
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
						info: res.info || {},
						year: res.year,
						webPage: res.webPage,
						isStar: res.isStar,
						clientId: res.clientId,
						categoryIds: res.categoryIds,
						images: res.images,
						thumbnail: res.thumbnail || '',
						largeThumbnail: res.largeThumbnail || '',
						cover: res.cover || '',
						videos: res.videos,
						orderNumber: res.orderNumber,

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
							allCategories: res
						});

						sectionsService
							.loadAllSections()
							.then(res => {
								this.setState({
									allInfoSectionIds: res,
									dataLoaded: true
								});
							});
					});
			})
			.catch(err => console.log(err));
	};

	handleInputChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleCheckBoxChange = (e) => {

		e.preventDefault();

		this.setState({[e.target.name]: !this.state[e.target.name]});
	};

	loadTextSectionForm = (e) => {
		e.preventDefault();

		let stateProp = e.target.getAttribute('data-state-prop');
		let elId = e.target.getAttribute('data-el-id');
		let sectionId = e.target.getAttribute('data-section-name');

		// If adding main info
		if (stateProp === 'info') {


			if (!sectionId) {

				// If adding new content
				let data = {
					stateProp: stateProp,
					sections: this.state.allInfoSectionIds,
					sectionId: '',
					textBG: '',
					textEN: '',
					image: ''
				};

				this.textSectionForm.loadData(data);

			} else {

				// If editing section text
				let info = this.state[stateProp][sectionId];

				let data = {
					stateProp: stateProp,
					sections: this.state.allInfoSectionIds,
					sectionId: sectionId,
					textBG: info.bg,
					textEN: info.en,
					image: info.image
				};

				this.textSectionForm.loadData(data);
			}
		} else {

			// If adding info to media (video, image)

			let data = {};
			let media = this.state[stateProp].filter(e => e.url === elId)[0];

			if (!sectionId) {

				// If editing media text

				data = {
					stateProp: stateProp,
					sections: this.state.allInfoSectionIds,
					mediaId: media.url,
					sectionId: '',
					textBG: '',
					textEN: '',
				};

			} else {

				// If adding new content

				data = {
					stateProp: stateProp,
					sections: this.state.allInfoSectionIds,
					mediaId: media.url,
					sectionId: sectionId,
					textBG: media.info[sectionId].bg,
					textEN: media.info[sectionId].en,
				};
			}

			this.textSectionForm.loadData(data);
		}

	};

	removeInfoSection = (e) => {
		e.preventDefault();

		let stateProp = e.target.getAttribute('data-state-prop');
		let elId = e.target.getAttribute('data-el-id');
		let sectionId = e.target.getAttribute('data-section-name');

		if (stateProp === 'info') {

			this.confirmDialog
				.showMessage(CONFIRM_DIALOG_MESSAGES.bg.confirmDeleteSection, () => {
					let filtered = this.state[stateProp];
					delete filtered[sectionId];
					this.setState({[stateProp]: filtered});
				});
		} else {

			this.confirmDialog
				.showMessage(CONFIRM_DIALOG_MESSAGES.bg.confirmDeleteSection, () => {

					let arr = this.state[stateProp];

					arr.forEach(el => {
						if (el.url === elId) {
							delete el.info[sectionId];
						}
					});

					this.setState({[stateProp]: arr});
				});
		}
	};

	addInfoSection = (data, stateProp) => {

		this.setState(prevState => (
			{
				[stateProp]: {...prevState[stateProp], ...data},
				showInfoInputs: false
			}
		));
	};

	addMediaInfo = (data, stateProp, mediaId) => {

		let arr = this.state[stateProp];

		arr.forEach((el) => {
			if (el.url === mediaId) {
				for (let key in data) {
					el.info[key] = data[key];
				}
			}
		});

		this.setState({[stateProp]: arr});
	};

	showMediaInfo = (e, input) => {
		e.preventDefault();

		let stateProp = e.target.getAttribute('data-state-prop');

		let data = {
			stateProp: stateProp,
			sections: this.state.allInfoSectionIds,
			id: input.url,
			info: input.info
		};

		this.mediaInfo.loadData(data);
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
			this.setState({[e.target.name]: this.state[e.target.name].filter(el => el !== e.target.value)});

		} else {
			this.setState({[e.target.name]: [...this.state[e.target.name], e.target.value]});
		}
	};

	removeCoverThumbnail = (e) => {
		e.preventDefault();

		this.setState({[e.target.name]: ''});
	};

	addImageVideo = (e) => {

		e.preventDefault();

		let stateProp = e.target.name;
		let url = e.target.value;

		let elementToAdd = {
			url: url,
			info: {}
		};

		if (stateProp === 'videos') {
			elementToAdd.poster = url.split('.').shift() + '.jpg';
		}

		this.setState({[e.target.name]: [...this.state[e.target.name], elementToAdd]});

	};

	removeImageVideo = (e) => {
		e.preventDefault();

		let arr = this.state[e.target.name];

		let filtered = arr.filter((el) => el.url !== e.target.value);

		this.setState({[e.target.name]: filtered});

	};

	handleNewOrder = (stateProp, reorderedElements) => {
		this.setState({[stateProp]: reorderedElements});
	};

	saveMediaContentOrder = (stateProp, element) => {

		let arr = this.state[stateProp];

		arr.forEach(e => {
			if (e.url === element.url) {
				e.info = element.info;
			}
		});

		this.setState({[stateProp]: arr});
	};

	saveProject = (e) => {

		e.preventDefault();

		let project = Utils.createStateCopy(this.state);

		if (this.projectId) {

			projectsService
				.editProject(this.projectId, project)
				.then(res => {

					this.notifications.showMessage(NOTIFICATIONS.bg.successEdit);
					setTimeout(() => this.props.history.push('/admin/projects-list'), 2000);

				})
				.catch(err => {
					this.notifications.showMessage(err.responseJSON.description);
				});

			return;
		}

		projectsService
			.createProject(project)
			.then(res => {

				this.notifications.showMessage(NOTIFICATIONS.bg.projectCreated);
				setTimeout(() => this.props.history.go('/admin/projects-list'), 2000);

			})
			.catch(err => {
				this.notifications.showMessage(err.responseJSON.description);
			});
	};

	confirmDeleteProject = () => {
		// First give the massage, then the callback to be executed
		this.confirmDialog.showMessage(CONFIRM_DIALOG_MESSAGES.bg.confirmDeleteProject, this.deleteProject);
	};

	deleteProject = () => {

		projectsService
			.deleteProject(this.projectId)
			.then(res => {
				this.notifications.showMessage(NOTIFICATIONS.bg.projectDeleted);
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

		// Show loader until data is loaded
		if (!this.state.projectLoaded || !this.state.dataLoaded) {
			return (<div className="lds-dual-ring"/>);
		}

		let title = this.projectId
			? ADMIN_PAGES_TEXT.project.bg.editProject
			: ADMIN_PAGES_TEXT.project.bg.createProject;

		let buttonText = this.projectId
			? BUTTONS.bg.saveChanges
			: BUTTONS.bg.create;

		let thumbnail = this.state.thumbnail !== ''
			? (<figure className="image">
					<button className="btn btn-primary xs del-btn"
					        name='thumbnail'
					        onClick={this.removeCoverThumbnail}>{BUTTONS.en.clear}
					</button>
					<img src={this.state.thumbnail} alt="project thumbnail" className="img-fit"/>
				</figure>
			)
			: null;

		let largeThumbnail = this.state.largeThumbnail !== ''
			? (<figure className="image">
					<button className="btn btn-primary xs del-btn"
					        name='thumbnail'
					        onClick={this.removeCoverThumbnail}>{BUTTONS.en.clear}
					</button>
					<img src={this.state.largeThumbnail} alt="project thumbnail" className="img-fit"/>
				</figure>
			)
			: null;

		let cover = this.state.cover !== ''
			? (<figure className="image">
					<button className="btn btn-primary xs del-btn"
					        name='cover'
					        onClick={this.removeCoverThumbnail}>{BUTTONS.en.clear}
					</button>
					<img src={this.state.cover} alt="project cover" className="img-fit"/>
				</figure>
			)
			: null;

		let categories = this.state.allCategories.map(e => {
			let classList = this.state.categoryIds.includes(e._id) ? 'btn category-label selected' : 'btn category-label';
			return (
				<button key={e._id}
				        className={classList}
				        name="categoryIds"
				        value={e._id}
				        onClick={this.handleArrChange}>{e.name.bg}
				</button>
			);
		});

		let isStar = <button className={this.state.isStar ? 'btn category-label attention' : 'btn category-label'}
		                     name="isStar"
		                     value={this.state.isStar}
		                     onClick={this.handleCheckBoxChange}>
			<i className="fa fa-star" aria-hidden="true"/>
			{CREATE_PROJECT_INPUTS.bg.isStar}
		</button>;

		let info = Object.keys(this.state.info).map(e => {

			let section = this.state.allInfoSectionIds.filter(s => s._id === e)[0];
			let data = this.state.info[e];

			return (
				<div key={e} className="info-text">

					<div className="section-header">
						<h3 className="title">{section.name.bg}&nbsp;&nbsp;| </h3>
						<button className="btn btn-default xs"
						        data-state-prop={'info'}
						        data-section-name={e}
						        onClick={this.loadTextSectionForm}>{BUTTONS.bg.edit}
						</button>
						<button className="btn btn-default xs"
						        data-section-name={e}
						        data-state-prop={'info'}
						        onClick={this.removeInfoSection}>{BUTTONS.bg.delete}
						</button>
					</div>

					{data.image !== '' && <img src={data.image} alt={'section image'}/>}

					<span className="label">BG</span>
					<div dangerouslySetInnerHTML={{__html: data.bg}}
					     className="text"/>

					<span className="label">EN</span>
					<div dangerouslySetInnerHTML={{__html: data.en}}
					     className="text"/>
				</div>
			);
		});

		return (
			<div id="project-create" className="container">

				<Notifications onRef={ref => (this.notifications = ref)} language='bg'/>
				<ConfirmDialog onRef={ref => (this.confirmDialog = ref)} language='bg'/>

				<TextSectionFrom onRef={ref => (this.textSectionForm = ref)}
				                 addTextSection={this.addInfoSection}
				                 addMediaInfo={this.addMediaInfo}/>

				<MediaInfo onRef={ref => (this.mediaInfo = ref)}
				           loadTextSectionForm={this.loadTextSectionForm}
				           deleteSection={this.removeInfoSection}
				           saveMediaContentOrder={this.saveMediaContentOrder}
				           saveOrder={this.saveMediaContentOrder}/>

				{/*//PAGE HEADER*/}
				<div className="page-header">
					<h1 className="page-title">{title}</h1>

					{this.projectId &&
					<button className="btn btn-danger xs"
					        onClick={this.confirmDeleteProject}>
						<i className="fa fa-trash" aria-hidden="true"/>
						{BUTTONS.bg.delete}
					</button>
					}
				</div>

				{/*//FORM*/}
				<form method="post" onSubmit={this.saveProject} id="create-project-form">


					{/*//PROJECT Info*/}
					<div id="project-info">

						{/*//NAME BG*/}
						<FormInput type='text'
						           name='name'
						           value={this.state.name.bg}
						           id='name-bg'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.bg.name}
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
						           label={CREATE_PROJECT_INPUTS.en.name}
						           className='name-field'
						           required={true}
						           disabled={false}
						           onChange={this.handleMultiLangChange}/>

						<div className="form-group">
							{isStar}
						</div>

						<div className="form-group">
							{categories}
						</div>

						{/*//DESCRIPTION BG*/}
						<Textarea name='description'
						          value={this.state.description.bg}
						          id='description-bg'
						          placeholder=''
						          label={CREATE_PROJECT_INPUTS.bg.description}
						          className='description-field'
						          required={false}
						          onChange={this.handleMultiLangChange}/>

						{/*//DESCRIPTION EN*/}
						<Textarea name='description'
						          value={this.state.description.en}
						          id='description-en'
						          placeholder=''
						          label={CREATE_PROJECT_INPUTS.en.description}
						          className='description-field'
						          required={false}
						          onChange={this.handleMultiLangChange}/>

						{/*//CLIENT*/}
						<FormSelectField name='clientId'
						                 label={CREATE_PROJECT_INPUTS.bg.client}
						                 className='client-field'
						                 required={true}
						                 disabled={false}
						                 defaultValue={this.state.clientId}
						                 options={this.state.allClients}
						                 onChange={this.handleInputChange}/>

						{/*//YEAR*/}
						<FormInput type='text'
						           name='year'
						           value={this.state.year}
						           id='year'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.bg.year}
						           className='year-field'
						           required={false}
						           disabled={false}
						           onChange={this.handleInputChange}/>

						{/*//Web page*/}
						<FormInput type='text'
						           name='webPage'
						           value={this.state.webPage}
						           id='web-page'
						           placeholder=''
						           label={CREATE_PROJECT_INPUTS.bg.webPage}
						           className=''
						           required={false}
						           disabled={false}
						           onChange={this.handleInputChange}/>

						<div className="form-group">
							<label>{CREATE_PROJECT_INPUTS.bg.info}</label>

							<button className="btn btn-default xs"
							        data-state-prop={'info'}
							        data-section-name={null}
							        onClick={this.loadTextSectionForm}>{BUTTONS.bg.addSection}
							</button>

							{info}
						</div>

					</div>


					{/*//PROJECT IMAGES & VIDEOS*/}
					<aside id="project-data">

						{/*Thumbnail*/}
						<div className="project-data">

							<h3 className="section-title">{ADMIN_PAGES_TEXT.project.bg.thumbnail}</h3>
							<div className="container">
								{thumbnail}
							</div>

							<AddOnInput
								name="thumbnail"
								label={CREATE_PROJECT_INPUTS.bg.thumbnail}
								labelClassName="no-label"
								buttonText='+'
								value={this.state.thumbnail}
								placeholder='/images/projects/folderName/imageName'
								onChange={this.handleInputChange}
								clearText={false}/>
						</div>

						{/*Large Thumbnail*/}
						<div className="project-data">

							<h3 className="section-title">{ADMIN_PAGES_TEXT.project.bg.largeThumbnail}</h3>
							<div className="container">
								{largeThumbnail}
							</div>

							<AddOnInput
								name="largeThumbnail"
								label={CREATE_PROJECT_INPUTS.bg.largeThumbnail}
								labelClassName="no-label"
								buttonText='+'
								value={this.state.largeThumbnail}
								placeholder='/images/projects/folderName/imageName'
								onChange={this.handleInputChange}
								clearText={false}/>
						</div>


						{/*Cover*/}
						<div className="project-data">

							<h3 className="section-title">{ADMIN_PAGES_TEXT.project.bg.cover}</h3>
							<div className="container">
								{cover}
							</div>

							<AddOnInput
								name="cover"
								label={CREATE_PROJECT_INPUTS.bg.cover}
								labelClassName="no-label"
								buttonText='+'
								value={this.state.cover}
								placeholder='/images/projects/folderName/imageName'
								onChange={this.handleInputChange}
								clearText={false}/>
						</div>

						{/*Images*/}
						<div className="project-data">
							<h3 className="section-title">{ADMIN_PAGES_TEXT.project.bg.images}</h3>

							<SortableImages elements={this.state.images}
							                name="images"
							                onChange={this.handleNewOrder}
							                onDelete={this.removeImageVideo}
							                showMediaInfo={this.showMediaInfo}
							                removeImageVideo={this.removeImageVideo}/>

							<AddOnInput
								name='images'
								// label={CREATE_PROJECT_INPUTS.bg.images}
								labelClassName='no-label'
								buttonText='+'
								placeholder='/images/projects/folderName/imageName'
								onChange={this.addImageVideo}
								clearText={true}/>
						</div>

						{/*Videos*/}
						<div className='project-data'>
							<h3 className='section-title'>{ADMIN_PAGES_TEXT.project.bg.videos}</h3>

							<SortableVideos elements={this.state.videos}
							                name="videos"
							                onChange={this.handleNewOrder}
							                onDelete={this.removeImageVideo}
							                showMediaInfo={this.showMediaInfo}
							                removeImageVideo={this.removeImageVideo}/>

							<AddOnInput
								name="videos"
								// label={CREATE_PROJECT_INPUTS.bg.videos}
								labelClassName="no-label"
								buttonText='+'
								placeholder='Добави видео'
								onChange={this.addImageVideo}
								clearText={true}/>
						</div>

					</aside>

				</form>

				{/*//SUBMIT*/}
				<div id={'submit-buttons'} className="buttons-container text-center form-group">
					<button className="btn btn-default-light" onClick={this.cancel}>{BUTTONS.bg.cancel}</button>
					<button className="btn btn-primary" onClick={this.saveProject} type="submit">{buttonText}</button>
				</div>

			</div>

		);
	}
}

export default createProject;

